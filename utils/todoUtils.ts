import { Page } from '@playwright/test';

// Create a new todo item
export async function createNewTodoItem(page: Page, todoText: string) {
    await page.fill('.new-todo', todoText);
    await page.press('.new-todo', 'Enter');
}
