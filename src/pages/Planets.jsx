import { useEffect, useState } from "react";

export default function Planets() {
  const [data, setData] = useState(null);

  const dataPlanets = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };

  const dataPlanets1 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets/?page=2");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };
  const dataPlanets2 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets/?page=3");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };
  const dataPlanets3 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets/?page=4");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };
  const dataPlanets4 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets/?page=5");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };
  const dataPlanets5 = async () => {
    try {
      const resp = await fetch("https://swapi.dev/api/planets/?page=6");
      const planetsResp = await resp.json();
      console.log(planetsResp);
      return planetsResp.results;
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data1 = await dataPlanets();
    const data2 = await dataPlanets1();
    const data3 = await dataPlanets2();
    const data4 = await dataPlanets3();
    const data5 = await dataPlanets4();
    const data6 = await dataPlanets5();

    const data = data1.concat(data2, data3, data4, data5, data6);
    console.log(data);
    setData(data);
  };

  return (
    <div>
      <h1>Planet</h1>
      {data
        ? data.map((post) => (
            <div>
              <h3>{post.name}</h3>
              <p>Diameter: {post.diameter}</p>
              <p>Rotasion Peroid: {post.rotation_period}</p>
              <p>Orbital Peroid: {post.orbital_period}</p>
              <p>Gravity : {post.gravity}</p>
              <p>Population : {post.population}</p>
              <ul>
                Climates :<li>{post.climate}</li>
              </ul>
            </div>
          ))
        : "Loading...."}
    </div>
  );
}
