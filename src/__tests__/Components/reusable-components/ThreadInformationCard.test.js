import { render } from '@testing-library/react';
import React from 'react';
import { ThreadInformationCard } from '../../../Components/reusable-components/ThreadInformationCard';
import { space } from '../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ThreadInformationCard />', () => {
  it('should render', () => {
    const { getByLabelText } = render(<ThreadInformationCard space={space} />);
    expect(getByLabelText(/Thread Information Card/i)).toBeInTheDocument();
  });
});
