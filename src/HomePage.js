import React, { useEffect, useState } from "react";
import wine_ads from './assets/images/wine_ads.jpg';
import washing_ads from './assets/images/washing_ads.jpg';
import { Link } from "react-router-dom";
const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the API
    fetch("http://localhost:8005/getproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
      fetch("http://localhost:8005/category/getcategory")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
    <div className="container">
    <div class="d-flex flex-row">
    <div class="p-2">
      <h2>
      Most Popular categories
      </h2>
      </div>
    </div>

    <div className="row">
    {category.map((category) => (
             <div className="col-lg-3 col-md-6 col-sm-12">
             <div class="with-border category_img">
             <img src={`http://localhost:8005${category.image}`} alt="Description" />
              </div>
              <div class="d-flex justify-content-center mb-2 text-center ">
    <div class="p-2 category_name">
      <a>
      <Link to={`/category/${category.category_id}`}>{category.name}</Link>
        </a></div>
  </div>
             </div>
              ))}
    </div>
    <div className="row">
      <div className="col-lg-8">
      <div class="image-container">
    <img src={wine_ads} alt="Responsive Image" />
    <div class="text-overlay">It's time for the wine Greate deals on Selected wines</div>
  </div>
      </div>
      <div className="col-lg-4">
      <div class="image-container">
    <img src={washing_ads} alt="Responsive Image" />
    <div class="text-overlay2">Deals of the week 40% off cleaning supplies</div>
  </div>
      </div>
    </div>
    <div class="d-flex flex-row mt-3">
  <div>
    <h2>Most Popular Shops</h2>
      </div>
</div>
    <div class="row mt-3">
    {products.map((product) => (
              <div class="col-lg-4 shadow-hover mt-2 mb-2">
              <div className='d-flex flex-row align-items-center justify-content-center product_img_size'>
              <img src={`http://localhost:8005${product.image}`} alt="Description" />
              </div>
              <div class="d-flex flex-row align-items-center justify-content-center">
              <div class="p-2">
              <Link to={`/product/${product.product_id}`}>{product.name}</Link>
              </div>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-center">
              <div class="p-2">
                <a>Price : ${product.price}</a>
              </div>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-center">
              <button class="btn btn-success">Buy</button>
          </div>
              </div>
        ))}
  </div>
  </div>
  </div>
  );
};

export default HomePage;