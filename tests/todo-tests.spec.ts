// Test Cases task
// The app we're testing is the example React todomvc app located here - https://todomvc.com/examples/react/dist/
// General Scenario:
// As a user of the React todomvc app, I want to be able to add, delete and mark todo items as complete

// Test case #1
// Given I am a user of todomvc (go to url, there is no login)
// When I create a new todo item (act)
// Then it appears last on my todo list (verify)

// Test case #2
// Given I have created a todo item (before test -> utils)
// When I edit a todo item (act)
// Then the todo item gets updated with the new changes (verify)

// Test case #3
// Given I have created a todo item (before test)
// When I delete a todo item using the red X (act)
// Then the todo item is removed from my todo list (verify)

// Test case #4
// Given I have created a todo item (before test)
// When I mark a todo item as completed (act)
// Then it is marked with a green check mark (verify)
// And it is crossed off my todo list with a Strikethrough (verify)

// Test case #5
// Given I have marked a todo item as complete (before test - utils)
// When I view the Active list (act)
// Then only Active (Not Completed) todo items are shown (verify)

// Test case #6
// Given I have marked a todo item as complete (before test - utils)
// When I click “Clear Completed” (act)
// Then the completed todo item is removed from my todo list (verify)
// And the todo item is moved to the Completed list (verify)

import { test, expect } from '@playwright/test';
import { createNewTodoItem } from '../utils/todoUtils';

const APP_URL = 'https://todomvc.com/examples/react/dist/'; // can be stored in ENV variables 

test.describe('Todomvc app 6 tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the todomvc app before each test
    await page.goto(APP_URL);
    console.log('Successfully navigated to the TodoMVC app URL');
  });

  // Test case #1: Create new todo item
  test('Create a new todo item and check if it appears last in the list', async ({ page }) => {
    console.log('Starting test: Create a new todo item...');
    const todoText = 'Alex`s first todo item';

    // ACT --- Using the util function to create-a-new-todo-item
    await createNewTodoItem(page, todoText)

    // VERIFY --- Then it appears last on my todo list
    const lastTodoItem = await page.locator('.todo-list li').last();

    await expect(lastTodoItem).toHaveText(todoText);
    console.log('Last To Do is: '+ todoText);
  });

  // Test case #2: Edit a todo item
  test('Edit a todo item and ensure it gets updated', async ({ page }) => {
    console.log('Starting test: Edit a todo item...');

  });

  // Test case #3: Delete a todo item using the red X
  test('Delete a todo item using the red X and ensure it is removed from the list', async ({ page }) => {
    console.log('Starting test: Delete a todo item using the red X...');

  });

  // Test case #4: Mark a todo item as completed
  test('Mark a todo item as completed and verify it is crossed off', async ({ page }) => {
    console.log('Starting test: Mark a todo item as completed...');

  });

  // Test case #5: View only Active (Not Completed) todo items  
  test('View only Active todo items when the Active filter is selected', async ({ page }) => {
    console.log('Starting test: View only Active todo items...');

  });

  // Test case #6: Clear Completed todo items
  test('Clear completed todo items and verify they are removed', async ({ page }) => {
    console.log('Starting test: Clear completed todo items...');

  });
});

