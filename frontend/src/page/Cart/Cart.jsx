import React, { useEffect, useState } from "react";
import InfiniteSlide from "../../components/Main/Sections/InfiniteSlide/infiniteSlide";
import style from "./cartstyle.module.scss";
import video from "../../assets/video2.mp4";
import useStore from "../../store/useStore";
import axios from "axios";
function Cart() {
  const { currentUser } = useStore();
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  console.log("Orders", orders);
  console.log("OrderItems", orderItems);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseOrders = await axios.get(`http://localhost:4000/order`);
        setOrders(responseOrders.data);

        const responseOrderItems = await axios.get(
          `http://localhost:4000/order-items`
        );
        setOrderItems(responseOrderItems.data);
      } catch (error) {
        console.error("Error fetching orders or order items:", error);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  // Функция для поиска уникальных заказов по идентификатору
  const findUniqueOrders = () => {
    const uniqueOrders = [];
    orders.forEach((order) => {
      if (!uniqueOrders.find((uniqueOrder) => uniqueOrder.id === order.id)) {
        uniqueOrders.push(order);
      }
    });
    return uniqueOrders;
  };

  return (
    <div className={style.CartBody}>
      <video src={video} loop autoPlay muted></video>
      <h1>Cart</h1>
      <div className={style.cartBody}>
        {orders.length > 0 ? (
          findUniqueOrders().map((singleOrder) => (
            <div className={style.orderDetails} key={singleOrder.id}>
              <h2>Order Details</h2>
              <p>Order ID: {singleOrder.id}</p>
              <p>
                Order Date: {new Date(singleOrder.date).toLocaleDateString()}
              </p>
              <h3>Items:</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <ul>
          {orderItems
            // .filter((itemOrder) => itemOrder.orderId == singleOrder)
            .map((item) => (
              <li key={item.id}>
                <img src={item.product.imgUrl} alt="" />
                <p>Product ID: {item.product.id}</p>
                <p>Order ID: {item.order.id}</p>
                <p>Product Name: {item.product.name}</p>
                <p>Product Price: {item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
        </ul>
      </div>
      <InfiniteSlide />
    </div>
  );
}

export default Cart;
