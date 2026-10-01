'use client'


import Image from "next/image";
// import styles from "./page.module.css";

import Hero from "./_components/home/Hero";
import Opening from "./_components/home/Opening";
import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";
import Location from "./_components/home/Location";
import Gallery from "./_components/home/Gallery";
import Booking from "./_components/home/Booking";
import ChefRestaurant from "./_components/home/ChefRestaurant";
import Vouchers from "./_components/home/Vouchers";
import Testimonials from "./_components/home/Testimonials";
import Choose from "./_components/home/Choose";
import Video from "./_components/home/Video";

export default function Home() {
  return (
    <div>
      <main>
        <Header />
        <Hero />
        <Opening />
        <Video />
        <Choose />
        <Testimonials />
        <Vouchers />
        <ChefRestaurant />
        <Booking />
        <Gallery />
        <Location />
        <Footer />
      </main>
    </div>
  );
}
