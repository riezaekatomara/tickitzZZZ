import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Logo2 from "../../assets/images/svg/logo-tickitz2.svg";
import PanahBiru from "../../assets/images/svg/panah-biru-kebawah.svg";
import QRCode from "../../assets/images/png/qrcode.png";

const TickitResult = () => {
  // Fungsi untuk mendownload QR Code
  const downloadQRCode = () => {
    const img = document.getElementById("qr-code-img");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height);

    const pngUrl = canvas.toDataURL("image/png");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "movie-ticket-qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const qrCodeContent = "https://tickitz.id/ticket/spider-man-pgr13-07jul-2pm";

  // const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
  //   qrCodeContent
  // )}`;

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex flex-1">
        <div className="w-3/5 bg-cover bg-center relative bg-[url(/png/bg-avanger.png)]">
          <div className="absolute inset-0 bg-black/70 bg-opacity-"></div>
          <div className="relative h-full flex flex-col justify-center text-white p-20">
            <img src={Logo2} className="w-[276px] h-[104px]"></img>
            <h2 className="text-4xl font-bold mb-6">Thankyou For Purchasing</h2>
            <p className="mb-8 text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
              tempor integer sed magna et.
            </p>
            <button className="cursor-pointer flex items-center text-white w-max">
              Please Download Your Ticket
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-2/5 bg-gray-100 p-10 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-sm">
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <img
                id="qr-code-img"
                src={QRCode}
                alt="Ticket QR Code"
                width="150"
                height="150"
              />
            </div>

            <div className="grid grid-cols-2 gap-y-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Movie</p>
                <p className="font-medium">Spider-Man: ..</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="font-medium">PG-13</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="font-medium">07 Jul</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="font-medium">2:00pm</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Count</p>
                <p className="font-medium">3 pcs</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Seats</p>
                <p className="font-medium">C4, C5, C6</p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">$30.00</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={downloadQRCode}
                className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 py-3 rounded-md gap-2"
              >
                <img src={PanahBiru}></img>
                Download
              </button>
              <button className="cursor-pointer bg-blue-600 text-white hover:bg-white hover:text-primary py-3 rounded-md">
                Done
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TickitResult;
