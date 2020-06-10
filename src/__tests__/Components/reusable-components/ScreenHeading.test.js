import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ScreenHeading from '../../../Components/reusable-components/ScreenHeading';
import { topic } from '../../../__mocks__/index';
import { getByLabelText } from 'react-testing-library';

describe('<ScreenHeading />', () => {
  it('Render ScreenHeading without topic', () => {
    const { getByLabelText } = render(<ScreenHeading />);
    expect(getByLabelText('ScreenHeading without topic')).toBeInTheDocument();
  });
  it('Render ScreenHeading with topic', () => {
    const { getByLabelText } = render(<ScreenHeading topic={topic} />);
    expect(getByLabelText('ScreenHeading with topic')).toBeInTheDocument();
  });
});
