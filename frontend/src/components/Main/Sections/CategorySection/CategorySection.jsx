import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./categorystyle.module.scss";
import { Link, NavLink } from "react-router-dom";
import useStore from "../../../../store/useStore";
import Logo from "../../../../assets/svg/Logo.svg";
function CategorySection() {
  //   console.log(categoryData);
  const { currentUser } = useStore();
  // console.log(currentUser);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const handleCategories = async () => {
      const response = await axios.get("http://localhost:4000/category");
      // console.log(response.data);
      setCategoryData(response.data);
    };
    handleCategories();
  }, []);
  console.log(categoryData);
  return (
    <>
      <div className={style.CategoryHeader}>
        <div className={style.Line}>
          <h1>Devices</h1>
        </div>
        <img src={Logo} alt="" />
        <h1>Categories</h1>
      </div>
      <div className={style.CategoryBody}>
        <div className={style.categoryItems}>
          {categoryData.length != 0 ? (
            categoryData.map((categoryItem, index) => (
              <Link
                to={`/category/${categoryItem.id}/products`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div className={style.card}>
                  <img src={categoryItem.categoryImage} alt="" />
                  <p>{categoryItem.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <></>
          )}
          {/* {currentUser.roles === "Admin" ? (
            <div className={style.card}>
              <p>+</p>
              <p>Add category</p>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
