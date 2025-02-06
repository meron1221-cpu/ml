const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5005;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Dummy prediction function (replace this with your actual model)
const predictHeartDisease = (data) => {
  const {
    age,
    sex,
    chestPain,
    bp,
    cholesterol,
    fbs,
    ekg,
    maxHr,
    stDepression,
  } = data;

  // Simulated prediction logic (this should be replaced with actual logic)
  if (age > 50 && cholesterol > 240) {
    return 1; // Heart disease present
  } else {
    return 0; // No heart disease
  }
};

// POST endpoint for prediction
app.post("/predict", (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Debugging

    const {
      age,
      sex,
      chestPain,
      bp,
      cholesterol,
      fbs,
      ekg,
      maxHr,
      stDepression,
    } = req.body;

    // Validate that all fields are provided
    if (
      age === undefined ||
      sex === undefined ||
      chestPain === undefined ||
      bp === undefined ||
      cholesterol === undefined ||
      fbs === undefined ||
      ekg === undefined ||
      maxHr === undefined ||
      stDepression === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate that all fields are numeric
    if (
      isNaN(age) ||
      isNaN(sex) ||
      isNaN(chestPain) ||
      isNaN(bp) ||
      isNaN(cholesterol) ||
      isNaN(fbs) ||
      isNaN(ekg) ||
      isNaN(maxHr) ||
      isNaN(stDepression)
    ) {
      return res.status(400).json({ error: "All fields must be numeric." });
    }

    // Call the prediction function
    const prediction = predictHeartDisease({
      age,
      sex,
      chestPain,
      bp,
      cholesterol,
      fbs,
      ekg,
      maxHr,
      stDepression,
    });

    // Send the prediction back as the response
    res.json({ prediction });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
