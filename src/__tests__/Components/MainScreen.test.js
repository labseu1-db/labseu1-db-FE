import { render } from '@testing-library/react';
import React from 'react';
import { MainScreen } from '../../Components/MainScreen';
import '@testing-library/jest-dom/extend-expect';
import { threads, match } from '../../__mocks__/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<MainScreen />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <MainScreen threads={threads} match={match} />
        </Router>
      </Provider>
    );
    expect(getByLabelText(/Main Screen/i)).toBeInTheDocument();
  });
});
