"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Categories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get categories

  const getCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();

      if (data.success) {
        setCategories(data.result);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  // image select

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      return;
    }

    // Only image files
    if (!selectedImage.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      setImage(null);
      return;
    }

    // Maximum 5MB
    if (selectedImage.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      setImage(null);
      return;
    }

    setImage(selectedImage);
  };

  // Add Category
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Category name validation
    if (!name.trim()) {
      toast.error("Please enter category name");
      return;
    }

    // Image validation
    if (!image) {
      toast.error("Please select category image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", image);

      const uploadResponse = await fetch("/api/upload/category", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        toast.error(uploadData.message);
        return;
      }

      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          image: uploadData.url,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      // Clear category name
      setName("");

      // Clear image state
      setImage(null);

      // Clear file input
      const imageInput = document.getElementById("categoryImage");

      if (imageInput) {
        imageInput.value = "";
      }

      // Refresh category list
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-header">
          <div>
            <h2>Categories</h2>
            <p>Manage your food categories.</p>
          </div>
        </div>

        <div className="food-card">
          <form onSubmit={handleSubmit} className="food-form">
            {/* category name */}

            <div className="food-group">
              <label>Category Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter category name"
              />
            </div>

            {/* category image */}

            <div className="food-group">
              <label>Category Image</label>

              <input
                id="categoryImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* add button */}

            <div className="food-group">
              <label>&nbsp;</label>

              <button type="submit" className="food-btn" disabled={loading}>
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
            {/* <button className="food-btn">Back</button> */}
          </form>
        </div>

        <br />

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category._id}>
              <div className="category-image">
                {category.image ? (
                  <img src={category.image} alt={category.name} />
                ) : (
                  <div className="category-no-image">🍴</div>
                )}
              </div>

              <div className="category-card-content">
                <h4>{category.name}</h4>

                <div className="category-actions">
                  <Link
                    href={`/category/editCategory?id=${category._id}`}
                    className="category-edit"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/category/deleteCategory?id=${category._id}`}
                    className="category-delete"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
