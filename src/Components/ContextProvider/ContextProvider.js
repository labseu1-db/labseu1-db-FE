import Context from './Context';
import React, { useState } from 'react';
import { Icon, Message } from 'semantic-ui-react';

const ContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <Context.Provider value={{ setError: setError }}>
      {error && (
        <Message warning attached="bottom">
          <Icon name="warning" />
          {error.message}
        </Message>
      )}
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
