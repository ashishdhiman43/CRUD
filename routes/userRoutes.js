const express = require("express");
const User = require("../models/userdetails");
const router = express.Router();

  // Get all users
  router.get("/users", async (req,res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  
  // Get a user by ID
  router.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  
  // Create a new user
  router.post("/users", async (req, res) => {
    try {
      const { name, email, age, salary, designation, address } = req.body;
      const newUser = new User({ name, email, age, salary, designation, address });
      const savedUser = await newUser.save();
      res.status(201).json({ message: "User added successfully!", user: savedUser });
    } catch (err) {
      console.error("❌ Error saving user:", err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  
  // Update a user by ID
  router.put("/update/:id", async (req, res) => {
    try {
      const { name, email, age, salary, designation, address } = req.body;
      console.log(req.body, "req.body");
      
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, age, salary, designation, address },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated successfully!", user: updatedUser });
    } catch (err) {
      console.error("❌ Error updating user:", err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });
  
  // Delete a user by ID
  router.delete("/delete/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully!" });
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  });

module.exports = router;