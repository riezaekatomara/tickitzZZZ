import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Ebv from "../assets/svg/ebv.svg";
import Hiflix from "../assets/svg/hiflix.svg";
import Cine from "../assets/svg/cine.svg";

const MovieDetails = () => {
  return (
    <div className="bg-white-100 min-h-screen">
      <Header />
      <div className="w-full h-[415px] bg-cover bg-[url(/png/bg-details.png)]"></div>
      {/* Movie Details */}
      <div className="mx-[70px] p-6 bg-white mt-6 rounded-md">
        <div className="relative">
          <img
            src="../src/assets/png/spiderman.png"
            alt="Spider-Man: Homecoming"
            className="w-1/4 rounded-md absolute bottom-[0.1px]"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold absolute left-73 bottom-25">
              Spider-Man: Homecoming
            </h2>
            <div className="flex space-x-3 mt-2 absolute left-73 bottom-14">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded">
                Action
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded ">
                Adventure
              </span>
            </div>
            <p className="mt-2 text-gray-700 relative left-68 top-15">
              <strong>Release Date:</strong> June 28, 2017
            </p>
            <p className="text-gray-700 relative left-68 top-15">
              <strong>Duration:</strong> 2 hours 13 minutes
            </p>
            <p className="text-gray-700 relative left-68 top-15">
              <strong>Directed by:</strong> Jon Watts
            </p>
            <p className="text-gray-700 relative left-68 top-15">
              <strong>Cast:</strong> Tom Holland, Michael Keaton, Robert Downey
              Jr.
            </p>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-15">
          {" "}
          {/* Diubah dari mt-0 menjadi mt-4 */}
          <h3 className="text-xl font-semibold">Synopsis</h3>
          <p className="text-gray-700 mt-2">
            Thrilled by his experience with the Avengers, Peter returns home,
            where he lives with his Aunt May, under the watchful eye of his new
            mentor Tony Stark. Peter tries to fall back into his normal daily
            routine - distracted by thoughts of proving himself to be more than
            just your friendly neighborhood Spider-Man - but when the Vulture
            emerges as a new villain, everything that Peter holds most important
            will be threatened.
          </p>
        </div>

        {/* Booking Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Book Tickets</h3>
          <div className="flex justify-between space-x-4 mt-2">
            <input
              type="date"
              className="cursor-pointer border px-4 py-2 rounded w-1/4"
            />
            <select className="cursor-pointer border px-4 py-2 rounded w-1/4">
              <option>08:30 AM</option>
              <option>12:00 PM</option>
              <option>03:30 PM</option>
            </select>
            <select className="cursor-pointer border px-4 py-2 rounded w-1/4">
              <option>Purwokerto</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
              Filter
            </button>
          </div>
        </div>

        {/* Cinema Selection */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Choose Cinema</h3>
          <div className="flex justify-between space-x-4 mt-4">
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Ebv}></img>
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Hiflix}></img>
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Cine}></img>
            </button>
            <button className="cursor-pointer border px-6 py-3 rounded bg-white hover:bg-primary">
              <img src={Ebv}></img>
            </button>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button className="border px-4 py-2 rounded">1</button>
            <button className="border px-4 py-2 rounded">2</button>
            <button className="border px-4 py-2 rounded">3</button>
            <button className="border px-4 py-2 rounded">4</button>
          </div>
          <div className="flex justify-center">
            <button className=" cursor-pointer bg-primary text-white hover:bg-white hover:text-primary px-6 py-2 rounded mt-4">
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
