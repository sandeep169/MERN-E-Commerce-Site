import React from 'react';
import './css/Contact.css';

export function Contact() {
    return (
      <>

            <div className="container pt-5" id="contact">
                <div className="header-section text-center">
                    <h2>Contact Us</h2>
                    <p className="mt-3 mb-0">Hi there, We are available 24/7 by fax, e-mail or by phone. Drop us line so we can talk futher about that.</p>
                </div>
            </div>
            {/* <!-- contact-form --> */}
            <section className="w3l-contact" >
                <div className="contact-infubd py-5">
                    <div className="container py-lg-3">
                        <div className="contact-grids row">
                            <div className="col-lg-6 contact-left">
                                <div className="partners">
                                    <div className="cont-details">
                                        <h6 className="mb-4"> For more info or inquiry about our products project, and pricing please feel free to get in touch with us.</h6>
                                    </div>
                                    <div className="hours">
                                        <h6 className="mt-4">Email:</h6>
                                        <p> <a href="mailto:example@mail.com">
                                            contact.kliederhouse@gmail.com</a></p>
                                        <p> <a href="mailto:support@mail.com">
                                            support@mail.com</a></p>
                                        <h6 className="mt-4">Address:</h6>
                                        <p>  B-56, Ground Floor, Sector 64, Noida, Uttar Pradesh 201305</p>
                                        <h6 className="mt-4">Phone:</h6>
                                        <p className="margin-top"><a href="tel:+123-456-788 ">
                                            +91 9977567890 </a></p>
                                        <p className="margin-top"><a href="tel:+123-456-789 ">
                                            +123-456-789 </a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-lg-0 mt-5 contact-right">
                                <form action="https://sendmail.w3layouts.com/submitForm" method="post" className="signin-form">
                                    <div className="input-grids">
                                        <div className="form-group">
                                            <input type="text" name="name" id="w3lName" placeholder="Your Name*" className="contact-input" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" id="w3lSender" placeholder="Your Email*" className="contact-input" required="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="Address" name="Address" id="w3lSender" placeholder="Your Address*" className="contact-input" required="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="Subject" id="w3lSubect" placeholder="Subject*" className="contact-input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <textarea name="message" id="w3lMessage" placeholder="Type your message here*" required=""></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn-dark theme-button ">Send Message</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    </div>
</section>
                {/* <!-- /contact-form --> */}

        </>
    )
}