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

  // Test case to verify that a user can delete a todo item
  test("user can delete a todo item", async () => {
    await todoPage.createTodo("delete test task 1");
    await todoPage.deleteTodo("delete test task 1");

    await expect(todoPage.getTodo("delete test task 1")).not.toBeVisible();
  });

  // Test case to verify that a user can filter active todo items
  test("user can filter active todos", async () => {
    await todoPage.createTodo("active test task 1");

    await todoPage.createTodo("active test task 2");
    await todoPage.completeTodo("active test task 2");

    await todoPage.filterActiveTodos();

    await expect(todoPage.getTodo("active test task 1")).toBeVisible();
    await expect(todoPage.getTodo("active test task 2")).not.toBeVisible();
  });

  // Test case to verify that a user can filter completed todo items
  test("user can filter completed todos", async () => {
    await todoPage.createTodo("active test task 1");

    await todoPage.createTodo("active test task 2");
    await todoPage.completeTodo("active test task 2");

    await todoPage.filterCompletedTodos();

    await expect(todoPage.getTodo("active test task 2")).toBeVisible();
    await expect(todoPage.getTodo("active test task 1")).not.toBeVisible();
  });

  // Test case to verify that a user can clear completed todo items
  test("user can clear completed todos", async () => {
    await todoPage.createTodo("clear test task 1");
    await todoPage.completeTodo("clear test task 1");

    await todoPage.createTodo("clear test task 2");

    await todoPage.deleteCompletedTodos();

    await expect(todoPage.getTodo("clear test task 1")).not.toBeVisible();
    await expect(todoPage.getTodo("clear test task 2")).toBeVisible();
  });
});
