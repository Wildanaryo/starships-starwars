import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImage from "../img/space-background.jpg";

export default function Starship() {
  const [combinedData, setCombinedData] = useState(null);

  const fetchStarship1 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/starships/");
      const jsonResp = await resp.json();
      return jsonResp;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const api1Data = await fetchStarship1();

    const combinedData = api1Data;
    setCombinedData(combinedData);
    console.log(combinedData);
  };

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
    const data = combinedData.next?.split("=");
    const pageId = data[1];
    console.log(pageId);
    return `/starship/pages/${pageId}`;
  };

  const handleJumpPagePrevious = () => {
    if (combinedData.previous === null) return "/starship/pages/4";

    const data = combinedData.previous?.split("=");
    const pageId = data[1];
    console.log(pageId);
    return `/starship/pages/${pageId}`;
  };

  if (!combinedData) {
    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div>
          <iframe
            src="https://giphy.com/embed/RgzryV9nRCMHPVVXPV"
            width="480"
            height="480"
            style={{ border: "none" }}
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/trippy-abstract-pi-slices-RgzryV9nRCMHPVVXPV"></a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <h1>Starship in Star Wars</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "10px",
        }}
      >
        {combinedData ? (
          combinedData.results.map((ship, index) => (
            <Link to={handleJumpLink(ship)} key={index}>
              <button
                style={{
                  width: "500px",
                }}
              >
                <h3>{formatText(ship.name)}</h3>
              </button>
            </Link>
          ))
        ) : (
          <p>Mengambil data kapal bintang...</p>
        )}
      </div>
      <nav style={{ position: "fixed", bottom: "10px" }}>
        <Link to={handleJumpPagePrevious()}>
          <button>Previous</button>
        </Link>
        <Link to={handleJumpPageNext()}>
          <button>Next</button>
        </Link>
      </nav>
    </div>
  );
}
