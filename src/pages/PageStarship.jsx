import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import backgroundImage from "../img/space-background.jpg";
import Gif from "../img/loadinggif.gif";
import { useEffect, useState } from "react";

export default function PageStarship() {
  const [dataShip, setdataShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pageId } = useParams();

  const getStarship = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://swapi.dev/api/starships/?page=${pageId}`
      );
      const jsonResp = await resp.json();
      setdataShip(jsonResp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageId) {
      getStarship();
    }
  }, [pageId]);

  function formatText(text) {
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  const handleJumpLink = (ship) => {
    const data = ship.url.split("/");
    const shipId = data[5];
    return `/starship/${shipId}`;
  };

  const handleJumpPageNext = () => {
    if (!dataShip || !dataShip.next) {
      return `/starship/pages/1`;
    }

    const data = dataShip.next.split("=");
    const pageId = data[1];
    return `/starship/pages/${pageId}`;
  };

  const handleJumpPagePrevious = () => {
    if (!dataShip || !dataShip.previous) {
      return `/starship/pages/4`;
    }

    const data = dataShip.previous.split("=");
    const pageId = data[1];
    return `/starship/pages/${pageId}`;
  };

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
        <img src={Gif} alt="" className="min-w-full sm:min-w-fit" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="flex justify-center mb-10">
        <h1 className="text-2xl sm:text-5xl text-white text-center">
          Starship in Star Wars
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-fit">
          {dataShip ? (
            dataShip.results.map((ship, index) => (
              <Link
                to={handleJumpLink(ship)}
                key={index}
                className="flex justify-center items-center border-2 border-white rounded-lg p-2 hover:bg-sky-700 hover:scale-110 transition-all h-24"
              >
                <button className="flex ">
                  <h3 className=" text-white text-xl sm:text-3xl">
                    {formatText(ship.name)}
                  </h3>
                </button>
              </Link>
            ))
          ) : (
            <h3>Sedang memuat data kapal</h3>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <nav className="sticky bottom-0 justify-center grid grid-cols-2 gap-10">
          <Link
            to={handleJumpPagePrevious()}
            className="border-2 border-white rounded p-2 flex justify-center hover:bg-rose-700 hover:scale-110 transition-all"
          >
            <button className="text-white text-xl">Previous</button>
          </Link>
          <Link
            to={handleJumpPageNext()}
            className="border-2 border-white rounded p-2 flex justify-center hover:bg-rose-700 hover:scale-110 transition-all"
          >
            <button className="text-white text-xl">Next</button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
