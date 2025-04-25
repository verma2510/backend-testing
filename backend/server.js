const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

const card = [
  { id: 1, name: "Vinit", designation: "Android Developer", age: 22 },
  { id: 1, name: "Saksham", designation: "Full Stack Developer", age: 26 },
  { id: 1, name: "Ganesh", designation: "WordPress Developer", age: 23 },
];

app.get("/data", (req, res) => {
  const data = {
    name: "Aman",
    age: 23,
    designation: "Full Stack Developer",
    hobbies: ["Coding", "Reading", "Gaming"],
    skills: ["JavaScript", "React", "Node.js"],
  };
  res.json(data);
});

app.put("/update", (req, res) => {
  const { name, age, designation } = req.body; //extract data from frontend
  const newUser = {
    id: card.length + 1,
    name,
    age,
    designation,
  };
  card.push(newUser); //adds new user to the list
  console.log("User updated backend log: ", newUser);

  res.json({
    message: "User added successfully",
    cards: card, //send back updated list
  });
});

app.get("/cards", (req, res) => {
  res.json(card);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
