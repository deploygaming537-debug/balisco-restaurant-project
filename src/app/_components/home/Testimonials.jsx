const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="swiper testimonialSwiper">
              <div className="swiper-wrapper">
                {/* Testimonial 1 */}
                <div className="swiper-slide">
                  <div className="testimonials-content">
                    <img
                      src="/assets/images/icon/quote.png"
                      alt="Quote"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    />

                    <h4 data-aos="fade-up" data-aos-duration="1000">
                      Delicious food and excellent service
                    </h4>

                    <p data-aos="fade-up" data-aos-duration="1000">
                      The food was fresh, delicious and perfectly prepared. The
                      staff was friendly and the atmosphere was very
                      comfortable. We really enjoyed our visit.
                    </p>

                    <ul
                      className="rating"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <h5 data-aos="fade-up" data-aos-duration="1000">
                      Happy Customer
                    </h5>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="swiper-slide">
                  <div className="testimonials-content">
                    <img src="/assets/images/icon/quote.png" alt="Quote" />

                    <h4>Great taste and a beautiful atmosphere</h4>

                    <p>
                      Everything was fresh and tasty. The restaurant atmosphere
                      was classy and relaxing, and the service was fast and
                      professional.
                    </p>

                    <ul className="rating">
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <h5>Regular Customer</h5>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="swiper-slide">
                  <div className="testimonials-content">
                    <img src="/assets/images/icon/quote.png" alt="Quote" />

                    <h4>Fresh food with amazing service</h4>

                    <p>
                      A wonderful place to enjoy fresh food with family and
                      friends. The quality was excellent and the whole
                      experience was worth it.
                    </p>

                    <ul className="rating">
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <h5>Valued Customer</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
