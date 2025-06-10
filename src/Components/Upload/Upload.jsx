import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
      const uploadResponse = await axios.post(
        "http://13.48.37.38:3000/detection/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 120000,
        }
      );

      setMessage("Upload successful! Refreshing...");
      sessionStorage.setItem("scrollY", window.scrollY);

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    } catch (err) {
      setMessage("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const modal = (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="upload-modal"
    >
      <div className="upload-content">
        <button onClick={onClose} className="flex justify-end mb-3 ml-auto">
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

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}
