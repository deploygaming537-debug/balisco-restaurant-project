import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="contact-main">
                <form id="contactform" method="post" action="https://themesflat.co/html/restaurant/basilicohtml/contact/contact-process.php" className="s2">
                    <h3 className="title" data-aos-duration="1000" data-aos="fade-left">just drop a line!</h3>
                    <p data-aos-duration="1000" data-aos="fade-left">Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on
                        business days. We will be happy to answer your questions.</p>
                    <div className="form-group">
                        <input data-aos-duration="1000" data-aos="fade-left" type="text" className="form-control" id="name" name="name" placeholder="Name*" />
                        <input data-aos-duration="1000" data-aos="fade-left" type="text" className="form-control" id="phone" name="phone" placeholder="Phone*" />
                        <input data-aos-duration="1000" data-aos="fade-left" type="email" className="form-control" id="mail" name="mail" placeholder="Email*" />
                        <textarea data-aos-duration="1000" data-aos="fade-left" name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                    </div>
                    <div className="send-wrap">
                        <button type="submit" className="tf-button style3">send message</button>
                    </div>
                </form>

                <div className="info-location">
                    <div>
                        <h4 data-aos-duration="1000" data-aos="fade-left">Need help with your online reservation,<br />
                            Have a question or need more information?</h4>
                        <ul>
                            <li data-aos-duration="1000" data-aos="fade-up" >
                                <h5>Contact Us</h5>
                                <p>+(406) 555-0120 <br />
                                    Basilicofood123@gmail.com
                                </p>

                            </li>
                            <li data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="100">
                                <h5>Address here</h5>
                                <p>4517 Washington Ave. Manchester, <br />
                                    Kentucky 39495, USA</p>
                            </li>
                            <li data-aos-duration="1000" data-aos="fade-up"  data-aos-delay="200">
                                <h5>open time</h5>
                                <p>Mon - Fri : 9.00am - 22.00pm <br />
                                    Saturday : 11.00 - 23.00 Sunday : Close</p>

                            </li>
                        </ul>

                        <a href="#" className="tf-button style2" >ONLINE RESERVATION</a>
                    </div>
                </div>
            </div>

    </>
  )
}

export default Contact
