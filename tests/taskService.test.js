const taskService = require("../src/services/taskService");

describe("Task Service", () => {

  test("should create a task with default values", () => {
    const task = taskService.create({ title: "Test task" });

    expect(task).toHaveProperty("id");
    expect(task.status).toBe("todo");
    expect(task.title).toBe("Test task");
  });

  test("should update a task", () => {
    const task = taskService.create({ title: "Old" });

    const updated = taskService.update(task.id, { title: "New" });

    expect(updated.title).toBe("New");
  });

  test("should return null for updating invalid task", () => {
    const result = taskService.update("invalid-id", { title: "Test" });

    expect(result).toBeNull();
  });

  test("should delete a task", () => {
    const task = taskService.create({ title: "Delete me" });

    const result = taskService.remove(task.id);

    expect(result).toBe(true);
  });

  test("should return false for deleting invalid task", () => {
    const result = taskService.remove("invalid-id");

    expect(result).toBe(false);
  });

});