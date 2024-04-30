const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
// Connect to MongoDB Atlas

const app = express(); app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb://localhost:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define schema
const certificateSchema = new mongoose.Schema({
  studentName: String,
  courseTitle: String,
  institutionName: String,
  courseDescription: String,
});

const Certificate = mongoose.model("Certificate", certificateSchema);


// Route to issue a certificate
app.post("/issue-certificate", async (req, res) => {
  console.log(req.body)
  try {
    const {
      studentName,
      courseTitle,
      institutionName,
      courseDescription,
    } = req.body;

    const certificate = new Certificate({
      studentName,
      courseTitle,
      institutionName,
      courseDescription,
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    console.error("Error issuing certificate:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Route to verify a certificate
app.get("/verify-certificate/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate) {
      res.json({ certificate });
    } else {
      res.status(404).json({ error: "Certificate not found" });
    }
  } catch (err) {
    console.error("Error verifying certificate:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
