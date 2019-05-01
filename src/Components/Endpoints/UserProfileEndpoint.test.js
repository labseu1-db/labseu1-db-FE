import React from 'react';
import * as rtl from 'react-testing-library';

import { UserProfileEndpoint } from './UserProfileEndpoint';

afterEach(rtl.cleanup);

describe('User Profileimport React from 'react';
import * as rtl from 'react-testing-library';

import { UserProfileEndpoint } from './UserProfileEndpoint';

afterEach(rtl.cleanup);

describe('User Profile Endpoint', () => {
  it('contains strike button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/strike/i));
  });
  it('contains ball button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/ball/i));
  });
  it('contains foul button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/foul/i));
  });
  it('contains hit button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/hit/i));
  });
});
', () => {
  it('contains strike button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/strike/i));
  });
  it('contains ball button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/ball/i));
  });
  it('contains foul button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/foul/i));
  });
  it('contains hit button', () => {
    const wrap = rtl.render(<Dashboard />);
    expect(wrap.getByText(/hit/i));
  });
});
