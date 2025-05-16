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

app.get("/data", (req, res) => {
  const data = {
    name: "Aman",
    age: 22,
    designation: "Full Stack Developer",
    hobbies: ["Coding", "Reading", "Gaming"],
    skills: ["JavaScript", "React", "Node.js"],
  };
  res.json(data);
});

app.put("/update", async (req, res) => {
  try {
    const { name, age, designation } = req.body;
    const newCard = new Card({ name, age, designation });
    await newCard.save(); // Save to MongoDB

    console.log("User added backend log: ", newCard);

    res.json({ message: "User added successfully", card: newCard });
  } catch (error) {
    console.error("Error adding card: ", error);
    res.status(500).json({ message: "Error adding user", error });
  }
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
