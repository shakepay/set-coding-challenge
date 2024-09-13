import { test, expect, type Page } from "@playwright/test";
import {
  checkNumberOfCompletedTodosInLocalStorage,
  checkNumberOfTodosInLocalStorage,
  checkTodosInLocalStorage,
} from "../src/todo-app";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
  "complete code challenge",
  "ensure coverage for all items is automated",
];

// Test case #1
// Given I am a user of todomvc
// When I create a new todo item
// Then it appears last on my todo list
test.describe("Create New Todo", () => {
  test("should be able to create new items on the page", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Make sure the list only has one todo item.
    await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Make sure the list now has two todo items.
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

// Test case #2
// Given I have created a todo item
// When I edit a todo item
// Then the todo item gets updated with the new changes
test.describe("Edit Existing Todo", () => {
  test("should be able to edit existing items on the page", async ({
    page,
  }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Edit 1st todo.
    await page.getByTestId("todo-title").dblclick();
    await page.getByLabel("Edit").fill("new item updated");
    await page.getByLabel("Edit").press("Enter");

    // Make sure the list now shows the updated text.
    await expect(page.getByTestId("todo-title")).toContainText(
      "new item updated",
    );
  });
});

// Test case #3
// Given I have created a todo item
// When I delete a todo item using the red X
// Then the todo item is removed from my todo list
test.describe("Delete Existing Todo Using Red X", () => {
  test("should be able to delete existing items on the page by clicking the red X next to them", async ({
    page,
  }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Click the first todo.
    await page.getByTestId("todo-title").click();

    // Click delete button.
    await page.getByLabel("Delete").click();

    // Make sure the list is now empty.
    await expect(page.getByPlaceholder("What needs to be done?")).toBeEmpty();
  });
});

// Test case #4
// Given I have created a todo item
// When I mark a todo item as completed
// Then it is marked with a green check mark
// And it is crossed off my todo list with a Strikethrough
test.describe("Mark Todo Complete", () => {
  test("should be able to mark existing items on the page complete by clicking the circle next to them", async ({
    page,
  }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Check 1st todo.
    await page.getByLabel("Toggle Todo").check();

    // Verify 1st todo is checked
    await expect(page.getByLabel("Toggle Todo")).toBeChecked();

    // Verify 1st todo has strikethrough
    // Get the computed style of the element
    const element = await page.getByTestId("todo-title"); // Replace with the actual selector
    const textDecoration = await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("text-decoration");
    });

    // Assert that the text has strikethrough (line-through)
    expect(textDecoration).toContain("line-through");
  });
});

// Test case #5
// Given I have marked a todo item as complete
// When I view the Active list
// Then only Active (Not Completed) todo items are shown
test.describe("Marked Todo Items DO NOT Show As Active", () => {
  test("should be able to only see uncomplete items in active view", async ({
    page,
  }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Create 2st todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await page.getByLabel("Toggle Todo").first().check();
    await page.getByRole("link", { name: "Active" }).click();
    await expect(page.getByTestId("todo-title")).toContainText(TODO_ITEMS[1]);
  });
});

// Test case #6
// Given I have marked a todo item as complete
// When I click “Clear Completed”
// Then the completed todo item is removed from my todo list
// And the todo item is moved to the Completed list
test.describe("Clear Complete Button", () => {
  test("should move completed todo items to Completed list", async ({
    page,
  }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Create 2st todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Check complete first todo.
    await page.getByLabel("Toggle Todo").first().check();

    // Clear complete.
    await page.getByRole("button", { name: "Clear completed" }).click();

    // Verify only 2nd todo is visible
    await expect(page.getByTestId("todo-title")).toContainText(TODO_ITEMS[1]);

    // Check the Completed List
    await page.getByRole("link", { name: "Completed" }).click();

    // Verify the 1st todo is visible in the completed list
    await expect(page.getByTestId("todo-title")).toContainText(TODO_ITEMS[0]);
  });
});
