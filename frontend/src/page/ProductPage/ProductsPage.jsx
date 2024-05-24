import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./productsPageStyle.module.scss";
import useStore from "../../store/useStore";
import video from "../../assets/video2.mp4";
import { Image } from "antd";
import AddProductModal from "../../components/ModalWindows/AddProductModal/AddProductModal";
import AddEditProductModal from "../../components/ModalWindows/AddEditModal/AddEditProductModal";
import InfiniteSlide from "../../components/Main/Sections/InfiniteSlide/infiniteSlide";
import Notification from "../../components/ModalWindows/Notification/Notification";

function ProductsPage() {
  const {
    currentUser,
    setAddProductModalActive,
    setEditCategoryModalActive,
    setNotificationState,
    setNotificationStateDisabled,
    setNotificationText,
  } = useStore();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);

  console.log(orderId);

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
      setProducts(response.data);
    };
    handleProducts();
  }, [categoryId]);

  const DeleteProduct = async (idProduct) => {
    await axios.delete(`http://localhost:4000/product/delete/${idProduct}`);
    window.location.reload();
  };

  const CreateOrder = async () => {
    try {
      const response = await axios.post("http://localhost:4000/order", {
        userId: currentUser.id,
        date: new Date().toISOString(),
      });
      console.log(response);
      setOrderId(response.data.id);
      return response.data.id;
    } catch (e) {
      console.log(e);
    }
  };

  const CreateOrderItem = async (productId) => {
    try {
      const id = await CreateOrder();
      await axios.post("http://localhost:4000/order-items", {
        orderId: id,
        productId: productId,
        quantity: 1,
      });
      setNotificationState();
      setTimeout(() => setNotificationStateDisabled(), 4000);
      setNotificationText(true, "Success purchase");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={style.ProductsBody}>
      <video src={video} loop autoPlay muted></video>
      <h1>{categoryName}</h1>
      <div className={style.productBody}>
        {products.length
          ? products.map((productsItem, index) => {
              const delay = `${index * 0.1}s`;
              return (
                <div
                  className={`${style.card}`}
                  style={{ "--delay": delay }}
                  key={index}
                >
                  {currentUser && currentUser.roles.includes("Admin") && (
                    <div className={style.AdminPos}>
                      <button onClick={() => DeleteProduct(productsItem.id)}>
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/parakeet/48/trash.png"
                          alt="trash"
                        />
                      </button>
                      <button
                        onClick={() => setEditCategoryModalActive(productsItem)}
                      >
                        <img
                          width="25"
                          height="25"
                          src="https://img.icons8.com/emoji/48/pencil-emoji.png"
                          alt="edit"
                        />
                      </button>
                    </div>
                  )}
                  <div style={{ zIndex: 999, width: "100%", height: "100%" }}>
                    <Image.PreviewGroup>
                      <Image
                        className={style.img}
                        src={productsItem.imgUrl}
                        alt={productsItem.name}
                      />
                    </Image.PreviewGroup>
                  </div>
                  <p>{productsItem.name}</p>
                  {productsItem.description.split(";").map((desc, i) => (
                    <p key={i} style={{ fontSize: 16 }}>
                      {desc}
                    </p>
                  ))}
                  <p>{productsItem.price} UAH</p>
                  {currentUser ? (
                    <button
                      className={style.BtnBuy}
                      onClick={() => CreateOrderItem(productsItem.id)}
                    >
                      Buy
                    </button>
                  ) : (
                    <p style={{ margin: 20 }}>You need to login</p>
                  )}
                </div>
              );
            })
          : null}
        {currentUser && currentUser.roles.includes("Admin") && (
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
        )}
      </div>
      <InfiniteSlide />
      <AddProductModal />
      <AddEditProductModal />
      <Notification />
    </div>
  );
}

export default ProductsPage;
