import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user_id ,setuser_id] = useState(null)

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
        } catch (error) {
          console.error('Error fetching user data:', error);
        //   setError('Failed to fetch user data');
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
//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent page reload on form submission

//     try {
//       const response = await axios.post('http://localhost:8005/auth/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         console.log(response.data.token)
//         const token = response.data.token; // Assuming the JWT is returned as 'token'
//         Cookies.set('jwt', token, { expires: 7, path: '/', secure: true });
//         // Save the token in a cookie
//         document.cookie = `jwt=${token}; path=/; secure; HttpOnly`;
//         // If successful, handle the response and redirect
//         console.log('Login successful:', response.data);
//         setMessage('Login successful!');
//         navigate('/'); // Redirect to the "/" route
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response:', error.response.data);
//         setMessage('Login failed: The username and password is incorrect.');
//       } else if (error.request) {
//         console.error('Error request:', error.request);
//         setMessage('Login failed: No response from the server.');
//       } else {
//         console.error('Error:', error.message);
//         setMessage('Login failed: The Email or password is incorrect.');
//       }
//     }
//   };

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
                    <label for="quantity">Enter your age:</label>
                    <input className="ml-2" type="number" id="age" name="age" min="1" max="120" step="1" />
                    </div>
                    <div className="p-2">
                        <button className="add_to_cart_specific">Add to cart</button>
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