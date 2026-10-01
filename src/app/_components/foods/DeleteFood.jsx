'use client'

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteFood = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!foodId) {
      toast.error("Food ID not found");
      return;
    }
 

  setLoading(true);

  try {
    const response = await fetch("/api/food", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: foodId,
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
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
   };



  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-card delete-box">
          <div className="delete-icon">🗑</div>

          <h2>Delete Food</h2>

          <p>Are you sure you want to delete this food?</p>

          <h4 className="delete-food-name">Chicken Burger</h4>

          <div className="delete-actions">
            <Link href="/foodListing" className="cancel-btn">
              Cancel
            </Link>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="confirm-delete"
            >
              {loading ? "Deleting" : "Delete Food"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteFood;
