import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./productsPageStyle.module.scss";
import useStore from "../../store/useStore";
import video from "../../assets/video2.mp4";
function ProductsPage() {
  const { currentUser } = useStore();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleProducts = async () => {
      const response = await axios.get(
        `http://localhost:4000/category/${categoryId}/products`
      );

      const responseCategory = await axios.get(
        `http://localhost:4000/category/${categoryId}`
      );
      setCategoryName(responseCategory.data.name);
      console.log(categoryName);

      setProducts(response.data);
      console.log(response);
    };
    handleProducts();
  }, [categoryName]);

  return (
    <div className={style.ProductsBody}>
      <video src={video} loop autoPlay muted></video>
      <h1>{categoryName}</h1>
      <div className={style.productBody}>
        {products.length != 0 ? (
          products.map((productsItem, index) => {
            console.log(productsItem);
            const delay = `${index * 0.1}s`; // Adjust the multiplier for desired delay
            return (
              <Link
                to={`/category/${categoryId}/products/${productsItem.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div className={`${style.card}`} style={{ "--delay": delay }}>
                  {currentUser ? (
                    currentUser.roles.includes("Admin") ? (
                      <button onClick={() => DeleteCategory(productsItem.id)}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/parakeet/48/trash.png"
                          alt="trash"
                        />
                      </button>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}

                  <img
                    className={style.img}
                    src={productsItem.imgUrl}
                    alt={productsItem.name}
                  />
                  <p>{productsItem.name}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
