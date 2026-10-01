"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditProfile = () => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    contact: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");

    if (data) {
      const user = JSON.parse(data);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        city: user.city || "",
        address: user.address || "",
        contact: user.contact || "",
      });

      setImage(user.image || "");
      setImagePreview(user.image);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const seletedImage = event.target.files[0];

    if (!seletedImage.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    if (seletedImage.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setImage(seletedImage);
    const previewUrl = URL.createObjectURL(seletedImage);
    setImagePreview(previewUrl);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      let imageUrl = image;

      if (image instanceof File) {
        setLoading(true);

        const uploadFormData = new FormData();
        uploadFormData.append("file", image);

        const uploadResponse = await fetch("/api/profile", {
          method: "POST",
          body: uploadFormData,
        });
        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          toast.error(uploadData.message);
          return;
        }

        imageUrl = uploadData.url;
        setImageLoading(false);
      }

      const response = await fetch("/api/restaurant/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("restaurantUser", JSON.stringify(data.result));

      toast.success(data.message);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setImageLoading(false);
    }
  };

  return (
    <>
      <div className="account-page">
        <div className="account-card">
          <div className="account-title">
            <h2>
              <span>Edit </span>Profile
            </h2>
            <p>Update your restaurant information</p>
          </div>

          {/* restaurant Image code  */}

          <div className="edit-profile-image-section">
            <label className="edit-image-label">Restaurant Image</label>

            <div className="edit-profile-image-box">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Restaurant"
                  className="edit-profile-image"
                />
              ) : (
                <div className="edit-no-image">No Restaurant Image</div>
              )}
            </div>

            <label htmlFor="restaurantImage" className="change-image-btn">
             {loading ? "Changing": "Image Change"}
            </label>

            <input
              type="file"
              id="restaurantImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden-image-input"
            />

            <p className="image-help-text">JPG, PNG or WEBP — Maximum 5MB</p>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="profile-grid">
              <div className="account-field">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="account-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="account-field">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="account-field">
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="account-field full-width">
                <label>Full Address</label>
                <textarea
                  placeholder="Enter Full Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="account-submit">
              {loading ? "Updating...." : "Update Profile"}
            </button>
          </form>

          <div className="account-back">
            <Link href="/">← Back</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
