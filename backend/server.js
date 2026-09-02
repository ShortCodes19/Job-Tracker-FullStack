import express from "express";

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.post("/api/jobs", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    message: "Job received",
    job: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
