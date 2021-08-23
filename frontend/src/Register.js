
export default function Register(){
    return (
        <>
        <div class="container pt-5" id="contact">
  <div class="header-section text-center">
    <h2>Register your store </h2>
    <p class="mt-3 mb-0">Hi there, We are available 24/7 by fax, e-mail or by phone. Drop us line so we can talk futher about that.</p>
  </div>
</div>
{/* <!-- contact-form --> */}
<section class="w3l-contact">
  <div class="contact-infubd py-5">
    <div class="container py-lg-3">
      <div class="contact-grids row">
       
        <div class="col-lg-6 mt-lg-0 mt-5 mx-auto" >
          <form action="https://sendmail.w3layouts.com/submitForm" method="post" class="signin-form">
            <div class="input-grids">
              <div class="form-group">
                <input type="text" name="w3lName" id="w3lName" placeholder="Store Name*" class="contact-input" />
              </div>
              <div class="form-group">
                <input type="email" name="w3lSender" id="w3lSender" placeholder="Your Email*" class="contact-input" required="" />
              </div>

              <div class="form-group">
                <input type="text" name="w3lSubect" id="w3lSubect" placeholder="Subject*" class="contact-input" />
              </div>
              <div class="form-group">
                <input type="Address" name="w3lSubect" id="w3lSubect" placeholder="your Address*" class="contact-input" />
              </div>
            </div>
            <div class="form-group">
              <textarea name="w3lMessage" id="w3lMessage" placeholder="Type your message here*" required=""></textarea>
            </div>
            <div class="text-right">
              <button class="btn  theme-button">Submit</button>
            </div>
          </form>
        </div>
</div>
      </div>
      </div>
</section>
        </>
    )
}