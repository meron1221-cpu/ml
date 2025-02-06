import { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [chestPain, setChestPain] = useState("");
  const [bp, setBp] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [fbs, setFbs] = useState("");
  const [ekg, setEkg] = useState("");
  const [maxHr, setMaxHr] = useState("");
  const [stDepression, setStDepression] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formdata, setformData] = useState({
    age: null,
    sex: null,
  });

  function handlechange(e) {
    const { value, name } = e.target;
    console.log(e.target);
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!age) newErrors.age = "Age is required.";
    if (!sex) newErrors.sex = "Sex is required.";
    if (!chestPain) newErrors.chestPain = "Chest Pain Type is required.";
    if (!bp) newErrors.bp = "Blood Pressure is required.";
    if (!cholesterol) newErrors.cholesterol = "Cholesterol is required.";
    if (!fbs) newErrors.fbs = "Fasting Blood Sugar is required.";
    if (!ekg) newErrors.ekg = "EKG Results are required.";
    if (!maxHr) newErrors.maxHr = "Max Heart Rate is required.";
    if (!stDepression) newErrors.stDepression = "ST Depression is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const fetchPrediction = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    const numericForm = {
      age: Number(age),
      sex: Number(sex),
      chestPain: Number(chestPain),
      bp: Number(bp),
      cholesterol: Number(cholesterol),
      fbs: Number(fbs),
      ekg: Number(ekg),
      maxHr: Number(maxHr),
      stDepression: Number(stDepression),
    };

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
    setAge("");
    setSex("");
    setChestPain("");
    setBp("");
    setCholesterol("");
    setFbs("");
    setEkg("");
    setMaxHr("");
    setStDepression("");
    setPrediction(null);
    setErrors({});
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
                  />
                  {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div>
                  <label>Sex</label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1" name="male">
                      Male
                    </option>
                    <option value="0" name="female">
                      Female
                    </option>
                  </select>
                  {errors.sex && <span className="error">{errors.sex}</span>}
                </div>
                <div>
                  <label>Chest Pain Type</label>
                  <select
                    value={chestPain}
                    onChange={(e) => setChestPain(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                    <option value="3">Type 3</option>
                    <option value="4">Type 4</option>
                  </select>
                  {errors.chestPain && (
                    <span className="error">{errors.chestPain}</span>
                  )}
                </div>
                <div>
                  <label>Blood Pressure (mm Hg)</label>
                  <input
                    type="number"
                    placeholder="Enter blood pressure"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    min="0"
                  />
                  {errors.bp && <span className="error">{errors.bp}</span>}
                </div>
                <div>
                  <label>Cholesterol (mg/dl)</label>
                  <input
                    type="number"
                    placeholder="Enter cholesterol level"
                    value={cholesterol}
                    onChange={(e) => setCholesterol(e.target.value)}
                    min="0"
                  />
                  {errors.cholesterol && (
                    <span className="error">{errors.cholesterol}</span>
                  )}
                </div>
                <div>
                  <label>Fasting Blood Sugar &gt; 120 mg/dl</label>
                  <select value={fbs} onChange={(e) => setFbs(e.target.value)}>
                    <option value="">Select</option>
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                  {errors.fbs && <span className="error">{errors.fbs}</span>}
                </div>

                {/* Column 2 */}
                <div>
                  <label>EKG Results</label>
                  <select value={ekg} onChange={(e) => setEkg(e.target.value)}>
                    <option value="">Select</option>
                    <option value="0">Normal</option>
                    <option value="1">Abnormal</option>
                    <option value="2">Other</option>
                  </select>
                  {errors.ekg && <span className="error">{errors.ekg}</span>}
                </div>
                <div>
                  <label>Max Heart Rate</label>
                  <input
                    type="number"
                    placeholder="Enter max heart rate"
                    value={maxHr}
                    onChange={(e) => setMaxHr(e.target.value)}
                    min="0"
                  />
                  {errors.maxHr && (
                    <span className="error">{errors.maxHr}</span>
                  )}
                </div>
                <div>
                  <label>ST Depression</label>
                  <input
                    type="number"
                    placeholder="Enter ST depression"
                    value={stDepression}
                    onChange={(e) => setStDepression(e.target.value)}
                    min="0"
                  />
                  {errors.stDepression && (
                    <span className="error">{errors.stDepression}</span>
                  )}
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
