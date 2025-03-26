




import React from "react"
import './Orders.css'
import { useEffect, useState } from "react"



const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);





    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await fetch('http://localhost:3001/orders');
            console.log('Fetching orders...'); // Debugging log
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Orders fetched:', data); // Log fetched orders
            setOrders(data);
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchOrders();
      }, [setOrders]);
    





    return (
        <>
            <div className="orders-container">
                <div className="orders-wrapper">
                
                <div>
      <h2>Admin Panel - Orders</h2>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Cart</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{JSON.stringify(order.cart)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>




                </div>
            </div>
  



        </>
    )
}





export default Orders