import React, { use, useEffect, useState,useContext,useCallback} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from "../src/components/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
const Shoppingcart = () =>{

    const [cartitems, setcartitems] = useState(null)
    const fetchUserData = useCallback(async () => {
        const token = Cookies.get('jwt');
   
    
        try {
          const response = await axios.get('http://localhost:8005/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
     
          try {
            const getresponse = await axios.get(
              `http://localhost:8005/cart_item/getcartbyuserId/${response.data.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
              }
            );
            setcartitems(getresponse.data)
            console.log(cartitems)
          } catch (addCartError) {
          }
        } catch (error) {
        }
      }, []);
      const handleRemoveItem = async (cartItemId) => {
        const token = Cookies.get("jwt");
        try {
          await axios.delete(`http://localhost:8005/cart_item/delete`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { cart_item_id: cartItemId }, // Pass cart item ID in the request body
          });
    
          // Update state to remove the deleted item
          setcartitems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
          console.log(`Cart item with ID ${cartItemId} has been deleted.`);
          window.location.reload();
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }
      };
      useEffect(() => {
        fetchUserData();
      }, [fetchUserData]);
    

    return(
        <div>
           <div className="container">
            <div className="row mt-3 mb-3">
            <div className="col-lg-9">
            <div class="d-flex flex-row my_cart_title">
                    <div class="p-2">
                        <h2>My cart</h2>
                        </div>
            </div>

            {cartitems && cartitems.length > 0 ? (
                cartitems.map((item, index) => (
                <div class="d-flex flex-row mb-3">
                    <div className="img_cart">
                    <img src={`http://localhost:8005${item.image}`} alt="Description" />
                    </div>
                    <div class="p-2 align-self-center">{
                        item.productName
                        }</div>
                    <div class="p-2 align-self-center">Price : {
                        item.price
                        }$</div>
                    <div class="p-2 align-self-center">Order quantity : {
                        item.quantity
                        }$</div>
                    <div class="p-2 align-self-center">Total price : {
                        item.quantity*item.price
                        }$</div>
                    <div class="p-2 align-self-center">Total price : {
                        item.quantity*item.price
                        }$</div>
                    <div className="p-2 align-self-center">
                    <button
                     onClick={() => handleRemoveItem(item.cartItemId)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>       
                </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="col-lg-3">
                <a>caio mahdad</a>
            </div>
            </div>
           </div>
        </div>
    )
}
export default Shoppingcart;