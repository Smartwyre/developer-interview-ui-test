import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from './page';

(global as any).fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve([
        {name: 'Robert Behnken', status: 'Active'}
      ])
    }
  })
});

describe('Home', () => {
  it('should renders crew member name and status', () => {
    render(<Home />);

    screen.findByText('Robert Behnken');
    screen.findByText('Active');
  });
});
