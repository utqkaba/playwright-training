import { type Locator, type Page } from "@playwright/test";

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;

  // Constructor to initialize the TodoPage with the provided Page object
  constructor(page: Page) {
    this.page = page;
    this.todoInput = page.getByPlaceholder("What needs to be done?");
  }

  // Method to navigate to the TodoMVC application
  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc");
  }

  // Method to create a new todo item with the specified text
  async createTodo(todoText: string) {
    await this.todoInput.fill(todoText);
    await this.todoInput.press("Enter");
  }

  // Method to retrieve a todo item by its text
  getTodo(todo: string) {
    return this.page.getByText(todo);
  }

  // Method to retrieve the parent element of a todo item by its text
  getTodoItem(todo: string) {
    return this.getTodo(todo).locator("../..");
  }

  // Method to mark a todo item as completed by checking its checkbox
  async completeTodo(todo: string) {
    const todoItem = this.getTodoItem(todo);
    await todoItem.getByRole("checkbox").check();
  }

  // Method to delete a todo item by hovering over it and clicking the delete button
  async deleteTodo(todo: string) {
    const todoItem = this.getTodoItem(todo);
    await todoItem.hover();
    await todoItem.getByRole("button", { name: "Delete" }).click();
  }

  // Method to filter the todo list to show only active (incomplete) items
  async filterActiveTodos() {
    await this.page.getByRole("link", { name: "Active" }).click();
  }

  // Method to filter the todo list to show only completed items
  async filterCompletedTodos() {
    await this.page.getByRole("link", { name: "Completed" }).click();
  }
}
