"use client";
import { useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data for QR code"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeImage && (
        <img
          src={`data:image/png;base64,${qrCodeImage}`}
          alt="Generated QR Code"
        />
      )}
    </div>
  );
}
