import { useState } from "react";
import { EyeIcon, Pencil, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import HeaderDashboard from "../components/HeaderDashboard.jsx";
import Navi from "../assets/svg/navigation.svg";

const Admin = () => {
  const initialMovies = [
    {
      id: 1,
      thumbnail: "/png/spiderman.png",
      name: "Spiderman HomeComing",
      category: "Action, Adventure",
      releaseDate: "07/05/2023",
      duration: "2 Hours 15 Minute",
    },
    {
      id: 2,
      thumbnail: "/png/black-widoww.png",
      name: "Avengers End Game",
      category: "Sci-fi, Adventure",
      releaseDate: "10/06/2023",
      duration: "2 Hours 15 Minute",
    },
    {
      id: 3,
      thumbnail: "/png/spiderman.png",
      name: "Spiderman HomeComing",
      category: "Action, Adventure",
      releaseDate: "02/03/2023",
      duration: "2 Hours 15 Minute",
    },
    {
      id: 4,
      thumbnail: "/png/black-widoww.png",
      name: "Avengers End Game",
      category: "Sci-fi, Adventure",
      releaseDate: "01/09/2023",
      duration: "2 Hours 15 Minute",
    },
    {
      id: 5,
      thumbnail: "/png/spiderman.png",
      name: "Spiderman HomeComing",
      category: "Action, Adventure",
      releaseDate: "07/08/2023",
      duration: "2 Hours 15 Minute",
    },
  ];

  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      setMovies(movies.filter((movie) => movie.id !== movieToDelete.id));
    }
    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const handleViewClick = (movie) => {
    alert(`Viewing details for ${movie.name}`);
  };

  const handleEditClick = (movie) => {
    alert(`Editing ${movie.name}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashboard />

      {/* Main content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">List Movie</h1>

            <div className="flex gap-4">
              <div className="relative">
                <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>November 2023</span>
                  <img src={Navi}></img>
                </div>
              </div>

              <Link to="/add-new-movie">
                <button className="cursor-pointer bg-primary hover:bg-gray-200 text-white hover:text-primary font-medium py-2 px-4 rounded-lg">
                  Add Movies
                </button>
              </Link>
            </div>
          </div>

          {/* Movie Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thumbnail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Movie Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Released Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img
                          src={movie.thumbnail}
                          alt={movie.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">
                        {movie.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {movie.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {movie.releaseDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {movie.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewClick(movie)}
                          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          <EyeIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(movie)}
                          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(movie)}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex space-x-2" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1
              </button>
              <button
                onClick={() => handlePageChange(2)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 2
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                2
              </button>
              <button
                onClick={() => handlePageChange(3)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 3
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                3
              </button>
              <button
                onClick={() => handlePageChange(4)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 4
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                4
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "{movieToDelete?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
