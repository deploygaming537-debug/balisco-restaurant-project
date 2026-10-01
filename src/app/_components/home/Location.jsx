import Link from "next/link";

const Location = () => {
  return (
    <section className="location">
      <div className="container">
        <div className="row">
          {/* Left Image */}
          <div className="col-xl-4 col-md-12">
            <div
              className="image left"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img
                src="/assets/images/section/map1.jpg"
                alt="Restaurant location"
              />
            </div>
          </div>

          {/* Information */}
          <div className="col-xl-4 col-md-12">
            <div className="content">
              <div className="block-text center">
                <p
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  LOCATION
                </p>

                <h3
                  className="title"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  How To Find Us?
                </h3>

                <p className="text" data-aos="fade-up" data-aos-duration="1000">
                  Visit us and enjoy fresh food, friendly service and a
                  comfortable restaurant atmosphere.
                </p>

                <h6 data-aos="fade-up" data-aos-duration="1000">
                  Call Us For Booking & Delivery
                </h6>

                <h3
                  className="phone"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  03474655697
                </h3>

                <h6 data-aos="fade-up" data-aos-duration="1000">
                  Restaurant Information
                </h6>

                <p className="mb-6" data-aos="fade-up" data-aos-duration="1000">
                  <span>Address:</span> Your Restaurant Address
                </p>

                <p className="mb-6" data-aos="fade-up" data-aos-duration="1000">
                  <span>Email:</span> Your Restaurant Email
                </p>

                <p className="mb-6" data-aos="fade-up" data-aos-duration="1000">
                  <span>Opening Hours:</span> Monday - Sunday
                </p>

                <Link href="#" className="tf-button style3">
                  Get Directions
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="col-xl-4 col-md-12"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="image right">
              <img
                src="/assets/images/section/map2.jpg"
                alt="Restaurant location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
