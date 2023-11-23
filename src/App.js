// import "./App.css";

// import Slikesvemira from "./Components/Slikesvemira";
// import SlikeMarsa from "./Components/SlikeMarsa";

// function App() {
//   return (
//     <div className="App">
//       <Slikesvemira />
//       <SlikeMarsa />
//     </div>
//   );
// }

// export default App;
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [serije, setSerije] = useState([]);
  const [pretraga, setPretraga] = useState("");
  const [aktivnoPolje, setAktivnoPolje] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (aktivnoPolje) {
      const fetchData = async () => {
        const result = await fetch(
          `https://api.tvmaze.com/search/shows?q=${pretraga}&page=${page}`
        );
        const jsonResult = await result.json();
        setSerije((prevSerije) => [...prevSerije, ...jsonResult]);
        setAktivnoPolje(false);
      };

      fetchData();
    }
  }, [pretraga, page, aktivnoPolje]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    setPage(1);
    setSerije([]);
    setAktivnoPolje(true);
  };

  return (
    <div className="App container mt-4">
      <h1>Popis serija</h1>
      <div className="mb-3">
        <input
          type="text"
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
          className="form-control"
          placeholder="Unesite naziv serije"
          disabled={aktivnoPolje}
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">
          Pretraži
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Ime serije</th>
              <th scope="col">Slika</th>
              <th scope="col">Opis</th>
              <th scope="col">Godina izdanja</th>
            </tr>
          </thead>
          <tbody>
            {serije.map((serija) => (
              <tr key={serija.show.id}>
                <td>{serija.show.name}</td>
                <td>
                  {serija.show.image ? (
                    <img
                      src={serija.show.image.medium}
                      alt={serija.show.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    "Nema slike"
                  )}
                </td>
                <td>{serija.show.summary}</td>
                <td>{serija.show.premiered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


