import { render } from '@testing-library/react';
import React from 'react';
import ThreadCard from '../../../Components/reusable-components/ThreadCard';
import { info } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';
import store from '../../../redux/store';
import { Provider } from 'react-redux';

describe('<ThreadCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ThreadCard info={info} />
      </Provider>
    );
    expect(getByLabelText(/Thread Card/i)).toBeInTheDocument();
  });
});
