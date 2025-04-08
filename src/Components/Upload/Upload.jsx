import React, { useRef, useState } from "react";
import axios from "axios";
import "./Upload.css";
import { X } from "lucide-react";

export default function Upload({ onClose }) {
  const modalRef = useRef();
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    try {
      console.log("Uploading files...");
      const uploadResponse = await axios.post(
        "http://localhost:3000/detection/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 120000,
        }
      );

      console.log("Upload response:", uploadResponse.data);
    } catch (err) {
      setMessage("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[9999]"
    >
      <div className="text-white bg-black p-14 rounded-3xl text-center">
        <button onClick={onClose} className="flex justify-end mb-3">
          <X />
        </button>
        <h1 className="mb-4 font-extrabold">Upload Image Batch</h1>
        <p className="text-2xl mb-5">
          Upload a batch of images to have them scanned.
        </p>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          accept="image/*"
        />

        <button
          className="button-bg text-black font-medium p-3"
          onClick={handleFileSelect}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Batch"}
        </button>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
