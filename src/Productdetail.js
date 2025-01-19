import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user_id ,setuser_id] = useState(null);
  const [quantity,setquantity] = useState(null);
  const [cart_id,setcart_id] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
        const token = Cookies.get('jwt'); // Retrieve the JWT token from cookies
  
        if (!token) {
          console.log('No token found');
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:8005/users/me', {
            headers: {
              Authorization: `Bearer ${token}`, // Set the Bearer token in the header
            },
          });


          setuser_id(response.data.id);
          try {
            const addCartResponse = await axios.get(
              `http://localhost:8005/cart/getcartbyuserid/${response.data.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
              }
            );
    
            console.log('Cart created successfully:', addCartResponse.data[0].cart_id);
            setcart_id(addCartResponse.data[0].cart_id)
          } catch (addCartError) {
            console.error('Error creating cart:', addCartError);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();

    fetch(`http://localhost:8005/getproduct/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return response.json();
      })
      .then((data) => {
     
        setProduct(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  const handleAddToCart = async () => {

    if (!cart_id || !quantity || !product) {
    
     alert("Please ensure all fields are filled and try again.");
      return;
    }

    const token = Cookies.get("jwt"); 

    if (!token) {
      alert("You must be logged in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8005/cart_item/addcart",
        {
          cart_id,
          product_id: product.product_id,
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item added to cart successfully!");
      console.log("Add to cart response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-6">
                <div className="product-detail-img">
                <img src={`http://localhost:8005${product.image}`} alt={product.name} />
                </div>
            </div>
            <div className="col-lg-6">
            <div class="d-flex flex-column product-detail-specific">
                    <div class="p-2">
                    <h2>{product.name}</h2>
                    </div>
                    <div class="p-2 text-danger">
                      Price : {product.price} euro
                    </div>
                    <div className="p-2">
                    <label for="quantity">Enter number you want:</label>
                    <input className="ml-2" type="number" id="age" name="age" min="1" max="120" step="1" 
                    value={quantity}
                     onChange={(e) => setquantity(e.target.value)} />
                    </div>
                    <div className="p-2">
                        <button 
                        onClick={handleAddToCart}
                        className="add_to_cart_specific">Add to cart</button>
                    </div>
                    <div className="p-2 mt-2">
                    <h2>Product info</h2>
                    </div>
                    <div className="p-2">
                    {product.description}
                    </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailPage;