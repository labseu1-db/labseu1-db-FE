import Context from './Context';
import React from 'react';

const ContextProvider = ({ children }) => {
  return <Context.Provider>{children}</Context.Provider>;
};

export default ContextProvider;
