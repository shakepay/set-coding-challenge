import { Page, expect } from '@playwright/test';

// Create a new todo item
export async function createNewTodoItem(page: Page, todoText: string) {
    await page.fill('.new-todo', todoText);
    await page.press('.new-todo', 'Enter');
}

// Mark a specific todo item as a completed by list index #
export async function markTodoItemAsCompleted(page: Page, index: number) {
    const todoItemLocator = page.locator('.todo-list li');
    const toggleCheckbox = todoItemLocator.nth(index).locator('input.toggle');
    
    // Click the checkbox to mark the todo item as completed
    await toggleCheckbox.click();
  
    // Verify that the item is marked as completed
    await expect(todoItemLocator.nth(index)).toHaveClass(/completed/);
  
    console.log(`Marked todo item at index ${index} as completed.`);
  }