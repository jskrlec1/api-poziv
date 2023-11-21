import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [podaci, setPodaci] = useState([]);
  const targetDate = "2022-11-15";

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${targetDate}`)
      .then((response) => response.json())
      .then((nasaData) => setPodaci(nasaData));
  }, [targetDate]);

  return (
    <div className="App">
      <h1>-Slika dana-</h1>
      <h1>{podaci.title}</h1>
      <img src={podaci.url} alt={podaci.title} />
      <p>{podaci.explanation}</p>
      <p>Copyright: {podaci.copyright}</p>
      <p>Date: {podaci.date}</p>
    </div>
  );
}

export default App;
