import React from 'react';
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Product Added to Cart.")
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}zł</span>
      </div>
    </div>
  );
};

export default ProductItem;