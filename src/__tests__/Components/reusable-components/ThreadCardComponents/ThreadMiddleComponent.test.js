import { render } from '@testing-library/react';
import React from 'react';
import ThreadMiddleComponent from '../../../../Components/reusable-components/ThreadCardComponents/ThreadMiddleComponent';
import { heading, info } from '../../../../__mocks__/index';
import '@testing-library/jest-dom/extend-expect';

describe('<ThreadMiddleComponent />', () => {
  it('should render', () => {
    const { getByLabelText } = render(
      <ThreadMiddleComponent heading={heading} info={info} />
    );
    expect(getByLabelText(/Thread Middle/)).toBeInTheDocument();
  });
});
