import { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formdata, setformData] = useState({
    age: null,
    sex: null,
    chestPain: null,
    bp: null,
    cholesterol: null,
    fbs: null,
    ekg: null,
    maxHr: null,
    stDepression: null,
  });

  function handlechange(e) {
    const { value, name } = e.target;

    setformData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }

  // Handle form submission
  const fetchPrediction = async (e) => {
    e.preventDefault();
    const numericForm = Object.fromEntries(
      Object.entries(formdata).map(([key, value]) => [key, Number(value)])
    );

    setLoading(true);
    setShowToast(true);

    try {
      const response = await axios.post(
        "https://machine-learning-4-8bgc.onrender.com/predict",
        numericForm
      );
      console.log("Response from backend:", response.data);
      setPrediction(response.data.prediction); // Update prediction state
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("An error occurred while making the prediction.");
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds
    }
  };

  // Reset form fields
  const resetForm = () => {
    setformData((prev) => ({
      ...prev,
      age: "",
      sex: "",
      chestPain: "",
      bp: "",
      cholesterol: "null",
      fbs: "",
      ekg: "",
      maxHr: "",
      stDepression: "",
    }));
  };

  // Render the active section
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="form-container">
            <h1>Heart Disease Prediction</h1>
            <form onSubmit={fetchPrediction}>
              <div className="form-grid">
                {/* Column 1 */}
                <div>
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    value={formdata.age}
                    name="age"
                    onChange={handlechange}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label>Sex</label>
                  <select
                    value={formdata.sex}
                    onChange={handlechange}
                    name="sex"
                    required
                  >
                    <option value="" name="sex">
                      Select
                    </option>
                    <option value="1" name="sex">
                      Male
                    </option>
                    <option value="0" name="sex">
                      Female
                    </option>
                  </select>
                </div>
                <div>
                  <label>Chest Pain Type</label>
                  <select
                    value={formdata.chestPain}
                    onChange={handlechange}
                    name="chestPain"
                    required
                  >
                    <option value="" name="chestPain">
                      Select
                    </option>
                    <option value="1" name="chestPain">
                      Type 1
                    </option>
                    <option value="2" name="chestPain">
                      Type 2
                    </option>
                    <option value="3" name="chestPain">
                      Type 3
                    </option>
                    <option value="4" name="chestPain">
                      Type 4
                    </option>
                  </select>
                </div>
                <div>
                  <label>Blood Pressure (mm Hg)</label>
                  <input
                    type="number"
                    placeholder="Enter blood pressure"
                    value={formdata.bp}
                    name="bp"
                    onChange={handlechange}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label>Cholesterol (mg/dl)</label>
                  <input
                    type="number"
                    placeholder="Enter cholesterol level"
                    value={formdata.cholesterol}
                    name="cholesterol"
                    onChange={handlechange}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label>Fasting Blood Sugar &gt; 120 mg/dl</label>
                  <select
                    value={formdata.fbs}
                    onChange={handlechange}
                    name="fbs"
                    required
                  >
                    <option value="" name="fbs">
                      Select
                    </option>
                    <option value="1" name="fbs">
                      True
                    </option>
                    <option value="0" name="fbs">
                      False
                    </option>
                  </select>
                </div>

                {/* Column 2 */}
                <div>
                  <label>EKG Results</label>
                  <select
                    value={formdata.ekg}
                    onChange={handlechange}
                    name="ekg"
                    required
                  >
                    <option value="" name="ekg">
                      Select
                    </option>
                    <option value="0" name="ekg">
                      Normal
                    </option>
                    <option value="1" name="ekg">
                      Abnormal
                    </option>
                    <option value="2" name="ekg">
                      Other
                    </option>
                  </select>
                </div>
                <div>
                  <label>Max Heart Rate</label>
                  <input
                    type="number"
                    placeholder="Enter max heart rate"
                    value={formdata.maxHr}
                    name="maxHr"
                    onChange={handlechange}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label>ST Depression</label>
                  <input
                    type="number"
                    placeholder="Enter ST depression"
                    value={formdata.stDepression}
                    onChange={handlechange}
                    name="stDepression"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="button-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Predicting..." : "Predict"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="reset-button"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Toast Notification */}
            {showToast && (
              <div className="toast">
                <p>
                  Prediction:{" "}
                  {prediction === 1 ? (
                    <span className="danger">Heart Disease Present</span>
                  ) : (
                    <span className="safe">No Heart Disease</span>
                  )}
                </p>
              </div>
            )}
          </div>
        );

      case "about":
        return (
          <div className="about-section">
            <h1>About Heart Disease Prediction</h1>
            <p>
              This application uses a machine learning model to predict the
              likelihood of heart disease based on user-provided health metrics.
              It is designed to help users assess their risk and take proactive
              steps toward better health.
            </p>
          </div>
        );
      case "contact":
        return (
          <div className="contact-section">
            <h1>Contact Us</h1>
            <p>
              If you have any questions or feedback, feel free to reach out to
              us:
            </p>
            <ul>
              <li>Email: support@heartpredict.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Health St, Wellness City, HC 12345</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button onClick={() => setActiveSection("home")}>Home</button>
        <button onClick={() => setActiveSection("about")}>About</button>
        <button onClick={() => setActiveSection("contact")}>Contact</button>
      </nav>
      <div className="container">{renderSection()}</div>
    </div>
  );
}

export default App;
