import { render } from '@testing-library/react';
import React from 'react';
import { ThreadsScreen } from '../../Components/ThreadsScreen';
import '@testing-library/jest-dom/extend-expect';
import { history, comments, match, firestore } from '../../__mocks__/index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<ThreadsScreen />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ThreadsScreen
          history={history}
          comments={comments}
          match={match}
          firestore={firestore}
        />
      </Provider>
    );
    expect(getByLabelText(/Thread Screen/i)).toBeInTheDocument();
  });
});
