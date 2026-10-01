"use client";

import Link from "next/link";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedFood, setExpandedFood] = useState(null);


  // ================================
  // GET FOOD + CATEGORY
  // ================================
  useEffect(() => {
    const getData = async () => {
      try {
        const foodRes = await fetch("/api/food");
        const foodData = await foodRes.json();

        const categoryRes = await fetch("/api/category");
        const categoryData = await categoryRes.json();

        if (foodData.success) {
          setFoods(foodData.result);
        }

        if (categoryData.success) {
          setCategories(categoryData.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    // Existing cart count
    const savedCart = JSON.parse(
      localStorage.getItem("restaurantCart") || "[]",
    );

    const totalItems = savedCart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    setCartCount(totalItems);
  }, []);

  // ================================
  // ADD TO CART
  // ================================
  const addToCart = (food) => {
    const existingCart = JSON.parse(
      localStorage.getItem("restaurantCart") || "[]",
    );

    const existingItem = existingCart.find((item) => item._id === food._id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item._id === food._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          _id: food._id,
          name: food.name,
          price: food.price,
          category: food.category,
          description: food.description,
          image: food.image,
          quantity: 1,
        },
      ];
    }

    // CART YAHAN SAVE HO RAHA HAI
    localStorage.setItem("restaurantCart", JSON.stringify(updatedCart));

    setCartCount((prev) => prev + 1);

    toast.success(`${food.name} added to cart`);
  };

  // ================================
  // FILTER FOOD
  // ================================
  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter(
          (food) =>
            food.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <>
      <Header />

      <section className="s-menu">
        <div className="shape">
          <img src="/assets/images/section/shape-menu.png" alt="" />
        </div>

        <div className="container">
          <div className="row">
            <div className="menu-content">
              {/* HEADING */}
              <div className="block-text center style-2">
                <p className="subtitle">Taste the Best that Surprise you</p>

                <h3 className="title">Our Special Menu</h3>

                <p className="text">
                  Choose your favorite food and order online from our
                  restaurant.
                </p>

                <Link href="/cart" className="tf-button style1">
                  View Cart ({cartCount})
                </Link>
              </div>

              {/* CATEGORIES */}
              <div className="flat-tabs">
                <ul className="menu-tab">
                  <li
                    className={selectedCategory === "All" ? "active" : ""}
                    onClick={() => setSelectedCategory("All")}
                  >
                    <h5>All</h5>
                  </li>

                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className={
                        selectedCategory === category.name ? "active" : ""
                      }
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <h5>{category.name}</h5>
                    </li>
                  ))}
                </ul>

                {/* FOOD */}
                <div className="content-tab">
                  <div className="content-inner">
                    {loading ? (
                      <h3>Loading Food...</h3>
                    ) : filteredFoods.length === 0 ? (
                      <h3>No Food Found</h3>
                    ) : (
                      <div className="menu-food-grid">
                        {filteredFoods.map((food) => (
                          <div className="menu-food-card" key={food._id}>
                            {/* IMAGE */}
                            <div className="menu-food-image">
                              {food.image ? (
                                <img src={food.image} alt={food.name} />
                              ) : (
                                <div className="no-food-image">No Image</div>
                              )}
                            </div>

                            {/* CONTENT */}
                            <div className="menu-food-content">
                              {/* FOOD NAME */}
                              <h4>{food.name}</h4>

                              {/* RATING */}
                              <div className="food-rating">
                                <span className="stars">★★★★★</span>

                                <span className="rating-number">4.5</span>

                                <span className="review-count">
                                  (120 Reviews)
                                </span>
                              </div>

                              {/* DESCRIPTION */}
                              <div className="food-description">
                                <p
                                  className={
                                    expandedFood === food._id
                                      ? "description-expanded"
                                      : "description-collapsed"
                                  }
                                >
                                  {food.description}
                                </p>

                                {/* READ MORE */}
                                {food.description &&
                                  food.description.length > 100 && (
                                    <button
                                      type="button"
                                      className="read-more-btn"
                                      onClick={() =>
                                        setExpandedFood(
                                          expandedFood === food._id
                                            ? null
                                            : food._id,
                                        )
                                      }
                                    >
                                      {expandedFood === food._id
                                        ? "Read Less"
                                        : "Read More"}
                                    </button>
                                  )}
                              </div>

                              {/* BOTTOM */}
                              <div className="menu-food-bottom">
                                <span className="menu-food-price">
                                  Rs. {Number(food.price).toLocaleString()}
                                </span>

                                <button
                                  type="button"
                                  className="add-cart-btn"
                                  onClick={() => addToCart(food)}
                                >
                                  <span>🛒</span>
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Menu;
