import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8005/getproduct/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return response.json();
      })
      .then((data) => {
     
        setProduct(data[0]);
        console.log("Samuel is a good boy")
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

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
                    <div class="p-2">
                        <button className="add_to_cart_specific">Add to cart</button>
                    </div>
                    <div class="p-2 mt-2">
                    <h2>Product info</h2>
                    </div>
                    <div class="p-2">
                    {product.description}
                    </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailPage;