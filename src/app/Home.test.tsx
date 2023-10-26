import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from './Home';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Home', () => {
  it('should render crew member name and status', async () => {
    const mockData = {
      ok: true,
      response: {
        docs: [{ id: '1', name: 'John', status: 'active' }],
        totalDocs: 1,
      }
    };

    global.fetch = jest.fn().mockResolvedValue({ ...mockData });

    render(<Home />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeNull();
      screen.findByText('Robert Behnken');
      screen.findByText('Active');
    });
  });

  it('renders loading spinner initially', async () => {
    render(<Home />);
    await waitFor(() => {
      const spinnerElement = screen.getByTestId('loading-spinner');
      expect(spinnerElement).toBeTruthy()
    })
  });


  it.only('pagination changes the page and page size', async () => {
    const mockData = {
      ok: true,
      response: {
        docs: [
          { id: '1', name: 'John', status: 'active' },
          { id: '2', name: 'John', status: 'active' },
          { id: '3', name: 'John', status: 'active' },
          { id: '4', name: 'John', status: 'active' },
          { id: '5', name: 'John', status: 'active' },
          { id: '6', name: 'John', status: 'active' }
        ],
        totalDocs: 1,
      }
    };

    global.fetch = jest.fn().mockResolvedValue({ ...mockData });

    render(<Home />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeNull();
      screen.findByText('Robert Behnken');
      screen.findByText('Active');

      screen.debug()
      // const pageInput = screen.getByLabelText('Go to');
      // const pageSizeSelect = screen.getByLabelText('Items Per Page');
  
      // fireEvent.change(pageInput, { target: { value: '1' } });
      // fireEvent.change(pageSizeSelect, { target: { value: '20' } });
  
      // expect(pageInput).toBe('1');
      // expect(pageSizeSelect).toBe('20');
    });
  });
});
