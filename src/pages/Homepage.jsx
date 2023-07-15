import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex flex-col justify-center items-center h-[700px] min-w-fit">
      <h1 className="text-center text-base sm:text-4xl text-white">
        Welcome to Starship Garage
      </h1>
      <Link to="/starship/pages/1" className="mt-4">
        <button className="p-4 px-8 bg-sky-900 text-white rounded-xl min-w-fit">
          <h2 className="text-center text-base sm:text-3xl">
            Let's Get Started!
          </h2>
        </button>
      </Link>
    </div>
  );
}
