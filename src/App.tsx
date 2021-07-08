import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import './App.css';
import Visualizer from './components/Visualizer';
import * as Tone from 'tone';

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
  const Hero = styled(Jumbotron)`
    padding: 2rem 10rem;
  `;

  return (
    <Container>
      <Hero>
        <Visualizer />
      </Hero>
    </Container>
  );
}

export default App;
