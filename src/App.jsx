import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setEttorMessage] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const responseData = await axios.post(
        "https://summary-analyzer-backend.onrender.com/summary",
        {
          text,
        },
      );
      console.log(JSON.parse(responseData.data.summary));
      setResponseData(JSON.parse(responseData.data.summary));
      console.log(responseData.data.summary.keyPoints);
    } catch (err) {
      if (err.response?.status === 400) {
        console.log(err.response);
        setEttorMessage(err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-container ">
      <div className="inner_container">
        <div>
          <form onSubmit={handleFormSubmit}>
            <h1 className="Heading">Summary Analyser</h1>
            <label className="label ">text:</label>
            <br />
            <textarea
              placeholder="Enter the summary "
              className="summaryEntered"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <div className="buttonContainer">
              <button className="button" type="submit">
                {isLoading ? "Summarizing...." : "Submit"}
              </button>
            </div>
            {!text && <p className="errMMsg">{errMessage}</p>}
          </form>
        </div>
        {responseData && (
          <div>
            <p className="responseHeading">Summary</p>
            <p>{responseData.summary}</p>
            <p className="responseHeading">keyPoints</p>
            <ul>
              {responseData.keyPoints.map((each, index) => (
                <li key={index}>{each}</li>
              ))}
            </ul>

            <p className="responseHeading">sentiment</p>
            <p>{responseData.sentiment}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
