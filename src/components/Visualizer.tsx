import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MutableRefObject,
} from 'react';
import {insertionSort} from '../utils/Sorters';
import {Graphic} from './Graphic';
import {SampleOptions, AlgorithmOptions, SortOptionButton} from './Input';

interface Block {
  value: number;
  state: 'unsorted' | 'sorted' | 'considering';
}
export type {Block};

interface StateRef {
  speed: MutableRefObject<number>;
  sortStatus: MutableRefObject<string>;
}
export type {StateRef};

interface StateUpdaters {
  updateSpeed: Function;
  updateSortStatus: Function;
  updateArray: Function;
}
export type {StateUpdaters};

function generateNewArray(size: number): Array<Block> {
  let list: Array<Block> = [];
  for (let i = 0; i < size; i++) {
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
  const [array, setArray] = useState(generateNewArray(25));
  const [size, setSize] = useState(25);
  const [sortStatus, setSortStatus] = useState('idle');

  const [speed, setSpeed] = useState(10);

  const speedRef = useRef(10);
  const sortStatusRef = useRef('idle');

  const handleSliderChange = (
    e: ChangeEvent<HTMLInputElement>,
    updater: Function
  ) => {
    updater(Number(e.target.value));
    speedRef.current = speed;
  };

  const sortArray = (algorithmName: string) => {
    let sorter = getSorterFromName(algorithmName);
    sorter(array.slice());
  };

  const reset = () => {
    setSortStatus('idle');
    setArray(generateNewArray(size));
  };

  return (
    <div id='visualizer'>
      {/* <SoundOptions /> */}
      {/* <SampleOptions className='mb-3' handleClick={setSortAlgorithm} /> */}
      {'Speed: '}
      <input
        className={'w-100 ml-3'}
        type='range'
        value={speed}
        step={1}
        min={10}
        max={500}
        onChange={(e) => handleSliderChange(e, setSpeed)}
      />
      {'Size of array: '}
      <input
        className={'w-100 ml-3'}
        type='range'
        value={size}
        step={1}
        min={5}
        max={50}
        onChange={(e) => handleSliderChange(e, setSize)}
      />
      <AlgorithmOptions className='d-flex mb-3' handleClick={sortArray} />
      <SortOptionButton
        className='mb-3'
        text='Make New Array'
        handleClick={reset}
      />
      <Graphic array={array} />
    </div>
  );
}
export default Visualizer;
