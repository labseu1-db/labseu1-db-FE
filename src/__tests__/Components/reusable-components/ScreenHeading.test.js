import { render } from '@testing-library/react';
import React from 'react';
import ScreenHeading from '../../../Components/reusable-components/ScreenHeading';
import { heading, topic } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ScreenHeading />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <ScreenHeading heading={heading} topic={topic} />
    );
    expect(getByLabelText(/Screen Heading/i)).toBeInTheDocument();
  });
});
