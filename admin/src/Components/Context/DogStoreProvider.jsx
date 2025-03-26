




import React, { createContext, useState, useEffect } from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';




export const DogStoreContext = createContext();



const DogStoreProvider = ({ children, isAdmin = false }) => {
    const [dogs, setDogs] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin) {
            fetchOrders();
        }



    }, [isAdmin])






  return (
  <>


    <DogStoreContext.Provider value={{ dogs, orders, loading }}>
            {children}
        </DogStoreContext.Provider>




  </>
  )
}



export default DogStoreProvider
