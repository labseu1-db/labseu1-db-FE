import { render } from '@testing-library/react';
import React from 'react';
import { NavBar } from '../../Components/NavBar';
import '@testing-library/jest-dom/extend-expect';
import { spaces, user, orgs, match } from '../../__mocks__/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<NavBar />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <NavBar
            spacesForActiveOrg={spaces}
            user={user}
            orgsFromArrayOfUsersIds={orgs}
            match={match}
          />
        </Router>
      </Provider>
    );
    expect(getByLabelText(/Nav Bar/i)).toBeInTheDocument();
  });
});
