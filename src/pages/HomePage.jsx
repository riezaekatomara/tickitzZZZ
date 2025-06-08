import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../layouts/HeroSection";
import FeaturesSection from "../layouts/FeaturesSection";
import PopularMovie from "../layouts/PopularMovie";
import UpcomingMovie from "../layouts/UpcomingMovie";
import MoreInfo from "../layouts/MoreInfo";
import "../styles/button-animations.css";

const HomePage = () => {
  const navigate = useNavigate();
  const orderState = useSelector((state) => state.order);
  const upcomingMoviesRef = useRef(null);
  
  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;
  const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isViewMore, setIsViewMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(GENRE_LIST_URL);
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

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const [popularResponse, upcomingResponse] = await Promise.all([
          fetch(POPULAR_MOVIES_URL),
          fetch(UPCOMING_MOVIES_URL)
        ]);

        const popularData = await popularResponse.json();
        const upcomingData = await upcomingResponse.json();
        
        setPopularMovies(popularData.results);
        setUpcomingMovies(upcomingData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);

  const handleMovieDetails = (movie) => {
    // Navigate to movie details page
    navigate(`/movie/${movie.id}`, { state: movie });
  };

  const scrollLeft = () => {
    if (upcomingMoviesRef.current) {
      upcomingMoviesRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (upcomingMoviesRef.current) {
      upcomingMoviesRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header className={isScrolled ? "shadow-lg bg-white/95 backdrop-blur-sm" : "bg-white"} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white">
          <HeroSection />
        </div>

        {/* Features Section */}
        <div className="bg-white">
          <FeaturesSection />
        </div>

        {/* Popular Movies Section */}
        <div className="bg-gray-50">
          <PopularMovie 
            popularMovies={popularMovies}
            genres={genres}
            handleMovieDetails={handleMovieDetails}
            isViewMore={isViewMore}
            setIsViewMore={setIsViewMore}
            isLoading={isLoading}
          />
        </div>

        {/* Upcoming Movies Section */}
        <div className="bg-white">
          <UpcomingMovie 
            upcomingMovies={upcomingMovies}
            genres={genres}
            handleMovieDetails={handleMovieDetails}
            upcomingMoviesRef={upcomingMoviesRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
            isLoading={isLoading}
          />
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50">
          <MoreInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;