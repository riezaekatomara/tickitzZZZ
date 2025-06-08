import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

const UpcomingMovie = ({ upcomingMovies, genres, handleMovieDetails, upcomingMoviesRef, scrollLeft, scrollRight, isLoading }) => {
  return (
    <section className="px-4 lg:px-8 md:px-12 xl:px-24 py-16">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <FaCalendarAlt className="text-green-600" />
            <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Coming Soon</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Upcoming</span> Movies
          </h2>
          <p className="text-gray-600 text-lg max-w-xl">
            Get ready for the most anticipated movies coming to theaters. 
            Book your tickets early and don't miss out!
          </p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex gap-4">
          <button
            onClick={scrollLeft}
            className="group p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            aria-label="Scroll left"
          >
            <FaArrowLeft className="text-gray-700 text-lg group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollRight}
            className="group p-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            aria-label="Scroll right"
          >
            <FaArrowRight className="text-white text-lg group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Movies Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={upcomingMoviesRef}
          className="flex gap-6 overflow-x-auto pb-8 px-2 scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" }
          }}
        >
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex-shrink-0">
                <Skeleton />
              </div>
            ))
          ) : (
            upcomingMovies.map((movie, idx) => (
              <div 
                key={movie.id} 
                className="flex-shrink-0 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Card
                  title={movie.title}
                  dataGenre={movie.genre_ids}
                  src={movie.poster_path}
                  release={movie.release_date}
                  id={movie.id}
                  vote_average={movie.vote_average}
                  genres={genres}
                  handleMovieDetails={handleMovieDetails}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Release Timeline */}
      {!isLoading && upcomingMovies.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Release Timeline</h3>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingMovies.slice(0, 4).map((movie, idx) => {
                const releaseDate = new Date(movie.release_date);
                const monthName = releaseDate.toLocaleDateString('en-US', { month: 'long' });
                const day = releaseDate.getDate();
                
                return (
                  <div key={movie.id} className="text-center">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaClock className="text-green-600 text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {monthName} {day}
                    </div>
                    <div className="text-gray-600 font-medium truncate">
                      {movie.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Don't Miss Out!</h3>
          <p className="text-lg mb-6 opacity-90">
            Be the first to watch these amazing upcoming movies. 
            Set reminders and book your tickets in advance.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaCalendarAlt />
            Set Reminder
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMovie;