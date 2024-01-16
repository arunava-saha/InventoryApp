import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ products, selectedproduct, setproducts, setIsEditing }) => {
  const id = selectedproduct._id;
  console.log(id);

  const [title, settitle] = useState(selectedproduct.title);
  const [createdBy, setcreatedBy] = useState(selectedproduct.createdBy);
  const [price, setprice] = useState(selectedproduct.price);
  const [createdAt, setcreatedAt] = useState(selectedproduct.createdAt);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !createdBy || !price || !createdAt) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const product = {
      title,
      createdBy,
      price,
      createdAt,
    };

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        products.splice(i, 1, product);
        break;
      }
    }
    const itemResponse = await fetch(`http://localhost:8080/inventory/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(await itemResponse.json());

    localStorage.setItem("products_data", JSON.stringify(products));
    setproducts(products);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${product.title} ${product.createdBy}'s data has been Updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit product</h1>
        <label htmlFor="title">Title of product</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <label htmlFor="createdBy">Created By</label>
        <input
          id="createdBy"
          type="text"
          name="createdBy"
          value={createdBy}
          onChange={(e) => setcreatedBy(e.target.value)}
        />
        <label htmlFor="price">Price of product ($)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setprice(Math.abs(e.target.value))}
        />
        <label htmlFor="createdAt">Update At</label>
        <input
          id="createdAt"
          type="date"
          name="createdAt"
          value={createdAt}
          onChange={(e) => setcreatedAt(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
