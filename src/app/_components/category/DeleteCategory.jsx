"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteCategory = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const getCategory = async () => {
    try {
      const response = await fetch(`/api/category?id=${categoryId}`);
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCategoryName(data.result.name);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryId) {
        toast.error("Category ID not found");
        return;
    }

    setDeleting(true);
    try {
        const response = await fetch("/api/category",{
            method:"DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                id: categoryId,
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
      setDeleting(false);
    }
  };

  // Get category on page load
  useEffect(() => {
    if (categoryId) {
      getCategory();
    } else {
      setLoading(false);
      toast.error("Category ID not found");
    }
  }, [categoryId]);

  // Loading
  if (loading) {
    return (
      <section className="category-page">
        <div className="category-wrapper">
          <div className="category-delete-card">
            <p>Loading Category...</p>
          </div>
        </div>
      </section>
    );
  }



  return (
    <section className="category-page">
      <div className="category-wrapper">
        <div className="category-delete-card">
          <div className="category-delete-icon">!</div>

          <h2>Delete Category</h2>

          <p>Are you sure you want to delete this category?</p>

          <h3>{categoryName}</h3>

          <span>This action cannot be undone.</span>

          <div className="category-delete-buttons">
            <Link href="/foodCategory" className="category-cancel-btn">
              Cancel
            </Link>

            <button onClick={handleDelete} disabled={deleting} type="button" className="category-delete-btn">
              {deleting ? "Deleting...": "Delete Category"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteCategory;
