import React from "react";
import style from "./infiniteSlidestyle.module.scss";
function InfiniteSlide() {
  return (
    <div className={style.Brands}>
      <div className={style.header}>
        <div className={style.Line}>
          <h1>Brands</h1>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.infinitySlider}>
          <div className={style.slide}>
            <div className={style.slider}>
              <p>
                {/* <img src={ReactLogo} alt="" /> */}
                <span>Hator</span>
              </p>
              <p>
                {/* <img src={Vite} alt="" /> */}
                <span>MSI</span>
              </p>
              <p>
                {/* <img src={PostgreSQL} alt="" /> */}
                <span>HyperX</span>
              </p>

              <p>
                {/* <img src={Django} alt="" /> */}
                <span>Logitech</span>
              </p>
              <p>
                {/* <img src={Docker} alt="" /> */}
                <span>Asus</span>
              </p>
            </div>
          </div>
          <div className={style.slide}>
            <div className={style.slider}>
              <p>
                {/* <img src={ReactLogo} alt="" /> */}
                <span>Hator</span>
              </p>
              <p>
                {/* <img src={Vite} alt="" /> */}
                <span>MSI</span>
              </p>
              <p>
                {/* <img src={PostgreSQL} alt="" /> */}
                <span>HyperX</span>
              </p>

              <p>
                {/* <img src={Django} alt="" /> */}
                <span>Logitech</span>
              </p>
              <p>
                {/* <img src={Docker} alt="" /> */}
                <span>Asus</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfiniteSlide;
