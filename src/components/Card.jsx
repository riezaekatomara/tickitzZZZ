import { FaStar, FaPlay, FaTicketAlt, FaCalendarAlt } from "react-icons/fa";

const Card = ({ src, title, release, dataGenre = [], size, id, vote_average, genres, handleMovieDetails }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 7) return "text-yellow-500";
    if (rating >= 6) return "text-orange-500";
    return "text-red-500";
  };

  const getRatingBg = (rating) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 7) return "bg-yellow-500";
    if (rating >= 6) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="group flex flex-col w-60 mx-auto">
      {/* Movie Poster Container */}
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-200">
        <div
          className="w-full h-80 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${src})` }}
        >
          {/* Rating Badge */}
          {vote_average && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-bold">
              <FaStar className={`text-xs ${getRatingColor(vote_average)}`} />
              <span>{vote_average.toFixed(1)}</span>
            </div>
          )}

          {/* Recommended Badge */}
          {vote_average >= 8.5 && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">
              ⭐ Recommended
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => handleMovieDetails({ id, poster_path: src, title, genre_ids: dataGenre, overview: "", release_date: release })}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              <FaPlay className="text-sm" />
              Details
            </button>
            <button
              onClick={() => handleMovieDetails({ id, poster_path: src, title, genre_ids: dataGenre, overview: "", release_date: release })}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 border-2 border-blue-600 text-white font-bold rounded-full hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaTicketAlt className="text-sm" />
              Buy Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="pt-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Release Date */}
        {release && (
          <div className="flex items-center gap-2 text-blue-600">
            <FaCalendarAlt className="text-xs" />
            <span className="font-semibold text-sm">
              {new Date(release).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {dataGenre.slice(0, 3).map((genreId) => (
            <span
              key={genreId}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default"
            >
              {genres[genreId] || "Unknown"}
            </span>
          ))}
          {dataGenre.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
              +{dataGenre.length - 3} more
            </span>
          )}
        </div>

        {/* Rating Bar */}
        {vote_average && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${getRatingBg(vote_average)} transition-all duration-500`}
                style={{ width: `${(vote_average / 10) * 100}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${getRatingColor(vote_average)}`}>
              {vote_average.toFixed(1)}/10
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;