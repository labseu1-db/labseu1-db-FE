import { render } from '@testing-library/react';
import React from 'react';
import { ProfileCard } from '../../../Components/reusable-components/ProfileCard';
import { user } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';
import store from '../../../redux/store';
import { Provider } from 'react-redux';

describe('<ProfileCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ProfileCard user={user} />
      </Provider>
    );
    expect(getByLabelText(/Profile Card/i)).toBeInTheDocument();
  });
});
