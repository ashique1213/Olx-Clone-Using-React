import React, { useState } from "react";
import "./AddProductPage.css";
import { addProduct } from "../../Firebase/firebase";
import { uploadImage } from "../../Cloudnary/ImageService.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

import OlxLogo from "../../assets/OlxLogo";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  //Adding Image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); 
      setImagePreview(previewUrl); 
    }
  };

  //form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (image) imageUrl = await uploadImage(image);

      const newProduct = {
        productName,
        category,
        price: parseFloat(price),
        imageUrl,
      };

      //addproduct function calling
      await addProduct(newProduct);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signupContainer">
        <div className="signupForm">
          <div className="logoContainer">
            <OlxLogo />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Product Name</label>
              <input
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                type="text"
                id="username"
                placeholder="Enter your productname"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                id="email"
                placeholder="Enter category"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="phone">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                id="phone"
                placeholder="Enter the price"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="image">Choose Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImage}
                required
              />
            </div>

            <div className="image-preview">
              <img src={imagePreview} alt="Preview" className="imagePreview" />
            </div>

            <button type="submit" className="signupBtn">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
