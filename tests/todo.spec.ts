import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";

test.describe("Todo Management", () => {
  let todoPage: TodoPage;

  // Before each test, create a new instance of TodoPage and navigate to the TodoMVC application
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  // Test case to verify that a user can create a new todo item
  test("user can create a todo", async () => {
    await todoPage.createTodo("test task 1");

    await expect(todoPage.getTodo("test task 1")).toBeVisible();
  });

  // Test case to verify that a user can create multiple todo items
  test("user can create multiple todos", async () => {
    await todoPage.createTodo("multiple test task 1");
    await todoPage.createTodo("multiple test task 2");
    await todoPage.createTodo("multiple test task 3");

    await expect(todoPage.getTodo("multiple test task 1")).toBeVisible();
    await expect(todoPage.getTodo("multiple test task 2")).toBeVisible();
    await expect(todoPage.getTodo("multiple test task 3")).toBeVisible();
  });

  // Test case to verify that a user can complete a todo item
  test("user can complete a todo", async () => {
    await todoPage.createTodo("complete test task 1");
    await todoPage.completeTodo("complete test task 1");

    await expect(todoPage.getTodoItem("complete test task 1")).toHaveClass(
      /completed/,
    );
  });
});
