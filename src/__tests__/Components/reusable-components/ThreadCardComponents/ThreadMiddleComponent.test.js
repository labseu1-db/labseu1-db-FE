import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadMiddleComponent from '../../../../Components/reusable-components/ThreadCardComponents/ThreadMiddleComponent';
import { info } from '../../../../__mocks__/index';

describe('<ThreadMiddleComponent />', () => {
  it('Render ThreadMiddleComponent', () => {
    const { getByLabelText } = render(<ThreadMiddleComponent info={info} />);
    expect(getByLabelText('ThreadMiddleComponent')).toBeInTheDocument();
  });
});
