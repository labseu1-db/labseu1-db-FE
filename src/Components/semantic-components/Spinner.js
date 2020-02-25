import React from 'react';
import { Loader } from 'semantic-ui-react';

const Spinner = () => (
  <div aria-label="Spinner">
    <Loader active />
  </div>
);

export default Spinner;
