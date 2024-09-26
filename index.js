const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const app = express();
const port = 3000;

const {downloadController} = require("./controllers/download.controller");

const upload = multer({ dest: "uploads/" });
app.get("/get", async (req, res) => {
  console.log("get Data");
  res.send("Kdnf");
});

app.use("/download", downloadController);
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  // Handle the data (e.g., save to database)
  console.log(data);

  res.send("File uploaded and processed successfully.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
