import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Ebv from "../assets/svg/ebv.svg";
import Hiflix from "../assets/svg/hiflix.svg";
import Cine from "../assets/svg/cine.svg";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    // Fetch genres list
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        const genresMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genresMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    // Fetch movie details
    const fetchMovieDetails = async () => {
      if (!id) {
        navigate("/movie");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);

        // Fetch credits for director and cast
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsResponse.json();

        // Get director
        const directorInfo = creditsData.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "Unknown");

        // Get top cast members
        setCast(creditsData.cast.slice(0, 3).map((actor) => actor.name));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchGenres();
    fetchMovieDetails();
  }, [id, navigate]);

  // Convert minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="bg-white-100 min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Loading movie details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-white-100 min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Movie not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white-100 min-h-screen">
      <Header />
      <div
        className="w-full h-[415px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Movie Details */}
      <div className="mx-4 md:mx-[70px] p-6 bg-white mt-6 rounded-md">
        <div className="relative flex flex-col md:flex-row md:items-start mb-24 md:mb-6">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="relative bottom-40 w-[264px] h-[347px] md:w-1/4 rounded-md shadow-lg mb-4 md:mb-0"
          />

          <div className="relative bottom-8 md:ml-6 flex-1">
            <h2 className="text-[32px] w-[418px] h-[34px] font-bold pb-13">
              {movie.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="w-[110px] h-[31px] bg-gray-100 text-gray-800 px-3 py-1 rounded-[20px]"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Modifikasi: Grid 2x2 untuk Movie Details Info dengan posisi Duration dan Directed by ditukar */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Release Date</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Directed by</p>
                <p className="text-gray-900 font-medium">{director}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Duration</p>
                <p className="text-gray-900 font-medium">
                  {formatRuntime(movie.runtime)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Cast</p>
                <p className="text-gray-900 font-medium">{cast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Synopsis</h3>
          <p className="text-gray-700 mt-2">{movie.overview}</p>
        </div>

        {/* Booking Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Book Tickets</h3>
          <div className="flex flex-wrap justify-between gap-4 mt-2">
            <input
              type="date"
              className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4"
            />
            <select className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4">
              <option>08:30 AM</option>
              <option>12:00 PM</option>
              <option>03:30 PM</option>
            </select>
            <select className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4">
              <option>Purwokerto</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
              Filter
            </button>
          </div>
        </div>

        {/* Cinema Selection */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Choose Cinema</h3>
          <div className="flex flex-wrap justify-between gap-4 mt-4">
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Ebv} alt="EBV Cinema" />
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Hiflix} alt="Hiflix Cinema" />
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Cine} alt="Cine Cinema" />
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Ebv} alt="EBV Cinema" />
            </button>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button className="border px-4 py-2 rounded">1</button>
            <button className="border px-4 py-2 rounded">2</button>
            <button className="border px-4 py-2 rounded">3</button>
            <button className="border px-4 py-2 rounded">4</button>
          </div>
          <div className="flex justify-center">
            <button className="cursor-pointer bg-primary text-white hover:bg-white hover:text-primary px-6 py-2 rounded mt-4">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
