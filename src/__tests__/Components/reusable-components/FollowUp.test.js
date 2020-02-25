import { render } from '@testing-library/react';
import React from 'react';
import { FollowUp } from '../../../Components/reusable-components/FollowUp';
import { threads, match } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';
import store from '../../../redux/store';
import { Provider } from 'react-redux';

describe('<FollowUp />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <FollowUp threads={threads} match={match} />
      </Provider>
    );
    expect(getByLabelText(/Follow Up/i)).toBeInTheDocument();
  });
});
