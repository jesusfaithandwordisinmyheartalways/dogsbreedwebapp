



import React, { createContext, useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import { dogs_products } from '../Components/ArrayData/adoptdogs';




export const DogStoreContext = createContext(null)





const DogStoreProvider = ({ children }) => {

  const OriginalCart = () => {
    const storedCart = localStorage.getItem("cartItems");
       if (storedCart) {
       return JSON.parse(storedCart); // Load cart data from localStorage
     } else {
       let cart = {};
         for (let i = 0; i < dogs_products.length + 1; i++) {
           cart[i] = 0;
         }
         return cart;
       }
      }



      const getStoredSizes = () => {
        let storedSizes = {};
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("selectedSizes_")) {
                const productId = key.replace("selectedSizes_", "");
                storedSizes[productId] = JSON.parse(localStorage.getItem(key));
            }
        });
        return storedSizes;
    };
    


    const [originalCartItems, setOriginalCartItems] = useState(OriginalCart());   
    const [selectedSizes, setSelectedSizes] = useState(getStoredSizes()); 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [count, setUserCount] = useState(1);
    const [orderItems, setOrderItems] = useState([]);
    const [buttonOptions, setButtonOptions] = useState(null);
    const location = useLocation()
    const navigate = useNavigate();
    const [userOrders, setUserOrders] = useState([])



    const updateLocalStorage = (cartItems) => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };


    const updateSizeStorage = (sizes) => {
      localStorage.setItem("selectedSizes", JSON.stringify(sizes));
  };





  const updateSelectedSize = (productId, size) => {
    setSelectedSizes((prevSizes) => {
        const updatedSizes = { ...prevSizes, [productId]: size };
        localStorage.setItem(`selectedSizes_${productId}`, JSON.stringify(size));
        return updatedSizes;
    });
};




const quantityIncrease = (productId) => {
  setOriginalCartItems((prevCart) => {
    const updatedCart = { ...prevCart, [productId]: (prevCart[productId] || 1) + 1 };
    updateLocalStorage(updatedCart);
    return updatedCart;
  });
};





const quantityDecrease = (productId) => {
  setOriginalCartItems((prevCart) => {
    const updatedCart = { ...prevCart, [productId]: Math.max(1, (prevCart[productId] || 1) - 1) };
    updateLocalStorage(updatedCart);
    return updatedCart;
  });
};




const TotalCartAmountItems = () => {
  return Object.values(originalCartItems).reduce((total, quantity) => total + quantity, 0);

}




const TotalCartAmount = () => {
  let totalCartAmount = 0;
  for (const index in originalCartItems) {
      if (originalCartItems[index] > 0) {
          const product = dogs_products.find((product) => String(product.id) === String(index));
          if (product) {
              totalCartAmount += originalCartItems[index] * product.new_price; 
          }
      }
  }
  return totalCartAmount * count;


}






const AddCartItems = (productId, size) => {
  setOriginalCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
          updatedCart[productId] += 1;  // Increase quantity of existing item
      } else {
          updatedCart[productId] = 1;  // Add new item to cart
      }
      updateLocalStorage(updatedCart);
      return updatedCart;
  });
};






const RemoveCartItems = (productId) => {
  setOriginalCartItems((cartItems) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[productId]; // Completely remove the item
    updateLocalStorage(updatedCart);
    return updatedCart;
  });

  setSelectedSizes((sizes) => {
    const updatedSizes = { ...sizes };
    delete updatedSizes[productId]; // Remove the size selection
    updateSizeStorage(updatedSizes);
    return updatedSizes;
  });

 


};








const CheckoutOrderItems = () => {

  let itemsToOrder = [];

  for (let product of dogs_products) {
      let productId = String(product._id);

      if (originalCartItems[productId] > 0) {
          // Ensure selectedSize and selectedColor are defined before using them
          let selectedSize = selectedSizes[productId] || "Not Selected";
          let selectedPickupOption = JSON.parse(localStorage.getItem("selectedPickupOption")) || "Not Selected";


          let item = {
              id: productId,
              name: product.name || "N/A",
              image: product.image[0] || "",
              size: selectedSize, // Assign the selected size here
              price: product.new_price || 'N/A',
              quantity: originalCartItems[productId],
              pickupOption: selectedPickupOption
              
          };

          itemsToOrder.push(item);
      }
  }

  // Update orderItems in localStorage and in the state at the same time
  setOrderItems(itemsToOrder);
  localStorage.setItem("orderItems", JSON.stringify(itemsToOrder));

  if (location.pathname.includes('/cart')) {
     navigate('/purchase');
  } else {
    navigate('/purchase');
}


};






const DogStoreContextValue = { count, setUserCount, search,  setSearch, showSearch, setShowSearch,
   selectedSizes, setSelectedSizes, 
 updateSelectedSize, updateLocalStorage,  originalCartItems,
 setOriginalCartItems, TotalCartAmountItems, TotalCartAmount, quantityIncrease, quantityDecrease,
 AddCartItems, RemoveCartItems , orderItems, setOrderItems, 
CheckoutOrderItems, buttonOptions, 
 setButtonOptions, }






  return (
  <>

    
      <DogStoreContext.Provider value={DogStoreContextValue}>
            {children}
      </DogStoreContext.Provider>
   



  </>
  )
}





export default DogStoreProvider
