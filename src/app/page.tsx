"use client"

import React from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

const Modal = (props: any) => {
  return (
    <div className={styles.modal}>
      <div>{props.data.name}</div>
      <div onClick={props.closeModal}>x</div>
      <Image src={props.data.image} alt={props.data.name} width="50"  height="50"/>
    </div>
  )
}

export default function Home() {
  const [d, setD] = useState<any[]>([]);
  const [modal, setModal] = useState(null);
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
        {d.map(d => (
          <div onClick={() => setModal(d.id)}>{d.name} {d.status}</div>
        ))}
      </div>

      {modal && <Modal data={d.find(d => d.id === modal)} closeModal={() => setModal(null)} />}
    </main>
  )
}
