import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { resetPasswordStatus, match } from '../../__mocks__/index';
import { UserProfile } from '../../Components/UserProfile';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<UserProfile />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <UserProfile resetPasswordStatus={resetPasswordStatus} match={match} />
      </Provider>
    );
    expect(getByLabelText(/User Profile/i)).toBeInTheDocument();
  });
});
