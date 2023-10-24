import React from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import CrewMember from "./components/CrewMember/CrewMember";
import useCrewMembers from "@/hooks/useCrewMembers/useCrewMembers";
import styles from './CrewMembers.module.css';

const CrewMembers = () => {
  const router = useRouter();


  /**
   * Get params
   */
  const searchParams = useSearchParams();
  const page = useMemo(() => Number(searchParams.get('page') || '1'), [searchParams])

  /**
   * Handle pagination
   */
  const handlePrevClick = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', `${page + - 1}`);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  }, [page])

  const handleNextClick = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', `${page + 1}`);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  }, [page])

  /**
   * Get data
   */
  const res = useCrewMembers();

  /**
   * Handle loading and error
   */
  if(res.loading){
    return <div>Loading...</div>
  }

  if(res.error || !res.data){
    return <div>Error</div>
  }
  
  /**
   * Render
   */
  return (
    <main className={styles.main}>
      <div>
        <h1>Crew Members</h1>
        {res.data.docs.map(d => <CrewMember key={d.id} data={d} />)}
      </div>

      <div>
        {res.data.hasPrevPage &&(
          <button onClick={handlePrevClick}>Previous page</button>
        )}

        {res.data.hasNextPage &&(
          <button onClick={handleNextClick}>Next page</button>
        )}
      </div>
    </main>
  )
}

export default CrewMembers;