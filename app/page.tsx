"use client";

import initPlanet from '@/components/3D/planet';
import React, { useEffect } from 'react'

const Home = () => {


  useEffect(()=>{
    initPlanet()
  },[]);


  return (
    <div className='page'>
      <section className='hero_main'>
        <div className="content">
          <h1>Welcome To the New World</h1>

          <p>
            AI agents that brings value to bussiness and elevate workers productivity
          </p>

          <button className='cta_btn'>Get Started</button>
        </div>
        <canvas className='planet-3D'/>
      </section>
    </div>
  )
}

export default Home