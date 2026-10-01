'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const [gallery, setGallery] = useState({
    g1: "/assets/images/section/gallery-1.jpg",
    g2: "/assets/images/section/gallery-2.jpg",
    g3: "/assets/images/section/gallery-3.jpg",
    g4: "/assets/images/section/gallery-4.jpg",
  });


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/settings/slider?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (data?.success && data?.data) {
          setGallery({
            g1: data.data.gallery_1 || "/assets/images/section/gallery-1.jpg",
            g2: data.data.gallery_2 || "/assets/images/section/gallery-2.jpg",
            g3: data.data.gallery_3 || "/assets/images/section/gallery-3.jpg",
            g4: data.data.gallery_4 || "/assets/images/section/gallery-4.jpg",
          });
        }
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);





  return (
    <>
         <section className="gallery">
            <div className="container-fluid">
                <div className="row">
                    <div className="gallery-main">
                        <div className="gallery-box">
                           <div className="image"><img src={gallery.g1} key={gallery.g1} alt="Gallery 1" /></div>
                            <div className="content">
                                <h5 className="name">Tender Octopus and Fennel</h5>
                                <p className="cate">Food - Restaurant</p>
                                <div className="line"></div>
                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                                    fringilla semper nulla in pulvinar. </p>
                                <Link href="#" className="action"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="gallery-box">
                            <div className="image"><img src={gallery.g2} key={gallery.g2} alt="Gallery 2" /></div>
                            <div className="content">
                                <h5 className="name">Tender Octopus and Fennel</h5>
                                <p className="cate">Food - Restaurant</p>
                                <div className="line"></div>
                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                                    fringilla semper nulla in pulvinar. </p>
                                <Link href="#" className="action"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="gallery-box">
                            <div className="image"><img src={gallery.g3} key={gallery.g3} alt="Gallery 3" /></div>
                            <div className="content">
                                <h5 className="name">Tender Octopus and Fennel</h5>
                                <p className="cate">Food - Restaurant</p>
                                <div className="line"></div>
                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                                    fringilla semper nulla in pulvinar. </p>
                                <Link href="#" className="action"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="gallery-box">
                           <div className="image"><img src={gallery.g4} key={gallery.g4} alt="Gallery 4" /></div>
                            <div className="content">
                                <h5 className="name">Tender Octopus and Fennel</h5>
                                <p className="cate">Food - Restaurant</p>
                                <div className="line"></div>
                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                                    fringilla semper nulla in pulvinar. </p>
                                <Link href="#" className="action"><i className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Gallery
