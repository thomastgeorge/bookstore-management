import React, { useState, useEffect } from 'react';
import axios from '../../../Service/Axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/customer');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`/api/v1/customer/${customerId}`);
      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b pt-20">
        <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-medium font-lora dark:text-white">
              Customer Management
            </h2>
          </div>
          <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
            <h3 className="text-xl font-semibold mb-4">Customer List</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {customers.map((customer) => (
                  <li key={customer.customerId} className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{customer.customerId}. {customer.name}</h4>
                        <p>Mobile: {customer.mobile}</p>
                        <p>Registered On: {customer.registeredOn ? new Date(customer.registeredOn).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(customer.customerId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
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

export default CustomerManagement;
