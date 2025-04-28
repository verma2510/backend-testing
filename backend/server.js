const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Card = require("./models/Card");

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://vermaaman1008:AmanV1008%40@cluster0.uokpg3k.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

let card = [
  { id: 1, name: "Vinit", designation: "Android Developer", age: 22 },
  { id: 2, name: "Saksham", designation: "Full Stack Developer", age: 26 },
  { id: 3, name: "Ganesh", designation: "WordPress Developer", age: 23 },
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

app.get("/cards", async (req, res) => {
  try{
    const cards = await Card.find();
    res.json(cards);
  }
  catch (error) {
    res.status(500).json({message: "Error fetching cards: ", error})
  }
});


app.delete("/cards/:id", async (req, res) => {
  const { id } = req.params;
  // const index = card.findIndex((user) => user.id == parseInt(id));

  // if (index !== -1) {
  //   card.splice(index, 1);
  //   res.json({ message: "user deleted successfully" });
  // } else {
  //   res.status(404).json({ message: "user not found!" });
  // }
  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (deletedCard) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
