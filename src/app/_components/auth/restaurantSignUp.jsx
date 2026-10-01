"use client";

import Link from "next/link";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../layout/Header";
import { toast } from "react-toastify";

const RestaurantSignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [terms, setTerms] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      toast.error("Password and confirm password do not match");
      return;
    } else {
      setPasswordError(false);
    }
    if (!name || !password || !email || !city || !address || !contact) {
      setError(true);
      toast.error("please fill all required fields");
      return;
    } else {
      setError(false);
    }

    if (!image) {
      toast.error("Please select restaurant image");
      return;
    }
    if (!terms) {
      toast.error("Please accept Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      // IMAGE UPLOAD

      const formData = new FormData();
      formData.append("file", image);

      const uploadResponse = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      console.log("Upload status:", uploadResponse.status);

      const uploadData = await uploadResponse.json();

      console.log("Upload data:", uploadData);

      if (!uploadResponse.ok || !uploadData.success) {
        toast.error(uploadData.message || "Image upload failed");
        return;
      }

      // RESTAURANT SIGNUP

      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
          city,
          address,
          contact,
          image: uploadData.url,
        }),
      });

      console.log("Restaurant status:", response.status);

      const responseData = await response.json();

      console.log("Restaurant data:", responseData);

      if (!response.ok || !responseData.success) {
        toast.error(responseData.message || "SignUp Failed");
        return;
      }

      const { result } = responseData;

      delete result.password;

      localStorage.setItem("restaurantUser", JSON.stringify(result));

      toast.success("SignUp Successfully");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log("SIGNUP ERROR:", error);

      toast.error(error.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <form className="signup-form">
          <div className="logo">
            <h2>
              <span>Create </span>Account
            </h2>
          </div>
          {/* Row 1 */}
          <div className="field-row3">
            <div className="field">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                placeholder="Enter Restaurant Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {error && !name && (
                <span className="error-message">
                  please enter restaurant name
                </span>
              )}
            </div>

            <div className="password-error field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {passwordError && (
                <span className="error-message">
                  Password and Confirm Password do not match
                </span>
              )}
            </div>

            <div className="password-error field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="field-row3">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
              />
              {error && !email && (
                <span className="error-message">please enter your email</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />

              {error && !city && (
                <span className="error-message">
                  please enter your city name
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="address">Full Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter Full Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              {error && !address && (
                <span className="error-message">
                  please enter your full address
                </span>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="field">
            <label htmlFor="contact">Contact No.</label>
            <input
              type="tel"
              id="contact"
              placeholder="Enter Contact Number"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
            {error && !contact && (
              <span className="error-message">please enter your contact</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="restaurantImage">Restaurant Image</label>

            <input
              type="file"
              id="restaurantImage"
              accept="image/*"
              onChange={(event) => {
                const selectedImage = event.target.files[0];

                if (!selectedImage) return;

                if (!selectedImage.type.startsWith("image/")) {
                  toast.error("Please select an image file");
                  event.target.value = "";
                  return;
                }

                if (selectedImage.size > 5 * 1024 * 1024) {
                  toast.error("Image size must be less than 5MB");
                  event.target.value = "";
                  return;
                }

                setImage(selectedImage);
              }}
            />
          </div>

          <div className="check-row">
            <label>
              <input
                type="checkbox"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
              />
              I agree to Terms & Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSignup}
            className="btn-register"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="signup-link">
            Already have an account?
            <Link href="/login" className="link-btn" type="button">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestaurantSignUp;
