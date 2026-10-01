"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import "./food.css";

const AddFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Available");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();

      if (data.success) {
        setCategories(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddFood = async (event) => {
    event.preventDefault();

    // check required fields
    if (!name || !price || !category || !status || !description) {
      toast.error("All fields are requiredS");
      return;
    }

    try {
      if (!image) {
        toast.error("Food image is required");
        return;
      }

      // upload image cloudinary
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

      const response = await fetch("/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          category,
          status,
          description,
          image: uploadData.url,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setTimeout(() => {
        router.push("/foodListing");
      }, 1000);

      // Form clear
      setName("");
      setPrice("");
      setCategory("");
      setStatus("Available");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-header">
          <div>
            <h2>Add Food</h2>
            <p>Add a new food item to your restaurant menu.</p>
          </div>

          <Link href="/foodListing" className="food-btn">
            Food Listing
          </Link>
        </div>

        <div className="food-card">
          <form onSubmit={handleAddFood} className="food-form">
            <div className="food-group">
              <label>Food Name *</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter food name"
              />
            </div>

            <div className="food-group">
              <label>Price *</label>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div className="food-group">
              <label>Category *</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="food-group">
              <label>Status *</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                defaultValue="Available"
              >
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>

            <div className="food-group full">
              <label>Description *</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter food description"
              />
            </div>

            <div className="food-group full">
              <label>Food Image *</label>

              <div className="food-image-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
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
                  }}
                />
                <p>JPG, PNG or WEBP — Maximum 5MB</p>
              </div>
            </div>

            <div className="food-group full food-submit">
              <button type="submit" className="food-btn">
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
