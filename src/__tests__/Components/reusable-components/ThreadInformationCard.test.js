import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ThreadInformationCard from '../../../Components/reusable-components/ThreadInformationCard';
import { getSpaceWithId } from '../../../__mocks__/index';
import Context from '../../../Components/ContextProvider/Context';

describe('<ThreadInformationCard />', () => {
  it('Render ThreadInformationCard', () => {
    const { getByLabelText } = render(
      <Context.Provider value={{ getSpaceWithId: getSpaceWithId }}>
        <ThreadInformationCard />
      </Context.Provider>
    );
    expect(getByLabelText('ThreadInformationCard')).toBeInTheDocument();
  });
});
