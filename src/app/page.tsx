"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Background from "@/components/Background";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputData}`,
        {
          responseType: "arraybuffer", // Ensure binary data is correctly received
        }
      );

      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      setQrCodeImage(base64Image);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCodeImage = () => {
    if (qrCodeImage) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${qrCodeImage}`;
      link.download = "qrcode.png";
      link.click();
    }
  };

  const clearQRCodeImage = () => {
    setInputData("");
    setQrCodeImage("");
  };

  return (
    <div className="flex font-OpenSans font-bold h-screen justify-center items-center">
      <Background />
      <div className="py-5 drop-shadow-xl w-full sm:h-auto sm:w-[20rem] bg-white rounded-3xl flex flex-col">
        <h1 className="font-Poppins px-10 py-5 drop-shadow-md text-3xl text-blue-400">
          QRby
        </h1>
        <textarea
          className="mx-10 px-2 py-2 rounded-md focus:border-2 border-2 focus:border-blue-300"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="What's your secret today?"
        />
        <button
          className="bg-blue-700 transition duration-300 focus:border-blue-950 border-blue-700 hover:border-blue-800 border-2  hover:bg-blue-800 my-5 mx-10 py-2 rounded-xl text-white"
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>
        {qrCodeImage && (
          <div className="flex flex-col bg-blue-400 p-10 rounded-t-3xl">
            <img
              src={`data:image/png;base64,${qrCodeImage}`}
              alt="Generated QR Code"
              className="p-2 bg-white rounded-2xl"
            />
            <button
              className="bg-blue-700 transition duration-300 focus:border-blue-950 border-blue-700 hover:border-blue-800 border-2  hover:bg-blue-800 mt-5 py-2 rounded-xl text-white"
              onClick={downloadQRCodeImage}
            >
              Download QR Code
            </button>
            <button
              className="bg-blue-700 transition duration-300 focus:border-blue-950 border-blue-700 hover:border-blue-800 border-2  hover:bg-blue-800 mt-5 py-2 rounded-xl text-white"
              onClick={clearQRCodeImage}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <div className="fixed text-blue-500 bottom-2 font-Poppins flex items-center left-2">
        QRby
        <Link
          href="https://github.com/srajankumar/qrby"
          className="hover:underline px-1 hover:text-blue-700 font-OpenSans font-bold"
          target="_blank"
        >
          @srajankumar
        </Link>
      </div>
    </div>
  );
}
