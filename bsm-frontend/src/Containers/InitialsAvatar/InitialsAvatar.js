import React from 'react'

const InitialsAvatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div style={{
      height: '4vw',
      width: '4vw',
      borderRadius: '50%',
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2vw',
      fontWeight: 'bold'
    }}>
      {initials}
    </div>
  );
};

export default InitialsAvatar;