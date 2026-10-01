"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditCategory = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  // GET CATEGORY
  const getCategory = async () => {
    try {
      const response = await fetch(`/api/category?id=${categoryId}`);
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setName(data.result.name);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Update Category

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter category name");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch("/api/category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: categoryId,
          name: name,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);

      setTimeout(() => {
        router.push("/foodCategory");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getCategory();
    } else {
      setLoading(false);
      toast.error("Category ID not found");
    }
  }, [categoryId]);

  if (loading) {
    return (
      <section className="food-page">
        <div className="food-wrapper">
          <div className="food-card">
            <p>Loading Category...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-header">
          <div>
            <h2>Edit Category</h2>
            <p>Update your food category.</p>
          </div>
        </div>

        <div className="food-card category-edit-card">
          <form onSubmit={handleUpdate} className="food-form">
            <div className="food-group">
              <label>Category Name</label>

              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="category-form-buttons">
              <button type="submit" className="food-btn" disabled={updating}>
                {updating ? "updating..." : "Update Category"}
              </button>

              <Link href="/foodCategory" className="category-cancel-btn">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCategory;
