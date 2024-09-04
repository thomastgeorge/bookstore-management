import React from 'react';

const Contact = () => {
  return (
    <div className="container text-center mt-5">
      <img src="/logo.png" alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
      <h1 className="mb-4">We are Libreria</h1>
      <h3 className="mb-4">For enquiries or customer service, contact us:</h3>
      <p className="mb-4">
        <strong>Phone:</strong> +91 12345-67890
      </p>
      <p className="mb-4">
        <strong>Address:</strong> Bl. No 9, Bellandur, Bengaluru, Karnataka, India, 560103
      </p>
    </div>
  );
};

export default Contact;
