import Footer from "@/app/_components/layout/Footer";
import Header from "@/app/_components/layout/Header";
import Link from "next/link";

export default function BlogList () {
    return (
        <>
        <Header />
         <section className="s-blog blog-list">
            <div className="container">
             

                <div className="row blog-main">
                    <div className="col-12">
                        <div className="block-text center">

                            <h3 className="title" data-aos-duration="1000" data-aos="fade-up">new Posts </h3>
                            <p className="text" data-aos-duration="1000" data-aos="fade-up">This is sample subtitle blog post section </p>

                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-01.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="100">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-02.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="200">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-03.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-04.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="100">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-05.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog-box" data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="200">
                            <div className="top-content">
                                <div className="image">
                                    <img src="/assets/images/section/blog-06.jpg" alt="" />
                                </div>
                                <div className="meta">
                                    <h4>25</h4>
                                    <p>Jun 23</p>
                                </div>
                                <Link href="blog_single.html" className="h5 title">How to Design a Small Restaurant</Link>
                            </div>
                            <div className="bottom-content">
                                <ul>
                                    <li className="author"><Link href="#">by Jhon Matter</Link></li>
                                    <li className="category"><Link href="#">Restaurant, Food</Link></li>
                                </ul>
                                <div className="line"></div>
                                <p className="text">Bigger certainly doesn’t mean better when giving your guests a memorable
                                    dining experience and a tasty meal...</p>
                                <Link href="blog_single.html" className="btn-read">read more <i
                                        className="fa fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}