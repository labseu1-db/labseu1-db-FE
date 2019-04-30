import React from 'react';
import * as rt from 'react-testing-library';
import renderer from 'react-test-renderer';
import OrganisationProfileEndpoint from './EndpointComponents/OrganisationProfileEndpoint';
import "jest-dom/extend-expect";

function setUpWrap(props = {}) {
    rt.cleanup();
    return rt.render(<OrganisationProfileEndpoint {...props});
}

describe('OrganisationProfileEndpoint', () => {
    it('should display component', () => {
        rt.render(<OrganisationProfileEndpoint />)
    });

});
