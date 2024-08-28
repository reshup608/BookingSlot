const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, firstName, lastName, address, mobileno, bookDate, timeSlot, description, doctorId } = action.payload;


        let existingProduct = state.cart.find((curlItem) => curlItem.productid === id);

        if (existingProduct) {
            let updatedProduct = state.cart.map((item) => {
                if (item.productid === id) {
                    return {
                        ...item
                    }
                }
                else {
                    return item;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            };
        }
        else {
            let product;
            product = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                address: address,
                mobileno: mobileno,
                bookDate: bookDate,
                timeSlot: timeSlot,
                description: description,
                doctorId: doctorId
            };
            return {
                ...state,
                cart: [...state.cart, product]
            };
        }
     }
    // if (action.type === "REMOVE_ITEM") {
    //     let updatedCart = state.cart.filter(
    //         (curItem) => curItem.productid !== action.payload
    //     );
    //     return {
    //         ...state,
    //         cart: updatedCart,
    //     }
    // }

    // if (action.type === "CART_TOTAL_ITEM") {
    //     let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
    //         let a = 0;
    //         if (curElem) {
    //             a += 1;
    //         }
    //         initialVal = initialVal + a;
    //         return initialVal;
    //     }, 0);

    //     return {
    //         ...state,
    //         total_item: updatedItemVal,
    //     };
    // }

    // if (action.type === "CART_ITEM_PRICE_TOTAL") {
    //     let { total_price } = state.cart.reduce(
    //         (accum, curElem) => {
    //             let { offerprice, price } = curElem;

    //             accum.total_price += Number((price - (price * offerprice / 100)).toFixed(2));


    //             return accum;
    //         },
    //         {

    //             total_price: 0,
    //         }
    //     );
    //     return {
    //         ...state,
    //         total_price,
    //     };
    // }

    return state;

}

export default cartReducer;
