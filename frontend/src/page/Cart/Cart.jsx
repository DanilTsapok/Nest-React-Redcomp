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
  // console.log(orders);
  console.log(orderItems);
  // console.log(currentUser);
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

  // Функція для видалення елемента замовлення
  const deleteItem = async (idOrder, idItem) => {
    try {
      // Видалення елемента замовлення за його id
      await axios.delete(`http://localhost:4000/order-items/${idItem}`);
      // Оновлення списку orderItems
      const updatedOrderItems = orderItems.filter((item) => item.id !== idItem);
      setOrderItems(updatedOrderItems);

      // Якщо передано idOrder (тобто не null), то видаляємо відповідне замовлення
      if (idOrder) {
        await axios.delete(`http://localhost:4000/order/${idOrder}`);
        // Оновлення списку orders
        const updatedOrders = orders.filter((order) => order.id !== idOrder);
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Error deleting order item:", error);
    }
  };

  // Функція для фільтрації замовлень, які належать поточному користувачеві
  const findUniqueOrders = () => {
    const uniqueOrders = [];
    console.log(uniqueOrders);
    orders.forEach((order) => {
      if (
        order.user.id === currentUser.id &&
        !uniqueOrders.find((uniqueOrder) => uniqueOrder.id === order.id)
      ) {
        uniqueOrders.push(order);
      }
    });
    return uniqueOrders;
  };

  const findUniqueOrderItem = () => {
    const uniqueOrderItems = [];

    orderItems.forEach((item) => {
      if (item.order.id === currentUser.id) {
        if (!uniqueOrderItems.some((uniqueItem) => uniqueItem.id === item.id)) {
          uniqueOrderItems.push(item);
        }
      }
    });

    return uniqueOrderItems;
  };
  return (
    <div className={style.CartBody}>
      <video src={video} loop autoPlay muted></video>
      <h1>Cart</h1>
      <div className={style.cartBody}>
        <div className={style.OrderBody}>
          <h2>History Orders</h2>
          {orders.length > 0 ? (
            findUniqueOrders().map((singleOrder) => (
              <div className={style.orderDetails} key={singleOrder.id}>
                <h3>Order Details</h3>
                <p>Order ID: {singleOrder.id}</p>
                <p>
                  Order Date: {new Date(singleOrder.date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => deleteItem(singleOrder.id)}
                  style={{ visibility: "hidden" }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className={style.cartOrderItem}>
          <ul>
            {findUniqueOrderItem().map((item) => (
              <li key={item.id}>
                <img src={item.product.imgUrl} alt="" />
                <p>Order ID: {item.order.id}</p>
                <p>Product Name: {item.product.name}</p>
                <p>Product Price: {item.product.price} UAH</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => deleteItem(item.orderId, item.id)}
                  className={style.btnDelete}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <InfiniteSlide />
    </div>
  );
}

export default Cart;
