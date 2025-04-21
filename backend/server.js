const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;
app.use(cors());

app.get("/data", (req, res) => {
  const data = {
    name: "Aman",
    age: 23,
    designation: "Full Stack Developer",
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});