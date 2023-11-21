import React, { useEffect, useState } from 'react';


const SlikeMarsa = () => {
  const [podaci, setPodaci] = useState([]);
  const sol = 2000; 

  useEffect(() => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=2&api_key=yQkaMbjrpoENdimAHGM5br5OQu0Z5haSphC9sget`)
      .then((response) => response.json())
      .then((nasaData) => setPodaci(nasaData.photos));
  }, [sol]);

  return (
    <div>
      <h1>-Slike sa Marsa-</h1>
      {podaci.map((photo) => (
        <div key={photo.id}>
          <h1>ID slike: {photo.id}</h1>
          <img src={photo.img_src} alt={`Mars ${photo.id}`} />
          <p>Kamera: {photo.camera.full_name}</p>
        </div>
      ))}
    </div>
  );
}

export default SlikeMarsa;



