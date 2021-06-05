import './css/Contact.css';
export function Footer(){
    return(
        <>
        {/* <!-- footer --> */}
        {/* <footer className="w3l-footer-29-main" id="footer"> */}
        <footer className="w3l-footer-29-main">
                    <div className="footer-29 py-5">
                        <div className="container pb-lg-3">
                            <div className="row footer-top-29">
                                <div className="col-lg-4 col-md-6 footer-list-29 footer-1 mt-md-4">
                                    {/* <!-- ----------------Logo---------- --> */}
                                    <h1 className="footer-logo"><a className="footer-logo mb-md-3 mb-2" href="Home.html"><img src="assets/images/" alt="" />Kleider House</a></h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia deserunt repudiandae, ut minus assumenda architecto illum eaque
                                        odio temporibus.</p>
                                </div>
                                <div className="col-lg-2 col-md-6 footer-list-29 footer-2 mt-5 mx-auto">
                                    <h6 className="footer-title-29">Explore More</h6>
                                    <ul>
                                        <li><a href="#gallery.html">Gallery</a></li>
                                        <li><a href="#blog.html">Blog</a></li>
                                        <li><a href="#landing-single.html">Landing Page</a></li>
                                        <li><a href="#url">Privacy Policy</a></li>
                                        <li><a href="#url">Terms and conditions</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-2 col-md-6 footer-list-29 footer-4 mt-5 mx-auto">
                                    <h6 className="footer-title-29">Quick Links</h6>
                                    <ul>
                                        <li><a href="index.html">Home</a></li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="services.html">Services</a></li>
                                        <li><a href="#blog.html"> Blog</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        <li><a href="contact.html">SignIn</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="footers14-block" className="py-3">
                        <div className="container">
                            <div className="footers14-bottom text-center">
                                <div className="social">
                                    <a href="#facebook" className="facebook"><span className="fa fa-facebook" aria-hidden="true"></span></a>
                                    <a href="#google" className="google"><span className="fa fa-google-plus" aria-hidden="true"></span></a>
                                    <a href="#twitter" className="twitter"><span className="fa fa-twitter" aria-hidden="true"></span></a>
                                    <a href="#instagram" className="instagram"><span className="fa fa-instagram" aria-hidden="true"></span></a>
                                    <a href="#youtube" className="youtube"><span className="fa fa-youtube" aria-hidden="true"></span></a>
                                </div>
                                <div className="copyright mt-1">
                                    <p>&copy; 2021 Kleider House. All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- move top --> */}
                    <button onclick="topFunction()" id="movetop" title="Go to top">
                        <span className="fa fa-angle-up" aria-hidden="true"></span>
                    </button>
</footer>
        </>
    )
}