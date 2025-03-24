import React, { useState } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import HeaderDashboard from "../components/HeaderDashboard";

const AddNewMovie = () => {
  const [formData, setFormData] = useState({
    image: null,
    movieName: "Spider-Man: Homecoming",
    category: "Action, Adventure, Sci-Fi",
    releaseDate: "07/05/2020",
    durationHour: "2",
    durationMinute: "13",
    directorName: "Jon Watts",
    cast: "Tom Holland, Michael Keaton, Robert Dow..",
    synopsis:
      "Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May.",
    location: "Purwokerto, Bandung, Bekasi",
    showTimes: [{ date: "Set a date", times: ["08:30am", "10:30pm"] }],
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const addShowTimeSlot = () => {
    const newShowTimes = [...formData.showTimes];
    newShowTimes[0].times.push("");
    setFormData({ ...formData, showTimes: newShowTimes });
  };

  const updateShowTime = (index, value) => {
    const newShowTimes = [...formData.showTimes];
    newShowTimes[0].times[index] = value;
    setFormData({ ...formData, showTimes: newShowTimes });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.image && !imagePreview)
      newErrors.image = "Movie image is required";
    if (!formData.movieName) newErrors.movieName = "Movie name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.releaseDate)
      newErrors.releaseDate = "Release date is required";
    if (!formData.durationHour) newErrors.durationHour = "Hour is required";
    if (!formData.durationMinute)
      newErrors.durationMinute = "Minute is required";
    if (!formData.directorName)
      newErrors.directorName = "Director name is required";
    if (!formData.cast) newErrors.cast = "Cast is required";
    if (!formData.synopsis) newErrors.synopsis = "Synopsis is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.showTimes[0].date === "Set a date")
      newErrors.showDate = "Show date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedData = {
        ...formData,
        duration: `${formData.durationHour} Hours ${formData.durationMinute} Minute`,
      };

      alert("Movie saved successfully!");
      console.log("Submitting data:", formattedData);
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashboard />

      {/* Main content */}
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-xl font-semibold mb-6">Add New Movie</h1>

          <form onSubmit={handleSubmit}>
            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="mt-1 flex items-center">
                {imagePreview ? (
                  <div className="relative w-32 h-32 mr-3">
                    <img
                      src={imagePreview}
                      alt="Movie poster preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : null}
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium">
                    Upload
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Movie Name */}
            <div className="mb-4">
              <label
                htmlFor="movieName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Movie Name
              </label>
              <input
                type="text"
                id="movieName"
                name="movieName"
                value={formData.movieName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.movieName ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.movieName && (
                <p className="mt-1 text-sm text-red-600">{errors.movieName}</p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.category ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Release Date and Duration */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="releaseDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Release date
                </label>
                <input
                  type="text"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
                  className={`w-full px-3 py-2 border ${
                    errors.releaseDate ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.releaseDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.releaseDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (hour / minute)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="durationHour"
                    value={formData.durationHour}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.durationHour ? "border-red-300" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  <input
                    type="text"
                    name="durationMinute"
                    value={formData.durationMinute}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.durationMinute
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {(errors.durationHour || errors.durationMinute) && (
                  <p className="mt-1 text-sm text-red-600">
                    Duration is required
                  </p>
                )}
              </div>
            </div>

            {/* Director Name */}
            <div className="mb-4">
              <label
                htmlFor="directorName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Director Name
              </label>
              <input
                type="text"
                id="directorName"
                name="directorName"
                value={formData.directorName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.directorName ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.directorName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.directorName}
                </p>
              )}
            </div>

            {/* Cast */}
            <div className="mb-4">
              <label
                htmlFor="cast"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cast
              </label>
              <input
                type="text"
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.cast ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cast && (
                <p className="mt-1 text-sm text-red-600">{errors.cast}</p>
              )}
            </div>

            {/* Synopsis */}
            <div className="mb-4">
              <label
                htmlFor="synopsis"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Synopsis
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                rows="4"
                value={formData.synopsis}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.synopsis ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              ></textarea>
              {errors.synopsis && (
                <p className="mt-1 text-sm text-red-600">{errors.synopsis}</p>
              )}
            </div>

            {/* Add Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Add Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.location ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Set Date & Time */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Date & Time
              </label>

              <div className="mb-2">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Set a date
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {errors.showDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.showDate}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={addShowTimeSlot}
                  className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </button>

                {formData.showTimes[0].times.map((time, index) => (
                  <input
                    key={index}
                    type="text"
                    value={time}
                    onChange={(e) => updateShowTime(index, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm w-20"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewMovie;
