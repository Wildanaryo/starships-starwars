import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Gif from "../img/loadinggif.gif";

export default function StarShipDetails() {
  const [dataShip, setDataShip] = useState();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { shipId } = useParams();

  const getStarship = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`https://swapi.dev/api/starships/${shipId}/`);
      const jsonResp = await resp.json();
      setDataShip(jsonResp);
      await fetchFilms(jsonResp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilms = async (dataFetch) => {
    // if (!dataShip) return;
    try {
      const filmPromises = dataFetch.films.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      });
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const loadData = async () => {
  // };

  useEffect(() => {
    getStarship();
    // loadData();
  }, []);

  function formatText(text) {
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  function formatNumber(number) {
    // if (!number) return "";
    return parseInt(number).toLocaleString();
  }

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: "0px",
        }}
      >
        <img src={Gif} alt="" />
      </div>
    );
  }

  return (
    <div className="flex justify-center my-5">
      <div className="min-w-fit px-2 sm:px-10">
        {dataShip ? (
          <div>
            <div className="flex justify-center items-center mb-10">
              <div className="text-white transition-all text-3xl sm:text-6xl text-center">
                {formatText(dataShip.name)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white text-base sm:text-3xl min-w-fit">
              <h3 className="text-right font-bold">Model</h3>
              <h3 className="font-thin">{formatText(dataShip.model)}</h3>
              <h3 className="text-right font-bold">Manufacturer</h3>
              <h3 className="font-thin">{formatText(dataShip.manufacturer)}</h3>
              <h3 className="text-right font-bold">Cost</h3>
              <h3 className="font-thin">
                {formatNumber(dataShip.cost_in_credits)} credits
              </h3>
              <h3 className="text-right font-bold">Length</h3>
              <h3 className="font-thin">{formatNumber(dataShip.length)} m</h3>
              <h3 className="text-right font-bold">Max Speed</h3>
              <h3 className="font-thin">
                {formatNumber(dataShip.max_atmosphering_speed)} kph
              </h3>
              <h3 className="text-right font-bold">Crew</h3>
              <h3 className="font-thin">{formatNumber(dataShip.crew)}</h3>
              <h3 className="text-right font-bold">Passengers</h3>
              <h3 className="font-thin">{formatNumber(dataShip.passengers)}</h3>
              <h3 className="text-right font-bold">Starship Class</h3>
              <h3 className="font-thin">
                {formatText(dataShip.starship_class)}
              </h3>

              <h3 className="text-right font-bold">Feature in Films</h3>
              <div>
                {films.map((film) => (
                  <h3 key={film.url} className="font-thin">
                    {film.title}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h2>Data kapal bintang tidak ditemukan</h2>
        )}
      </div>
    </div>
  );
}
