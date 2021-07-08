import React from 'react';
import {useState, useEffect, useRef, useReducer} from 'react';
import {Container, SVG} from '@svgdotjs/svg.js';
import {insertionSort} from '../utils/Sorters';
import {
  SampleOptions,
  AlgorithmOptions,
  SoundOptions,
  SortOptionButton,
} from './Input';

interface Block {
  value: number;
  state: 'unsorted' | 'sorted' | 'considering';
}
export type {Block};

function generateNewArray(): Array<Block> {
  let list: Array<Block> = [];
  for (let i = 0; i < 50; i++) {
    list.push({value: Math.random() * 400 + 1, state: 'unsorted'});
  }
  return list;
}

function getSorterFromName(name: string) {
  switch (name) {
    case 'Insertion Sort':
      return insertionSort;
    default:
      return insertionSort;
  }
}

function Visualizer() {
  const [array, setArray] = useState(generateNewArray());

  const svgObject = useRef<Container | null>(null);
  const svg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgObject.current == null) {
      if (svg.current != null) {
        svgObject.current = SVG().addTo('#graphic').size(1000, 500);
      }
    } else {
      svgObject.current.clear();
    }

    const colorMap = new Map<string, string>([
      ['sorted', 'blue'],
      ['considering', 'yellow'],
      ['unsorted', 'red'],
    ]);

    array.forEach((element, i) => {
      let [height, blockStatus] = [element.value, element.state];
      if (svgObject.current != null) {
        svgObject.current
          .rect(10, height)
          .attr({fill: colorMap.get(blockStatus)})
          .move(15 * i, 0);
      }
    });
  });

  const sortArray = (algorithmName: string) => {
    let sorter = getSorterFromName(algorithmName);
    sorter(array.slice(), setArray);
  };

  return (
    <div id='visualizer'>
      <SoundOptions />
      {/* <SampleOptions className='mb-3' handleClick={setSortAlgorithm} /> */}
      <AlgorithmOptions className='d-flex mb-3' handleClick={sortArray} />
      <SortOptionButton
        className='mb-3'
        text='Make New Array'
        handleClick={() => setArray(generateNewArray())}
      />
      <div id='graphic' ref={svg} />
    </div>
  );
}
export default Visualizer;
