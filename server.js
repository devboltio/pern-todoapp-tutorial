const express = require("express");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.json("hello world");
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  res.json(title);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  res.json(`${id} ${title}`);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  res.json(id);
});

app.listen(3000, () => {
  console.log("App running");
});
