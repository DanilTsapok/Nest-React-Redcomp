import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import style from "./categorystyle.module.scss";
import { Link } from "react-router-dom";
import useStore from "../../../../store/useStore";
import Logo from "../../../../assets/svg/Logo.svg";

function CategorySection() {
  const { currentUser } = useStore();
  const [categoryData, setCategoryData] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    const handleCategories = async () => {
      const response = await axios.get("http://localhost:4000/category");
      setCategoryData(response.data);
    };
    handleCategories();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.visible);
          observer.current.unobserve(entry.target);
        }
      });
    });

    const cards = document.querySelectorAll(`.${style.card}`);
    cards.forEach((card) => {
      observer.current.observe(card);
    });

    return () => {
      observer.current.disconnect();
    };
  }, [categoryData]);

  return (
    <>
      <div className={style.CategoryHeader}>
        <h1>Devices</h1>
        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
          <h1>
            <span>Red</span>Comp
          </h1>
        </div>
        <h1>Categories</h1>
      </div>
      <div className={style.CategoryBody}>
        <div className={style.categoryItems}>
          {categoryData.length !== 0 ? (
            categoryData.map((categoryItem, index) => {
              const delay = `${index * 0.1}s`; // Adjust the multiplier for desired delay
              return (
                <Link
                  to={`/category/${categoryItem.id}/products`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <div className={`${style.card}`} style={{ "--delay": delay }}>
                    <img
                      src={categoryItem.categoryImage}
                      alt={categoryItem.name}
                    />
                    <p>{categoryItem.name}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
