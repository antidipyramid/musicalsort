// @ts-nocheck
import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  Dispatch,
  ChangeEvent,
} from 'react';
import {insertionSort, mergeSort} from '../utils/Sorters';
import {BubbleSortState, bubbleSort} from '../utils/BubbleSort';
import quickSort, {QuickSortState} from '../utils/Quicksort';
import selectionSort, {SelectionSortState} from '../utils/SelectionSort';
import {Graphic} from './Graphic';
import {SampleOptions, AlgorithmOptions, SortOptionButton} from './Input';

import * as Tone from 'tone';

import sample from '../samples/handdrum-loop.mp3';

import Jumbotron from 'react-bootstrap/Jumbotron';
import styled from 'styled-components';

interface Block {
  value: number;
  state:
    | 'unsorted'
    | 'sorted'
    | 'considering'
    | 'minimum'
    | 'pivot'
    | 'presorted'
    | 'presorted low'
    | 'presorted high';
}
export type {Block};

interface MergeSortState {
  width: number;
  left: number;
  done: boolean;
}
export type {MergeSortState};

interface InsertionSortState {
  curr: number;
  next: number;
  done: boolean;
}
export type {InsertionSortState};

interface SorterStates {
  'Insertion Sort': InsertionSortState;
  'Merge Sort': MergeSortState;
  'Bubble Sort': BubbleSortState;
  Quicksort: QuickSortState;
  'Selection Sort': SelectionSortState;
}
type S = keyof SorterStates;

type SorterState =
  | InsertionSortState
  | MergeSortState
  | BubbleSortState
  | QuickSortState
  | SelectionSortState;

type Action =
  | {type: 'update'; name: string; newState: SorterState; newArray: Block[]}
  | {type: 'reset'; name: string; newArray: Block[]}
  | {type: 'size'; newArray: Block[]};

const Hero = styled(Jumbotron)`
  border-bottom-right-radius: 0rem;
  border-bottom-left-radius: 0rem;
  padding: 2rem;
`;

function generateNewArray(size: number): Array<Block> {
  let list: Array<Block> = [];
  for (let i = 0; i < size; i++) {
    list.push({value: Math.random() * (850 - 500) + 500, state: 'unsorted'});
  }
  return list;
}

const initialSorterStates: SorterStates = {
  'Insertion Sort': {curr: 0, next: 1, done: false},
  'Merge Sort': {width: 1, left: 0, done: false},
  'Bubble Sort': {
    curr: 1,
    prev: 0,
    swappedOnPrevPass: true,
    swappedOnCurrentPass: false,
    done: false,
  },
  Quicksort: {
    partitioning: true,
    prev: 0,
    curr: 0,
    pivot: -1,
    high: -1,
    low: 0,
    lowBound: 0,
    stack: [],
    done: false,
  },
  'Selection Sort': {
    curr: 1,
    prev: 0,
    sortedIndex: -1,
    minValue: Number.MAX_SAFE_INTEGER,
    minIndex: -1,
    done: false,
  },
};

function resetSorterStates() {
  return {
    'Insertion Sort': {...initialSorterStates['Insertion Sort']},
    'Merge Sort': {...initialSorterStates['Merge Sort']},
    'Bubble Sort': {...initialSorterStates['Bubble Sort']},
    Quicksort: {...initialSorterStates['Quicksort']},
    'Selection Sort': {...initialSorterStates['Selection Sort']},
  };
}

function getSorterFromName(name: string) {
  switch (name) {
    case 'Insertion Sort':
      return insertionSort;
    case 'Merge Sort':
      return mergeSort;
    case 'Quicksort':
      return quickSort;
    case 'Selection Sort':
      return selectionSort;
    case 'Bubble Sort':
      return bubbleSort;
    default:
      return insertionSort;
  }
}

interface ReducerState extends SorterStates {
  array: Block[];
}

function reducer(state: ReducerState, action: Action): ReducerState {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        array: action.newArray,
        [action.name]: {...action.newState},
      };
    case 'reset':
      return {
        ...state,
        array: action.newArray,
        [action.name]: {...initialSorterStates[action.name as S]},
      };
    case 'size':
      return {
        ...state,
        array: action.newArray,
      };
  }
}

const synth = new Tone.PolySynth(Tone.Synth, {
  envelope: {
    release: 0,
  },
  oscillator: {
    type: 'sine',
  },
}).toDestination();
// synth.triggerAttackRelease(['c4', 'e4', 'a4'], 1);

function Visualizer() {
  const [size, setSize] = useState(25);
  const [userClickedSort, setUserClickedSort] = useState(false);

  const [speed, setSpeed] = useState(10);
  const [currentSorter, setSorter] = useState('Insertion Sort');

  const sorterIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSliderChange = (
    e: ChangeEvent<HTMLInputElement>,
    updater: Function
  ) => {
    updater(Number(e.target.value));
  };

  const handleSortSelect = (sortName: string) => {
    setSorter(sortName);
    setUserClickedSort(true);
  };

  const sorterStateRef = useRef({...initialSorterStates});
  const init = {...initialSorterStates, array: []};
  const [sorterStates, dispatch] = useReducer(reducer, init);

  const resetAllAfterSort = useCallback(() => {
    if (sorterIntervalRef.current) {
      clearInterval(sorterIntervalRef.current);
      setUserClickedSort(false);
      sorterStateRef.current = resetSorterStates();
    }
  }, []);

  useEffect(() => {
    if (!userClickedSort) {
      return;
    }

    let sorter = getSorterFromName(currentSorter);
    sorterIntervalRef.current = setInterval(() => {
      let resp = sorter(sorterStates.array, sorterStates[currentSorter as S]);
      console.log(
        resp.array.map((x) => x.value),
        resp.state
      );
      // synth.triggerAttack('c4');

      let freqsToPlay = resp.array
        .filter((b) => b.state === 'considering' || b.state === 'minimum')
        .map((b) => b.value);

      synth.releaseAll();
      synth.triggerAttackRelease(
        freqsToPlay,
        freqsToPlay.map((f) => 0.1)
      );

      dispatch({
        type: 'update',
        name: currentSorter,
        newState: resp.state,
        newArray: resp.array,
      });

      if (resp.state.done) {
        // synth.triggerRelease();
        resetAllAfterSort();
      }
    }, speed);

    return () => {
      if (sorterIntervalRef.current != null) {
        clearInterval(sorterIntervalRef.current);
        sorterIntervalRef.current = null;
      }
    };
  }, [sorterStates, userClickedSort, currentSorter, speed, resetAllAfterSort]);

  useEffect(() => {
    if (!userClickedSort) {
      dispatch({type: 'size', newArray: generateNewArray(size)});
    }
  }, [size]);

  const reset = useCallback(() => {
    if (sorterIntervalRef.current != null) {
      clearInterval(sorterIntervalRef.current);
      sorterIntervalRef.current = null;
      sorterStateRef.current = {...initialSorterStates};
    }

    dispatch({
      type: 'reset',
      name: currentSorter,
      newArray: generateNewArray(size),
    });

    // synth.triggerRelease();
    setUserClickedSort(false);
  }, [currentSorter, size]);

  return (
    <div id='visualizer'>
      <Hero className='mb-0'>
        {/* <SoundOptions /> */}
        {/* <SampleOptions className='mb-3' handleClick={setSortAlgorithm} /> */}
        <div className='d-flex align-items-center text-nowrap'>
          {'Speed: '}
          <input
            className={'w-100 ml-3 mr-3'}
            type='range'
            value={speed}
            step={1}
            min={1}
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
            max={100}
            onChange={(e) => handleSliderChange(e, setSize)}
          />
        </div>
        <AlgorithmOptions
          className='d-flex mt-3 mb-3'
          handleClick={handleSortSelect}
        />
        <SortOptionButton
          className='btn-danger btn-block'
          text='Make New Array'
          handleClick={reset}
        />
      </Hero>
      <Graphic array={sorterStates.array} />
    </div>
  );
}
export default Visualizer;
