import React, { useEffect, useState } from 'react';

const Slikesvemira = () => {
  const [podaci, setPodaci] = useState([]);
  const targetDate = "2022-11-23";

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=yQkaMbjrpoENdimAHGM5br5OQu0Z5haSphC9sget&date=${targetDate}`)
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

export default Slikesvemira;
