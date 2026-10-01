'use client'


import Link from "next/link";
import { useEffect, useState } from "react";

const ChefRestaurant = () => {
  const [chef1, setChef1] = useState("/assets/images/section/chef1.jpg");
  const [chef2, setChef2] = useState("/assets/images/section/chef2.jpg");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/settings/slider?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success && data?.data) {
          if (data.data.chef_1) setChef1(data.data.chef_1);
          if (data.data.chef_2) setChef2(data.data.chef_2);
        }
      } catch (err) {
        console.error("Error fetching chef images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="chef-restaurant">
      <div className="container">
        <div className="row">
          {/* Chef Images */}
          <div className="col-xl-7 col-md-12">
            <div className="chef-restaurant-image">
             <div className="group-img">
  <img
    src={chef1}
    key={chef1} // Force refresh on URL change
    alt="Restaurant chef"
    data-aos="fade-up"
    data-aos-duration="1000"
    className="chef-img"
  />

  <img
    src={chef2}
    key={chef2} // Force refresh on URL change
    alt="Chef preparing food"
    data-aos="fade-up"
    data-aos-duration="1000"
    className="chef-img"
  />
</div>
            </div>
          </div>

          {/* Content */}
          <div className="col-xl-5 col-md-12">
            <div className="chef-restaurant-content">
              <div className="block-text">
                <p
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Our Restaurant
                </p>

                <h3
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Fresh food made with passion
                </h3>

                <p className="text" data-aos="fade-up" data-aos-duration="1000">
                  We believe great food starts with fresh ingredients, careful
                  preparation and a passion for quality. Our team works hard to
                  provide delicious food and a memorable dining experience for
                  every customer.
                </p>

                <Link href="/menu" className="tf-button style3">
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefRestaurant;
