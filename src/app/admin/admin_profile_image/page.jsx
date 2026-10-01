"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AdminProfileImage = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Existing admin image get karna
  useEffect(() => {
    const getAdminImage = async () => {
      try {
        const response = await fetch("/api/admin", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setImage(data.admin.image || "");
        }
      } catch (error) {
        console.log("GET ADMIN IMAGE ERROR:", error);
      }
    };

    getAdminImage();
  }, []);

  // Image select hone par
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Sirf image allow
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch("/api/admin/profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // New image show karna
      setImage(data.image);

      toast.success("Profile image updated successfully");
    } catch (error) {
      console.log("UPLOAD IMAGE ERROR:", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="admin-profile-circle"
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <img src={image} alt="Admin Profile" />
        ) : (
          <span>👤</span>
        )}

        {loading && (
          <div className="admin-image-loading">
            Uploading...
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default AdminProfileImage;