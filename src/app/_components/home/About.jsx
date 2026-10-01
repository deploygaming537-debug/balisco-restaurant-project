import Link from "next/link"

const About = () => {
    return (
        <>
          <section className="about">
            <div className="shape"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                        <div className="about-img" data-aos-duration="1000" data-aos="fade-right">
                            <img src="assets/images/section/about.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="about-content">
                            <div className="block-text">
                                <p className="subtitle " data-aos-duration="1000" data-aos="fade-up">About Restaurant</p>
                                <h3 className="title" data-aos-duration="1000" data-aos="fade-up">Enjoy An Exceptional Journey of Taste</h3>
                                <p className="text" data-aos-duration="1000" data-aos="fade-up">Our buzzy food-hall style concept is inspired by international dining
                                    styles, especially in Asia. Explore the following fast-action food stations as busy
                                    chefs perform.</p>
                                <p className="text" data-aos-duration="1000" data-aos="fade-up">Enjoy a verdant Garden to Glass experience. It’s in the view, it’s
                                    reflected in the design, and it infuses many drinks. In fact, all our delicious
                                    fresh ingredients are sustainably picked from our Jemima’s Kitchen Garden. Our
                                    flourishing range of cocktails, spirits, beers and wines are all made with integrity
                                    and offer something for every guest.</p>

                                <Link href="about.html" className="tf-button style3">read more about us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        
        </>
    )
}

export default About;