import Link from "next/link";

const Choose = () => {
  return (
    <section className="choose">
      <div className="shape"></div>

      <div className="container">
        <div className="row">
          {/* Choose Content */}
          <div className="col-xl-6 col-md-12">
            <div className="choose-content">
              <div className="block-text">
                <p
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  Why Choose Us
                </p>

                <h3
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  We always want our customers to be satisfied
                </h3>

                <div
                  className="flat-tabs"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {/* Tabs */}
                  <ul className="menu-tab">
                    <li>
                      <h5>Your Private Event</h5>
                    </li>

                    <li>
                      <h5>Food Safety</h5>
                    </li>

                    <li className="active">
                      <h5>Luxury Space</h5>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="content-tab">
                    <div className="content-inner">
                      <div className="container_inner">
                        <p>
                          We provide delicious food, quality ingredients,
                          excellent service, and a comfortable environment for
                          our customers. Our goal is to make every visit
                          enjoyable and memorable.
                        </p>

                        <ul className="list">
                          <li>Fresh and quality ingredients</li>
                          <li>Comfortable restaurant atmosphere</li>
                          <li>Friendly and professional service</li>
                          <li>Clean and hygienic environment</li>
                        </ul>

                        <Link href="/menu" className="tf-button style3">
                          View Menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choose Images */}
          <div className="col-xl-6 col-md-12">
            <div
              className="choose-image"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="swiper swiperchoose">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      src="/assets/images/section/choose.jpg"
                      alt="Restaurant"
                    />
                  </div>

                  <div className="swiper-slide">
                    <img
                      src="/assets/images/section/choose-1.jpg"
                      alt="Restaurant food"
                    />
                  </div>
                </div>

                <div className="swiper-button-next">
                  next <br /> image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
