import { render } from '@testing-library/react';
import React from 'react';
import { SpaceThreads } from '../../Components/SpaceThreads';
import '@testing-library/jest-dom/extend-expect';
import { space, threads, match } from '../../__mocks__/index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('<SpaceThreads />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <SpaceThreads space={space} threads={threads} match={match} />
      </Provider>
    );
    expect(getByLabelText(/Space Thread/i)).toBeInTheDocument();
  });
});
