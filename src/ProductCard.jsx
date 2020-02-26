import React from "react";

export default ({ item }) => {
  return (
    <div className="ProductCard">
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
    </div>
  );
};
