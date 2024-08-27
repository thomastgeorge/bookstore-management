import React from 'react'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';


const Account = () => {
  return (
    <>
      <div>Account</div>
      <div>
        <InitialsAvatar name="User 1"  />
        <h2 className="font-weight-bold">Hello User 1,</h2>
      </div>
    </>
  )
}

export default Account