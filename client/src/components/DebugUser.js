import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const DebugUser = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('User in DebugUser useEffect:', user);
  }, [user]);

  return (
    <div>
      <h3>Debug User:</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default DebugUser;
