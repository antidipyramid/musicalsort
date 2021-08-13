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

function titleCase(s: string) {
  let done = [];
  for (let word of s.split(' ')) {
    done.push(word[0].toUpperCase().concat(word.slice(1)));
  }

  return done.join(' ');
}

function drawLegend() {
  const legend = SVG().addTo('#legend').size(1110, 50),
    textSettings = {size: '.9rem', weight: '800'};

  const [rectWidth, rectHeight, offset] = [25, 25, 25];

  let textWidth = 0;
  Array.from(colorMap.keys()).forEach((s, i) => {
    let group = legend.group();

    group
      .rect(rectWidth, rectHeight)
      .fill(String(colorMap.get(s)))
      .move((rectWidth + 5) * i + textWidth + offset * i, 0);
    let text = group.text(titleCase(s)).font(textSettings);

    textWidth += text.length();

    group
      .get(1)
      .move(
        (rectWidth + 5) * (i + 1) + textWidth - text.length() + offset * i,
        0
      );
  });
}

function App() {
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
          This app was inspired by the many videos online that pair sorting
          visualizations with sound. Some of the most well known algorithms are
          included here, but{' '}
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
