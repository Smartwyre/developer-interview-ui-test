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
  const [data, setData] = useState<any[]>([]);
  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/crew/query', {method: 'POST'}).then(response => {
      response.json().then(d => {
        console.log(d);
        setData(d.docs)
      })
    });
  }, []);
  
  return (
    <main className={styles.main}>
      <div>
        <h1>Crew Members</h1>
        {data.map(d => (
          <div onClick={() => setOpenId(d.id)}>{d.name} {d.status}</div>
        ))}
      </div>

      {openId && <Modal data={data.find(d => d.id === openId)} closeModal={() => setOpenId(null)} />}
    </main>
  )
}
