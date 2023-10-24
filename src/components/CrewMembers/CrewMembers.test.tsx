import { render, screen } from '@testing-library/react';
import React from 'react';

import CrewMembers from './CrewMembers';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { CrewMemberResponse } from '@/hooks/useCrewMembers/useCrewMembers';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: () => null,
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  }
}));

(global as any).fetch = jest.fn((url, options) => {
  return Promise.resolve({
    json: () => {
      const response: CrewMemberResponse = {
        docs: [
          {
            name: 'Robert Behnken',
            agency: 'Active',
            status: 'Active',
            image: 'Active',
            wikipedia: 'Active',
            launches: [],
            id: '1',
          },
        ],
        totalDocs: 1,
        offset: 1,
        limit: 1,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      }

      return Promise.resolve(response)
    }
  })
});

describe('CrewMembers', () => {
  it('should render loading and success', async () => {
    render(<CrewMembers />);

    screen.findByText('Loading...');
    await screen.findByText('Robert Behnken');
  });

  it.todo('should error if api error');
  it.todo('should error if no data');
  it.todo('should show next page button if `hasNextPage`');
  it.todo('should show prev page button if `hasPrevPage`');
  it.todo('should push search params to router on next page click');
  it.todo('should push search params to router on prev page click');
});
