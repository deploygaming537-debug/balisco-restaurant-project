"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditFood = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("id");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    status: "Available",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // get single food
  useEffect(() => {
    const getFood = async () => {
      if (!foodId) {
        toast.error("Food ID not found");
        return;
      }
      try {
        const response = await fetch(`/api/food?id=${foodId}`);
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
          return;
        }

        setFormData({
          name: data.result.name || "",
          price: data.result.price || "",
          category: data.result.category || "",
          status: data.result.status || "Available",
          description: data.result.description || "",
        });
        setImage(data.result.image || "");
        setImagePreview(data.result.image || "");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    getFood();
  }, [foodId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // handleChange
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // update food
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("All fields are required");
      return;
    }

    let imageUrl = image;
    if (image instanceof File) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", image);

      const uploadResponse = await fetch("/api/upload/food", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        toast.error(uploadData.message);
        return;
      }

      imageUrl = uploadData.url;
    }

    try {
      const response = await fetch("/api/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: foodId,
          ...formData,
          image: imageUrl,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setTimeout(() => {
        router.push("/foodListing");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="food-loading">
        <div className="food-spinner"></div>
        <p>Loading food...</p>
      </div>
    );
  }

  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-header">
          <div>
            <h2>Edit Food</h2>
            <p>Update your food information.</p>
          </div>

          <Link href="/foodListing" className="food-btn">
            ← Back to Listing
          </Link>
        </div>

        <div className="food-card">
          <form onSubmit={handleUpdate} className="food-form">
            <div className="food-group">
              <label>Food Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="food-group">
              <label>Price *</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
              />
            </div>

            <div className="food-group">
              <label>Category *</label>

              <select
                name="category"
                onChange={handleChange}
                // defaultValue="Burger"
              >
                <option>Burger</option>
                <option>Pizza</option>
                <option>BBQ</option>
                <option>Chinese</option>
                <option>Drinks</option>
              </select>
            </div>

            <div className="food-group">
              <label>Status *</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                // defaultValue="Available"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="food-group full">
              <label>Description *</label>

              <textarea
                name="description"
                onChange={handleChange}
                value={formData.description}
                // defaultValue="Delicious chicken burger with fresh ingredients."
              />
            </div>

            <div className="food-group full">
              <label>Food Image</label>

              <div className="food-image-box">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt={formData.name}
                    className="edit-food-image"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="food-group full food-submit">
              <button type="submit" className="food-btn">
                Update Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditFood;
