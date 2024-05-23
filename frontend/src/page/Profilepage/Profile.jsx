import React from "react";
import style from "./profilestyle.module.scss";
import useStore from "../../store/useStore";
import InfiniteSlide from "../../components/Main/Sections/InfiniteSlide/infiniteSlide";
import ProfileIcon from "../../assets/svg/Profile.svg";
function Profile() {
  const { currentUser } = useStore();
  console.log(currentUser);
  return (
    <div className={style.main}>
      <div className={style.body}>
        <div className={style.ProfileBody}>
          <img
            width="120"
            height="120"
            src={ProfileIcon}
            alt="user-male-circle"
          />
          <p>NickName: {currentUser.name}</p>
          <p>Roles: {currentUser.roles}</p>
          <p>Email:</p>
          <p>{currentUser.email}</p>
        </div>
        {/* <div className={style.historyOrders}>
          <h1>History orders</h1>
        </div> */}
      </div>
      <InfiniteSlide />
    </div>
  );
}

export default Profile;
