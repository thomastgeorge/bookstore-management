import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../App';
import { Button, Form, Container, Alert, Modal } from 'react-bootstrap';
import Axios from '../../../Service/Axios';
import './Profile.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [editingField, setEditingField] = useState('');
  const [formData, setFormData] = useState({ ...user });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is null
    if (!user) {
      navigate('/login');
      return;
    }

    // Reset formData if user changes
    setFormData({ ...user });
  }, [user, navigate]);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    setEditingField('');
    setUpdateError("");
    setFormData({ ...user });
  };

  const handleDeleteAccount = async () => {
    try {
      await Axios.delete(`api/v1/customer/${user.customerId}`);
      localStorage.clear();
      setUser(null); // Clear the user context
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
      setUpdateError('An error occurred while deleting the account. Please try again.');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await Axios.get(`api/v1/customer/userId/${user.user.userId}`);
      console.log(response.data);
      setUpdateError("");

      const modifiedData = {
        ...response.data,
        role: response.data.user.role
      };

      setUser(modifiedData);
      console.log("Modified data", modifiedData);
      
    } catch (error) {
      console.error('There was an error!', error);
      setUpdateError('An error occurred while updating. Please try again.');
    }
  };

  const handleUpdateField = async () => {
    try {
      let apiUrl = '';
      const updateData = {};
      switch (editingField) {
        case 'name':
          apiUrl = `api/v1/customer/${user.customerId}`;
          updateData.name = formData.name;
          break;
        case 'email':
          if (!/\S+@\S+\.\S+/.test(formData.user.email)) {
            setEmailError('Invalid email format');
            return;
          }
          setEmailError('');
          apiUrl = `api/v1/user/${user.user.userId}`;
          updateData.email = formData.user.email;
          break;
        case 'mobile':
          apiUrl = `api/v1/customer/${user.customerId}`;
          updateData.mobile = formData.mobile;
          break;
        default:
          return;
      }

      if (apiUrl) {
        await Axios.patch(apiUrl, updateData);
       
        if (editingField === 'email') {
            setUpdateError('Email updated successfully. You will be logged out.');
            setTimeout(() => {
              localStorage.clear();
              navigate('/login')
            }, 4000); // Delay for showing the alert
          } else {
            setSuccessMessage(`${editingField.charAt(0).toUpperCase() + editingField.slice(1)} updated successfully`);
            setTimeout(() => setSuccessMessage(''), 5000);
            setEditingField('');
            setEditingField('');
            fetchUserData();
          }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateError('An error occurred while updating. Please try again.');
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      setPasswordError('New password cannot be the same as current password');
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(passwordData.newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }
    setPasswordError('');

    try {
      await Axios.patch(`api/v1/user/updatePassword/${user.user.userId}`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccessMessage('Password updated successfully');
      setEditingField('');
      setUpdateError('');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 5000);
      fetchUserData();

    } catch (error) {
      console.error('Error updating password:', error);
      setUpdateError('An error occurred while updating the password. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (editingField === 'email') {
      setFormData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="mt-5" style={{ marginLeft: '300px' }}>
      {successMessage && <Alert variant="success" className="small-success mt-3">{successMessage}</Alert>}
      {editingField === '' ? (
        <div>
          <h2>Profile</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '30px' }}>
            <div>
              <strong>Name:</strong> {user.name}
              <Button variant="link" onClick={() => handleEditClick('name')} className="ms-2">Edit</Button>
            </div>
            <div>
              <strong>Email:</strong> {user.user.email}
              <Button variant="link" onClick={() => handleEditClick('email')} className="ms-2">Edit</Button>
            </div>
            <div>
              <strong>Mobile:</strong> {user.mobile}
              <Button variant="link" onClick={() => handleEditClick('mobile')} className="ms-2">Edit</Button>
            </div>
            <div>
              <strong>Password:</strong> Password is hidden
              <Button variant="link" onClick={() => setEditingField('password')} className="ms-2">Update Password</Button>
            </div>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)} className="mt-3">Delete Account</Button>
          </div>
        </div>
      ) : editingField === 'password' ? (
        <div>
          <h2>Update Password</h2>
          <Form.Group className="mb-3">
            <Form.Label>Current Password:</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="small-input-password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="small-input-password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="small-input-password"
            />
          </Form.Group>
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Button variant="secondary" onClick={() => setEditingField('')} className="me-2">Cancel</Button>
          <Button variant="primary" onClick={handlePasswordUpdate}>Submit</Button>
        </div>
      ) : (
        <div>
          <h2>Edit {editingField.charAt(0).toUpperCase() + editingField.slice(1)}</h2>
          <Form.Group className="mb-3">
            {editingField === 'name' && (
              <>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="small-input"
                />
              </>
            )}
            {editingField === 'email' && (
              <>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.user.email}
                  onChange={handleChange}
                  isInvalid={!!emailError}
                  className="small-input"
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </>
            )}
            {editingField === 'mobile' && (
              <>
                <Form.Label>Mobile:</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="small-input"
                />
              </>
            )}
          </Form.Group>
          <Button variant="secondary" onClick={handleCancel} className="me-2">Cancel</Button>
          <Button variant="primary" onClick={handleUpdateField}>Update</Button>
          {updateError && <Alert variant="danger" className="small-error mt-3">{updateError}</Alert>}
        </div>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
