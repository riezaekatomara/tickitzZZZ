import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

const PopularMovie = ({ popularMovies, genres, handleMovieDetails, isViewMore, setIsViewMore, isLoading }) => {
  return (
    <section className="px-4 lg:px-8 md:px-12 xl:px-24 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
          <FaStar className="text-blue-600" />
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Popular Movies</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Exciting Movies That Should Be{" "}
          <br className="hidden lg:block" />
          <span className="text-blue-600">Watched Today</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the most popular movies that everyone is talking about. 
          From action-packed blockbusters to heartwarming dramas.
        </p>
      </div>

      {/* Movies Grid */}
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-6 py-8">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} />
            ))
          ) : !isViewMore ? (
            // Show first 5 movies
            popularMovies.slice(0, 5).map((movie, idx) => (
              <div 
                key={movie.id} 
                className="transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Card
                  title={movie.title}
                  dataGenre={movie.genre_ids}
                  src={movie.poster_path}
                  id={movie.id}
                  vote_average={movie.vote_average}
                  genres={genres}
                  handleMovieDetails={handleMovieDetails}
                />
              </div>
            ))
          ) : (
            // Show all movies
            popularMovies.map((movie, idx) => (
              <div 
                key={movie.id} 
                className="transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${(idx % 10) * 50}ms` }}
              >
                <Card
                  title={movie.title}
                  dataGenre={movie.genre_ids}
                  src={movie.poster_path}
                  id={movie.id}
                  vote_average={movie.vote_average}
                  genres={genres}
                  handleMovieDetails={handleMovieDetails}
                />
              </div>
            ))
          )}
        </div>

        {/* Gradient Overlay for View More Effect */}
        {!isViewMore && !isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        )}
      </div>

      {/* View More/All Button */}
      <div className="flex justify-center mt-12">
        {!isViewMore ? (
          <button
            onClick={() => setIsViewMore(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl pulse-on-hover"
          >
            <FaPlay className="text-sm" />
            <span>View More Movies</span>
            <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform" />
          </button>
        ) : (
          <Link
            to="/movie"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaPlay className="text-sm" />
            <span>Explore All Movies</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Statistics */}
      {!isLoading && popularMovies.length > 0 && (
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{popularMovies.length}</div>
              <div className="text-gray-600">Popular Movies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(popularMovies.reduce((acc, movie) => acc + movie.vote_average, 0) / popularMovies.length * 10) / 10}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(popularMovies.flatMap(movie => movie.genre_ids)).size}
              </div>
              <div className="text-gray-600">Different Genres</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularMovie;