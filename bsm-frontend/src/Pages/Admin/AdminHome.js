import React, { useEffect, useState } from 'react';
import Axios from '../../Service/Axios'

const AdminHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await Axios.get('/api/v1/customer');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this useEffect runs once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Admin Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AdminHome;

