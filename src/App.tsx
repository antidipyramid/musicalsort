import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'styled-components';
import './App.css';
import Visualizer from './components/Visualizer';
import * as Tone from 'tone';

import {SVG} from '@svgdotjs/svg.js';
import {Container as svgContainer} from '@svgdotjs/svg.js';

const colorMap = new Map<string, string>([
  ['sorted', 'blue'],
  ['considering', 'yellow'],
  ['unsorted', 'red'],
  ['minimum', 'green'],
  ['pivot', 'black'],
  ['presorted', 'steelblue'],
  ['presorted low', 'cyan'],
  ['presorted high', 'hotpink'],
]);

function drawLegend() {
  let legend = SVG().addTo('#legend').size(1110, 50),
    textSettings = {size: '.9rem', weight: '800'};

  let [rectWidth, rectHeight, offset] = [25, 25, 10];

  Array.from(colorMap.keys()).forEach((s, i) => {
    let group = legend.group();
    group
      .rect(rectWidth, rectHeight)
      .fill(String(colorMap.get(s)))
      .move((90 + 30) * i, 0);
    group
      .text(s)
      .font(textSettings)
      .move((90 + 30) * i + 30, 0);
  });
}

function App() {
  const onSampleLoad = () => {
    // if (!player.loaded) {
    //   console.error('Buffer not loaded yet!');
    //   return;
    // }
    //     if (player.state == 'started') {
    //       player.stop();
    //     } else {
    //       for (const time of times) {
    //         player.stop();
    //         player.seek(time);
    //         player.start();
    //         player.stop('+1');
    //         sleep(1000);
    //       }
    //     }
  };

  // const player = new Tone.Player(
  //   'https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3'
  // ).toDestination();

  // const play = () =>
  //   Tone.Transport.scheduleOnce(() => {
  //     console.log('started!');
  //     player.seek(1);
  //     player.start();
  //     player.stop('+1');
  //   }, 1);
  // const [start, setStart] = useState(0);
  // const grainSize = 0.05;

  // // player.start();
  // // player.toDestination();
  // player.start();
  // player.toDestination();
  // useEffect(() => {
  //   setTimeout(() => {
  //     setStart(Number(Math.random().toFixed(2)));
  //     player.set({
  //       grainSize: grainSize,
  //       loopStart: start,
  //       loopEnd: start + grainSize,
  //     });

  //     if (player.loaded) {
  //       player.restart();
  //     }
  //   }, 5000);
  // });

  // const filter = new Tone.AutoFilter(4).start();
  // const distortion = new Tone.Distortion(0.5);
  useEffect(() => {
    drawLegend();
  });

  return (
    <div
      className='container mt-3'
      style={{paddingBottom: '20px', paddingTop: '20px'}}
    >
      <div
        className='text-center'
        style={{
          paddingLeft: '80px',
          paddingRight: '80px',
          paddingBottom: '20px',
        }}
      >
        <h1 style={{paddingBottom: '1em'}}>Musical Sort</h1>
        <p>Ever wondered what sorting algorithms sound like?</p>
        <p>
          Musical Sort is a web app that simulates the sounds of various sorting
          algorithms. Sorting is usually only represented visually but by
          assigning each element of a list a sound, we can represent the
          mechanisms of these algorithms sonically as well.
        </p>
        <p>
          {' '}
          This project was inspired by the many videos online that accompany
          sorting visualizations with sound. Some of the most well known
          algorithms are included here, but{' '}
          <a href='https://panthema.net/2013/sound-of-sorting/'>this</a> project
          is a great standalone app that includes more obscure sorting
          algorithms.
        </p>
      </div>
      <Visualizer />
      <Jumbotron
        id='legend'
        style={{borderTopRightRadius: '0rem', borderTopLeftRadius: '0rem'}}
      />
      <div style={{padding: '0px'}}>
        Made with React, SVG.js, and Tone.js. Check out the code on Github.
      </div>
    </div>
  );
}

export default App;
