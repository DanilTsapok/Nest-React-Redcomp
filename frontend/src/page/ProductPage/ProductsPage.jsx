import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./productsPageStyle.module.scss";
function ProductsPage() {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
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
    <>
      {products.length != 0 ? (
        products.map((product, index) => (
          <div key={index} style={{ width: "100%", height: "100%" }}>
            <img src={product.imgUrl}></img>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductsPage;
