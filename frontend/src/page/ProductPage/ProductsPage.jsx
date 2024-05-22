import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./productsPageStyle.module.scss";
import useStore from "../../store/useStore";
import video from "../../assets/video2.mp4";
import AddProductModal from "../../components/ModalWindows/AddProductModal/AddProductModal";
import AddEditProductModal from "../../components/ModalWindows/AddEditModal/AddEditProductModal";
function ProductsPage() {
  const { currentUser, setAddProductModalActive, setEditCategoryModalActive } =
    useStore();
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

  const DeleteProduct = async (idProduct) => {
    await axios.delete(`http://localhost:4000/product/delete/${idProduct}`);
    window.location.replace(`/category/${categoryId}/products`);
  };
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
              <div
                className={`${style.card}`}
                style={{ "--delay": delay }}
                key={index}
              >
                {currentUser ? (
                  currentUser.roles.includes("Admin") ? (
                    <div className={style.AdminPos}>
                      <button onClick={() => DeleteProduct(productsItem.id)}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/parakeet/48/trash.png"
                          alt="trash"
                        />
                      </button>
                      <button onClick={() => setEditCategoryModalActive()}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/emoji/48/pencil-emoji.png"
                          alt="trash"
                        />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={style.AdminPos}
                      style={{ visibility: "hidden" }}
                    >
                      <button onClick={() => DeleteProduct(productsItem.id)}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/parakeet/48/trash.png"
                          alt="trash"
                        />
                      </button>
                      <button onClick={() => DeleteProduct(productsItem.id)}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/emoji/48/pencil-emoji.png"
                          alt="trash"
                        />
                      </button>
                    </div>
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
                <p>{productsItem.description}</p>
                <p>{productsItem.price} UAH</p>
                {currentUser ? (
                  <button className={style.BtnBuy}>Buy</button>
                ) : (
                  <p>You need to login</p>
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
        {currentUser ? (
          currentUser.roles.includes("Admin") ? (
            <div
              className={style.card}
              style={{
                height: "450px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setAddProductModalActive()}
            >
              <p>Add Product</p>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <AddProductModal />
      <AddEditProductModal />
    </div>
  );
}

export default ProductsPage;
