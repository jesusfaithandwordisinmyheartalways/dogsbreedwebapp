



import React, { useContext } from 'react';
import { DogStoreContext } from '../Context/DogStoreProvider.jsx';



const AdminPanel = () => {
    const { orders, loading } = useContext(DogStoreContext);

    if (loading) return <p>Loading orders...</p>;


  return (
   <>


<div>
            <h2>Admin Panel - Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <strong>Order ID:</strong> {order.id} | <strong>Customer:</strong> {order.customerName} | <strong>Dog:</strong> {order.dogName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>






   </>
  )
}

export default AdminPanel
