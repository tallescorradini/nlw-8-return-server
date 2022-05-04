import express from "express";

const app = express();

app.listen(3333, () => {
  console.log("Server running on port 3333");
});

app.get("/users", (req, res) => {
  return res.send("hello world");
});
