import React from "react";
import InfiniteSlide from "../../components/Main/Sections/InfiniteSlide/infiniteSlide";
import style from "./cartstyle.module.scss";
import video from "../../assets/video2.mp4";
function Cart() {
  return (
    <div className={style.CartBody}>
      <video src={video} loop autoPlay muted></video>
      <h1>Cart</h1>
      <div className={style.cartBody}></div>
      <InfiniteSlide />
    </div>
  );
}

export default Cart;
