import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./categorystyle.module.scss";
function CategorySection() {
  const [categoryData, setCategoryData] = useState([]);
  //   console.log(categoryData);
  useEffect(() => {
    const handleCategories = async () => {
      const response = await axios.get("http://localhost:4000/category");
      console.log(response.data);
      setCategoryData(response.data);
    };
    handleCategories();
  }, []);
  return (
    <>
      <div className={style.CategoryHeader}>
        <div className={style.Line}>
          <h1>Devices</h1>
        </div>
        <h1>Category</h1>
      </div>
      <div className={style.CategoryBody}>
        <div className={style.categoryItems}>
          {categoryData.length != 0 ? (
            categoryData.map((categoryItem, index) => (
              <div className={style.card} key={index}>
                <p>{categoryItem.name}</p>
              </div>
            ))
          ) : (
            <></>
          )}

          <div className={style.card}>
            <p>+</p>
            <p>Add category</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySection;
