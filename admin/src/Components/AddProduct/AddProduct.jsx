import React, { useState } from "react";
import "./AddProduct.css";
import upload_image from "../Assets/upload_image.png"; // your upload icon

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [details, setDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "men",
  });

  // handle text/number/select inputs
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle image input
  const imageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // this is the function similar to the screenshot
  const addProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please choose an image");
      return;
    }

    try {
      let responseData;

      // ---------- 1) UPLOAD IMAGE ----------
      let formData = new FormData();
      // "product" must match multer: upload.single("product")
      formData.append("product", image);

      await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });

      if (!responseData || !responseData.success) {
        alert("Image upload failed");
        return;
      }

      const image_url = responseData.image_url;

      // ---------- 2) SEND PRODUCT DETAILS ----------
      const productBody = {
        name: details.name,
        image: image_url,
        category: details.category,
        new_price: Number(details.new_price),
        old_price: Number(details.old_price),
      };

      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productBody),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Add product response:", data);
          if (data.success) {
            alert("Product Added ✔");
            // clear form
            setDetails({
              name: "",
              old_price: "",
              new_price: "",
              category: "men",
            });
            setImage(null);
          } else {
            alert("Failed to add product");
          }
        });
    } catch (err) {
      console.error("Error while adding product:", err);
      alert("Server error while adding product");
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>

      <form className="addproduct-form" onSubmit={addProduct}>
        {/* Product title */}
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={details.name}
            onChange={changeHandler}
          />
        </div>

        {/* Price & Offer price */}
        <div className="addproduct-price-row">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              type="number"
              name="old_price"
              placeholder="Type here"
              value={details.old_price}
              onChange={changeHandler}
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input
              type="number"
              name="new_price"
              placeholder="Type here"
              value={details.new_price}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Category */}
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            name="category"
            value={details.category}
            onChange={changeHandler}
          >
            <option value="kid">Kid</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </select>
        </div>

        {/* Image upload */}
        <div className="addproduct-itemfield">
          <p>Product Image</p>
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_image}
              alt="Upload"
              className="addproduct-thumbnail-img"
            />
          </label>
          <input
            type="file"
            id="file-input"
            hidden
            onChange={imageHandler}
          />
        </div>

        <button type="submit" className="addproduct-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
