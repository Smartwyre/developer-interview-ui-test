"use client"

import React from 'react';
import { useEffect, useState } from 'react'

export default function Home() {
  const [d, setD] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      'https://api.spacexdata.com/v4/crew/query', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({options: {limit: 50}})
      },
    ).then(response => {
      response.json().then(d => {
        setD(d.docs)
      })
    });
  }, []);
  
  return (
    <main style={{display: 'flex', 'alignItems': 'center', "justifyContent": 'center'}}>
      <div>
        <h1>Crew Members</h1>
        {d.map(d => <div>{d.name} {d.status}</div>)}
      </div>
    </main>
  )
}
