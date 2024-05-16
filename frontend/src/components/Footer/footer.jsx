import React from "react";
import style from "./footer-style.module.scss";
function Footer() {
  return (
    <footer>
      <div className={style.footerContent}>
        <div className={style.footerHeader}>
          <h1>PRODUCTS</h1>
          <h1>BRANDS</h1>
          <h1>OUR STORE</h1>
          <h1>NEWSLETTER</h1>
        </div>
        <div className={style.footerBody}>
          <div>
            <ul>
              <li>Mice</li>
              <li>Keyboards</li>
              <li>Headphones</li>
              <li>PC</li>
              <li>Chairs</li>
              <li>Laptops</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Hator</li>
              <li>HyperX</li>
              <li>Logitech</li>
              <li>Asus</li>
              <li>MSI</li>
              <li>Razer</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Privacy Policy</li>
              <li>Payment & Shipping</li>
              <li>Returns & Warranty</li>
              <li>FAQ</li>
              <li>Requlations</li>
            </ul>
          </div>
          <div className={style.footerBodySubscribe}>
            <div className={style.footerBodySubscribeContent}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium non, cumque obcaecati soluta asperiores quos.
              </p>
              <div className={style.fakeSubmit}>
                <input className={style.FakeInput} disabled></input>
                <button>subscribe</button>
              </div>
            </div>
            <div className={style.footerContactInfo}>
              <h4>Contact us</h4>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
