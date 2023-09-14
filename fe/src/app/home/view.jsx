"use client";

import React, { useEffect } from 'react';
import { Container, Row } from "react-bootstrap";
import Btn from "../../components/UI/Btn";
import Listing from "../../components/Listing";
import { cardGames } from "../../utils/contants";
import { asset_home } from "../../../public/images";
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import styles from '../../css/_home.scss';

function Home () {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section className='sec-1-home'>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <div className="hero-left">
                <h1 className='text-uppercase'>

                  <Typewriter
                    options={{
                      strings: ['Welcome To', 'BEST GAME PLAYING TODAY.'],
                      autoStart: true,
                      loop: true,
                      delay: 150
                    }}
                  />

                </h1>
                <p className=''>The Next-Generation Launcpad For</p>
                <span>
                  <Btn title="Play Now" />
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-right">
                <Image src={asset_home.imgHero} alt="image hero" className='img-fluid animate_pulse' />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className='sect-2-home'>
        <Container>
          <div className='row justify-content-between'>
            <div className="col-md-5">
              <div data-aos="zoom-in" data-aos-duration="2000" data-aos-offset="350">

                <Image src={asset_home.imgCoverHome} alt="images" className='img-fluid' />
              </div>
            </div>
            <div className="col-md-6">
              <h3 data-aos="fade-left" data-aos-duration="2000" >WELCOME TO Gigo STARTER</h3>
              <h1 data-aos="fade-left" data-aos-duration="2000" data-aos-delay="100" >What We Do</h1>
              <div data-aos="fade-left" data-aos-duration="2000" data-aos-delay="250">
                <p >We’re a blockchain gaming launchpad focused on growing the Gigo ecosystem and the metaverse. Built on Gigo’s JumpNet with a roadmap towards Efinity, our proprietary platform will enable creators and game developers to run capital-raising campaigns and build communities using blockchain technology.</p>
                <p>Beyond issuing tokens, we provide game developers a way to explore other innovative ways of raising capital to fund their projects through the sale of virtual items as non-fungible tokens (NFTs).
                </p>
                <p>Our incubation program, supported by an accredited partner network, will provide projects with end-to-end support to develop sustainable strategies and launch successful campaigns.</p>
              </div>
            </div>

          </div>
        </Container>

      </section>

      <section className='sect-3'>
        <Container>
          <div className="title">
            <h1 className=''>Popular Game</h1>
            <p>When unknown printer took type and scrambled it to make
              type specimen book centurie</p>
          </div>
          <div className='row justify-content-around'>
            <Listing data={cardGames} />
          </div>
        </Container>
      </section>
    </>

  )
}

export default Home
