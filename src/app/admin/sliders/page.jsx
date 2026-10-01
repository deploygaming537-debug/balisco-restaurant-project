"use client";

import { useState } from "react";

export default function AdminSlidersPage() {
  const [selectedSpot, setSelectedSpot] = useState("home_hero_1");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Spot options with categories
  const spotOptions = [
    // Hero Section [cite: 10]
    { label: "Hero Page - Slider Banner 1", value: "home_hero_1" },
    { label: "Hero Page - Slider Banner 2", value: "home_hero_2" },

    // Vouchers Page [cite: 1]
    { label: "Vouchers Page - Side Image 1 (menu2)", value: "voucher_image1" },
    { label: "Vouchers Page - Order Online Icon", value: "voucher_icon1" },
    { label: "Vouchers Page - Gift Icon (gift-card)", value: "voucher_icon2" },
    { label: "Vouchers Page - Side Image 2 (menu3)", value: "voucher_image2" },

    // Baaki options (Chefs, opening hours, gallery etc.) Tackle
    { label: "Gallery Image 1", value: "gallery_1" },
    { label: "Gallery Image 2", value: "gallery_2" },
    { label: "Our Restaurant Chef 1", value: "chef_1" },
    { label: "Our Restaurant Chef 2", value: "chef_2" },
    { label: "Opening Hours Banner", value: "opening_hours" },
    { label: "Why Choose Us Image", value: "why_choose_us" },
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUploadAndUpdate = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Kripya pehle ek image file select karein!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload Image to /api/upload Route
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(
          `Upload API Endpoint (/api/upload) error (Status: ${uploadRes.status})`,
        );
      }

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error || "Image upload fail ho gaya");
      }

      const uploadedImageUrl = uploadData.url;

      // Step 2: Update Setting API
      const updateRes = await fetch("/api/settings/slider", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotKey: selectedSpot,
          imageUrl: uploadedImageUrl,
        }),
      });

      if (!updateRes.ok) {
        throw new Error(
          `Slider Settings API (/api/settings/slider) error (Status: ${updateRes.status})`,
        );
      }

      const updateData = await updateRes.json();

      if (updateData.success) {
        alert("✨ Image successfully updated!");
        setFile(null);
        setPreview(null);
      } else {
        alert("Image update fail ho gaya.");
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#1e1e1e",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid #2d2d2d",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#d4af37", // Gold Accent Color
              marginBottom: "8px",
              letterSpacing: "0.5px",
            }}
          >
            Manage Website Images & Banners
          </h2>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Select a spot and upload a new image to update instantly.
          </p>
        </div>

        <form onSubmit={handleUploadAndUpdate}>
          {/* Dropdown Spot Selection */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#e0e0e0",
              }}
            >
              Choose Page / Spot:
            </label>
            <select
              value={selectedSpot}
              onChange={(e) => setSelectedSpot(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
                border: "1px solid #444",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {spotOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom File Upload Box */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#e0e0e0",
              }}
            >
              Upload New Image:
            </label>
            <div
              style={{
                border: "2px dashed #444",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#262626",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  color: "#bbb",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Image Preview Card */}
          {preview && (
            <div style={{ marginBottom: "25px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#888",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                IMAGE PREVIEW:
              </p>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #333",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "#555"
                : "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Uploading & Updating..." : "UPDATE IMAGE NOW"}
          </button>
        </form>
      </div>
    </div>
  );
}
