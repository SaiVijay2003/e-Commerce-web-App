import React, { useState } from 'react';
import axios from 'axios';
import './createProduct.css'; // Import your CSS file for styling

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    product_id: '',
    title: '',
    price: '',
    description: '',
    content: '',
    images: {
      public_id: '', // Not directly editable by user
      url: ''
    },
    category: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested state for images.url
    if (name.startsWith('images')) {
      const updatedImages = { ...productData.images, [name.split('.')[1]]: value };
      setProductData({ ...productData, images: updatedImages });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', productData);
      console.log(response.data); // Handle success response
      // Optionally: Reset form fields after successful submission
      setProductData({
        product_id: '',
        title: '',
        price: '',
        description: '',
        content: '',
        images: {
          public_id: '',
          url: ''
        },
        category: ''
      });
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="create_product">
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            name="product_id"
            value={productData.product_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={productData.content}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="images.url"
            value={productData.images.url}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
