import axios from "axios";
import React, { useEffect, useState } from "react";

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
      {categoryData.length != 0 ? (
        categoryData.map((categoryItem, index) => (
          <div key={index}>
            <p>{categoryItem.name}</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default CategorySection;
