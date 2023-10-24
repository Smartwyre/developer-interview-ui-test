import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface CrewMember {
  "name": string;
  "agency": string;
  "image": string;
  "wikipedia": string;
  "launches": string[],
  "status": string;
  "id": string;
}

export interface CrewMemberResponse {
  "docs": CrewMember[];
  "totalDocs": number;
  "offset": number;
  "limit": number;
  "totalPages": number;
  "page": number;
  "pagingCounter": number;
  "hasPrevPage": boolean;
  "hasNextPage": boolean;
  "prevPage": null;
  "nextPage": null;
}

const useCrewMembers = () => {
  /**
   * Get search params
   */
  const res = useSearchParams();
  const page = useMemo(() => Number(res.get('page') || '1'), [res])
  const limit = useMemo(() => Number(res.get('limit') || '10'), [res])

  /**
   * States
   */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CrewMemberResponse>();
  const [error, setError] = useState<Error | undefined>(undefined);

  /**
   * Get data
   */
  useEffect(() => {
    if(loading !== true) {
      setLoading(true);
    }

    fetch(
      'https://api.spacexdata.com/v4/crew/query', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          options: {
            offset: (page - 1) * limit,
            limit,
          }
        })
      },
    ).then(response => {
      response.json().then(d => {
        setLoading(false)
        setData(d)
      })
    }).catch(error => {
      setLoading(false);
      setError(error);
    })
  }, [page, limit])

  return {
    loading,
    data,
    error,
  }
}

export default useCrewMembers;