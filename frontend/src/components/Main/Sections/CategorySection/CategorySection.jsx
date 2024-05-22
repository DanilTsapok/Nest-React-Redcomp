import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import style from "./categorystyle.module.scss";
import { Link } from "react-router-dom";
import useStore from "../../../../store/useStore";
import Logo from "../../../../assets/svg/Logo.svg";
import AddEditCategoryModal from "../../../ModalWindows/AddEditModal/AddEditProductModal";

function CategorySection() {
  const { currentUser, setAddCategoryModalActive, setEditCategoryModalActive } =
    useStore();
  const [categoryData, setCategoryData] = useState([]);
  const observer = useRef(null);
  console.log(currentUser);
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

  const DeleteCategory = async (idCategory) => {
    await axios.delete(`http://localhost:4000/category/delete/${idCategory}`);
    window.location.replace("/");
  };
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
                    {currentUser ? (
                      currentUser.roles.includes("Admin") ? (
                        <div className={style.AdminPos}>
                          <button
                            onClick={() => DeleteCategory(categoryItem.id)}
                          >
                            <img
                              width="25"
                              height="25"
                              src="https://img.icons8.com/parakeet/48/trash.png"
                              alt="trash"
                            />
                          </button>
                          {/* <button onClick={() => setEditCategoryModalActive()}>
                            <img
                              width="25"
                              height="25"
                              src="https://img.icons8.com/emoji/48/pencil-emoji.png"
                              alt="trash"
                            />
                          </button> */}
                        </div>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}

                    <img
                      className={style.img}
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
          {currentUser ? (
            currentUser.roles.includes("Admin") ? (
              <div
                className={style.card}
                onClick={() => setAddCategoryModalActive()}
              >
                <p>Add Category</p>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
