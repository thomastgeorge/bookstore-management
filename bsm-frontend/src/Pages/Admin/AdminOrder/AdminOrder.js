import React, { useState, useEffect } from 'react';
import axios from '../../../Service/Axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching orders.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchOrders = async (e) => {
    e.preventDefault();
    setError('');
    const match = query.match(/\d+/);
    const number = match ? Number(match[0]) : null;
    console.log(number)
    
    try {
        const response = await axios.get('/api/v1/order/search', {
        params: { orderId: number , param: query }
      });
      setOrders(response.data);
    } catch (err) {
      setError('An error occurred while fetching the data.');
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/v1/order/${orderId}`);
      fetchOrders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b ">
        <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-medium font-lora dark:text-white">
              Order Management
            </h2>
          </div>
          <form onSubmit={searchOrders} className="mb-4">
            <input
              type="text"
              placeholder="Search by orderId, customer name, or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white px-3 py-2"
            />
          </form>

          <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
            <h3 className="text-xl font-semibold mb-4">Order List</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : orders.length === 0 ? (
              <p>No orders found. Try a different search.</p>
            ) : (
              <ul>
                {orders.map((order) => (
                  <li key={order.orderId} className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{order.orderId}. {order.customer.name}</h4>
                        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Total: ${order.totalTotal.toFixed(2)}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                      </div>
                      <div className="flex space-x-2">
                        {/* <button
                          onClick={() => handleDelete(order.orderId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderManagement;
