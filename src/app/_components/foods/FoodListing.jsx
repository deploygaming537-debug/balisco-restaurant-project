"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const FoodListing = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  // test highlight
  const highlightText = (text, search) => {
    if (!search) {
      return text;
    }

    const index = text.toLowerCase().indexOf(search.toLowerCase());

    if (index === -1) {
      return text;
    }

    return (
      <>
        {text.substring(0, index)}

        <span className="search-highlight">
          {text.substring(index, index + search.length)}
        </span>

        {text.substring(index + search.length)}
      </>
    );
  };

  // searching food
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  const getFoods = async () => {
    try {
      const response = await fetch("/api/food");

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setFoods(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <section className="food-page">
      <div className="food-wrapper">
        <div className="food-header">
          <div>
            <h2>Food Listing</h2>
            <p>Manage all your restaurant food items.</p>
          </div>

          <div className="food-header-actions">
            <Link href="/foodCategory" className="category-btn">
              Categories
            </Link>

            <Link href="/addFood" className="food-btn">
              + Add New Food
            </Link>
          </div>
        </div>

        <div className="food-list-card">
          <div className="food-search">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="text"
              placeholder="Search food..."
            />
          </div>

          <table className="food-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Food Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food._id}>
                  <td>
                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="food-img"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  <td className="food-name">
                    {highlightText(food.name, search)}
                  </td>

                  <td>
                    <span className="category-badge">{food.category}</span>
                  </td>

                  <td>Rs. {food.price}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        food.status === "Available"
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      {food.status}
                    </span>
                  </td>

                  <td>
                    <div className="food-actions">
                      <Link
                        href={`/editFood?id=${food._id}`}
                        className="edit-link"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/deleteFood?id=${food._id}`}
                        className="delete-link"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FoodListing;
