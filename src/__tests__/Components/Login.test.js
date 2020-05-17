import TestRenderer from 'react-test-renderer';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../Components/Register';
import Context from '../../Components/ContextProvider/Context';
import { BrowerRouter as Router } from 'react-router-dom';

describe('<Login />', () => {
  it('Render login page', () => {
    const testRenderer = TestRenderer.create(
      <Router>
        <Context.Provider
          value={{
            setError: () => console.log('hello'),
            isLoggedIn: name => console.log(name),
            loading: false
          }}
        >
          <Register />
        </Context.Provider>
      </Router>
    );
    expect(getByLabelText(/Login page/i)).toBeInTheDocument();
  });
});
