import React from "react";
import style from "./profilestyle.module.scss";
import useStore from "../../store/useStore";
import InfiniteSlide from "../../components/Main/Sections/InfiniteSlide/infiniteSlide";
function Profile() {
  const { currentUser } = useStore();
  console.log(currentUser);
  return (
    <div className={style.main}>
      <div className={style.body}>
        <div className={style.ProfileBody}>
          <p>{currentUser.name}</p>
          <p>{currentUser.email}</p>
        </div>
        <div className={style.historyOrders}></div>
      </div>
      <InfiniteSlide />
    </div>
  );
}

export default Profile;
