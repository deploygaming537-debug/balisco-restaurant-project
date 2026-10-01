"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [slider1, setSlider1] = useState("/assets/images/slider/img_slider_1.jpg");
  const [slider2, setSlider2] = useState("/assets/images/slider/img_slider_12.jpg");

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        // Cache bust query string add ki hai taaki fresh result mile
        const res = await fetch(`/api/settings/slider?t=${Date.now()}`, { 
          cache: "no-store" 
        });
        
        if (!res.ok) return;

        const data = await res.json();

        if (data && data.success && data.data) {
          if (data.data.home_hero_1) {
            setSlider1(data.data.home_hero_1);
          }
          if (data.data.home_hero_2) {
            setSlider2(data.data.home_hero_2);
          }
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  return (
    <>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {/* SLIDE 1 */}
          <div className="swiper-slide">
            <div className="overlay">
              <img src={slider1} key={slider1} alt="Hero Slider 1" />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="box-slider">
                    <div className="content-box">
                      <h2 className="title">
                        It’s time to enjoy <br /> the finer things in life.
                      </h2>
                      <p className="sub-title">
                        Craving some delicious Paris food? Maybe you’re in the
                        mood for a juicy steak? No matter what kind of meal you
                        have in mind.
                      </p>
                      <div className="wrap-btn">
                        <Link href="/menu" className="tf-button style2">
                          discovery menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="swiper-slide">
            <div className="overlay">
              <img src={slider2} key={slider2} alt="Hero Slider 2" />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="box-slider">
                    <div className="content-box">
                      <h2 className="title">
                        The pleasure of <br /> variety on your plate
                      </h2>
                      <p className="sub-title">
                        Craving some delicious Paris food? Maybe you’re in the
                        mood for a juicy steak? No matter what kind of meal you
                        have in mind.
                      </p>
                      <div className="wrap-btn">
                        <Link href="/menu" className="tf-button style2">
                          discovery menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;