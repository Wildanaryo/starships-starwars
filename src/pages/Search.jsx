import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Gif from "../img/loadinggif.gif";

export default function Search({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://swapi.dev/api/starships/?search=${search}`
      );
      const jsonResp = await resp.json();
      setData(jsonResp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search && getData();
  }, [search]);

  if (!data) {
    return <h2>Loading....</h2>;
  }

  if (data.count === 0) {
    return (
      <div className="flex justify-center items-center">
        <h3 className="text-white border-2 border-white p-10 rounded-xl text-2xl transition-all hover:bg-sky-700 hover:scale-110">
          Data not found
        </h3>
      </div>
    );
  }

  const handleJumpLink = (ship) => {
    const data = ship.url.split("/");
    const shipId = data[5];
    return `/starship/${shipId}`;
  };

  if (!search) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <h3 className="text-white border-2 border-white p-10 rounded-xl text-2xl transition-all hover:bg-sky-700 hover:scale-110">
            Hit Search Button
          </h3>
        </div>
      </div>
    );
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
    <div className="flex justify-center">
      <div className="max-w-7xl">
        <div className="items-start">
          <h2 className="text-2xl sm:text-4xl text-white my-10">
            Search for {search} :
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {data.results &&
            data.results.map((ship) => (
              <Link
                to={handleJumpLink(ship)}
                key={ship.url}
                className="flex justify-center items-center border-2 border-white rounded-lg p-2 h-24 hover:bg-sky-700 hover:scale-110 transition-all"
              >
                <button key={ship.url}>
                  <h3 className="text-lg sm:text-3xl text-white">
                    {ship.name}
                  </h3>
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
