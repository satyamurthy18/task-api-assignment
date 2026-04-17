const request = require("supertest");
const app = require("../src/app");

describe("Tasks API", () => {

  test("GET /tasks should return empty array initially", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /tasks should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  test("POST /tasks should fail without title", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({});

    expect(res.statusCode).toBe(400);
  });

  test("PUT /tasks/:id should update task", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Old task" });

    const res = await request(app)
      .put(`/tasks/${task.body.id}`)
      .send({ title: "Updated task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated task");
  });

  test("PUT invalid id should return 404", async () => {
    const res = await request(app)
      .put("/tasks/invalid-id")
      .send({ title: "Test" });

    expect(res.statusCode).toBe(404);
  });

  test("DELETE /tasks/:id should delete task", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Delete me" });

    const res = await request(app)
      .delete(`/tasks/${task.body.id}`);

    expect(res.statusCode).toBe(204);
  });

  test("DELETE invalid id should return 404", async () => {
    const res = await request(app).delete("/tasks/invalid-id");
    expect(res.statusCode).toBe(404);
  });

  test("PATCH /tasks/:id/complete should mark task done", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Complete me" });

    const res = await request(app)
      .patch(`/tasks/${task.body.id}/complete`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("done");
  });

  test("GET /tasks/stats should return stats", async () => {
    const res = await request(app).get("/tasks/stats");
    expect(res.statusCode).toBe(200);
  });

  // 🔥 NEW FEATURE TESTS

  test("PATCH /tasks/:id/assign should assign task", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Assign test" });

    const res = await request(app)
      .patch(`/tasks/${task.body.id}/assign`)
      .send({ assignee: "Satya" });

    expect(res.statusCode).toBe(200);
    expect(res.body.assignee).toBe("Satya");
  });

  test("PATCH /tasks/:id/assign should return 404 for invalid id", async () => {
    const res = await request(app)
      .patch("/tasks/invalid-id/assign")
      .send({ assignee: "Satya" });

    expect(res.statusCode).toBe(404);
  });

  test("PATCH /tasks/:id/assign should fail for empty assignee", async () => {
    const task = await request(app)
      .post("/tasks")
      .send({ title: "Assign test" });

    const res = await request(app)
      .patch(`/tasks/${task.body.id}/assign`)
      .send({ assignee: "" });

    expect(res.statusCode).toBe(400);
  });

});