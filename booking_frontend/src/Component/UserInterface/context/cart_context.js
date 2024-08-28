import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cart_reducer";
const CartContext = createContext();


const initialState = {
    cart:[]
}


const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const addToCart = (id, firstName, lastName, address, mobileno, bookDate, timeSlot, description, doctorId) => {
      dispatch({ type: "ADD_TO_CART", payload: { id, firstName, lastName, address, mobileno, bookDate, timeSlot, description, doctorId} });
    };

  

    

    // const removeItem = (id) => {
    //     dispatch({type: "REMOVE_ITEM", payload: id})

    // }

    useEffect(() => {
        // dispatch({ type: "CART_TOTAL_ITEM" });
        // dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
 
        // localStorage.setItem("reshuCart", JSON.stringify(state.cart));
        // console.log(state.cart)
     
        
      }, [state.cart]);

    return (
        <CartContext.Provider
          value={{
            ...state,
            addToCart
          }}>
          {children}
        </CartContext.Provider>
      );
};

const useCartContext = () =>{
    return useContext(CartContext);
}

export {CartProvider,useCartContext}