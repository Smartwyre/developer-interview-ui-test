"use client"

import React from 'react';
import { useEffect, useState } from 'react'
import { Pagination, Spin } from 'antd';
import styled from 'styled-components';

interface ICrew {
  agency: string, 
  id: string, 
  image: string, 
  launches: string[],
  name: string, 
  status: string, 
  wikipedia: string
}

export default function Home() {
  const [crew, setCrew] = useState<ICrew[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalDocs, setTotalDocs] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://api.spacexdata.com/v4/crew/query', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ options: { limit: pageSize, offset: (page - 1) * pageSize } })
      }
    )
    .then(response => {
      console.log(response.ok)
      if (!response.ok) {
        console.error("Error", response)
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setCrew(data.docs);
      setTotalDocs(data.totalDocs);
      setIsLoading(false)
    })
    .catch(() => {
      setIsLoading(false)
      setError(true)
    })
  }, [page, pageSize]);

  const onChange = (page: number, pageSize:number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  if(error) {
    return (
      <ErrorMessage>
        <div>
          Something went wrong.
        </div>
        <button onClick={() => location.reload()}>
          Please click here to refresh.
        </button>
      </ErrorMessage>
    )
  }

  if(isLoading) {
    return (
      <div data-testid={"loading-spinner"}>
        <Spin />
      </div>
    )
  }
  
  return (
    <main style={{display: 'flex', 'alignItems': 'center', "justifyContent": 'center'}}>
      <div>
        <h1>Crew Members</h1>
        {crew.map(crew => {
          return <CrewWrapper key={crew.name}>
            <div>
              {crew.name} 
            </div>
            <div>
              {crew.status === "active" ? "Active": "Inactive"}
            </div>
          </CrewWrapper>
        })}
        <Pagination showQuickJumper showSizeChanger current={page} total={totalDocs} onChange={onChange} />
      </div>
    </main>
  )
}

const CrewWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 1%;
  margin: 1%;
`;

const ErrorMessage = styled.div` 
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 20%;
  align-items: center;
`
