import { render } from '@testing-library/react';
import React from 'react';
import { UpgradeAccount } from '../../Components/UpgradeAccount';
import '@testing-library/jest-dom/extend-expect';
import { org, match } from '../../__mocks__/index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<UpgradeAccount />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <UpgradeAccount currentOrg={org} match={match} />
      </Provider>
    );
    expect(getByLabelText(/Free Plan/i)).toBeInTheDocument();
  });
});
