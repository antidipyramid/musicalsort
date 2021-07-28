import React from 'react';
import {useState, useEffect, useRef, ChangeEvent} from 'react';
import {insertionSort, mergeSort} from '../utils/Sorters';
import {BubbleSortState, bubbleSort} from '../utils/BubbleSort';
import quickSort, {QuickSortState} from '../utils/Quicksort';
import selectionSort, {SelectionSortState} from '../utils/SelectionSort';
import {Graphic} from './Graphic';
import {SampleOptions, AlgorithmOptions, SortOptionButton} from './Input';

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

type SorterStates = {
  'Insertion Sort': {curr: number; next: number; done: boolean};
  'Merge Sort': {width: number; left: number; done: boolean};
  'Bubble Sort': {
    curr: number;
    prev: number;
    swappedOnPrevPass: boolean;
    swappedOnCurrentPass: boolean;
    done: boolean;
  };
  Quicksort: QuickSortState;
  'Selection Sort': SelectionSortState;
};

type SorterState =
  | InsertionSortState
  | MergeSortState
  | BubbleSortState
  | QuickSortState
  | SelectionSortState;

type Action =
  | {type: 'update'; name: string; newState: SorterState}
  | {type: 'reset'};

const Hero = styled(Jumbotron)`
  border-bottom-right-radius: 0rem;
  border-bottom-left-radius: 0rem;
  padding: 2rem;
`;

function generateNewArray(size: number): Array<Block> {
  let list: Array<Block> = [];
  for (let i = 0; i < size; i++) {
    list.push({value: Math.random() * 300 + 1, state: 'unsorted'});
  }
  return list;
}

// function getSorterFromName(
//   name: string
// ):
//   | ((
//       a: Block[],
//       state: InsertionSortState
//     ) => {array: Block[]; state: InsertionSortState})
//   | ((
//       a: Block[],
//       state: MergeSortState
//     ) => {array: Block[]; state: MergeSortState}) {
//   switch (name) {
//     case 'Insertion Sort':
//       return insertionSort;
//     case 'Merge Sort':
//       return mergeSort;
//     default:
//       return insertionSort;
//   }
// }

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

// function reducer(state: SorterStates, action: Action): SorterStates {
//   switch (action.type) {
//     case 'update':
//       // console.log(state[action.name]);
//       console.log({...state, [action.name]: action.newState});
//       return {...state, [action.name]: {...action.newState}};
//     case 'reset'
//
//       return {
//         'Insertion Sort': {curr: 0, next: 1, done: false},
//         'Merge Sort': {width: 1, left: 0, done: false},
//       };
//     default:
//       return initialSorterStates;
//   }
// }

function Visualizer() {
  const [array, setArray] = useState(generateNewArray(25));
  const [size, setSize] = useState(25);
  const [userClickedSort, setUserClickedSort] = useState(false);

  const [speed, setSpeed] = useState(10);
  const [currentSorter, setSorter] = useState('Insertion Sort');

  const speedRef = useRef(10);
  const sorterIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSliderChange = (
    e: ChangeEvent<HTMLInputElement>,
    updater: Function
  ) => {
    updater(Number(e.target.value));
    speedRef.current = speed;
  };

  const handleSortSelect = (sortName: string) => {
    setSorter(sortName);
    setUserClickedSort(true);
  };

  const sorterStateRef = useRef({...initialSorterStates});

  const resetAllAfterSort = () => {
    if (sorterIntervalRef.current) {
      clearInterval(sorterIntervalRef.current);
      setUserClickedSort(false);
      // sortStatesDispatch({type: 'reset'});
      sorterStateRef.current = resetSorterStates();
    }
  };

  useEffect(() => {
    console.log(userClickedSort);
    console.log(sorterIntervalRef.current);
    if (!userClickedSort) {
      return;
    }

    sorterIntervalRef.current = setInterval(() => {
      let resp;
      if (currentSorter === 'Insertion Sort') {
        resp = insertionSort(
          array.slice(),
          sorterStateRef.current['Insertion Sort']
        );
        sorterStateRef.current['Insertion Sort'] = {...resp.state};
      } else if (currentSorter === 'Bubble Sort') {
        resp = bubbleSort(array.slice(), sorterStateRef.current['Bubble Sort']);
        sorterStateRef.current['Bubble Sort'] = {...resp.state};
      } else if (currentSorter === 'Quicksort') {
        if (sorterStateRef.current['Quicksort'].high === -1) {
          resp = quickSort(array.slice(), {
            ...sorterStateRef.current['Quicksort'],
            high: array.length - 1,
          });
        } else {
          resp = quickSort(array.slice(), sorterStateRef.current['Quicksort']);
        }
        sorterStateRef.current['Quicksort'] = {
          ...resp.state,
          stack: [...resp.state.stack],
        };
      } else if (currentSorter === 'Selection Sort') {
        resp = selectionSort(
          array.slice(),
          sorterStateRef.current['Selection Sort']
        );
        sorterStateRef.current['Selection Sort'] = {...resp.state};
      } else {
        resp = mergeSort(array.slice(), sorterStateRef.current['Merge Sort']);
        sorterStateRef.current['Merge Sort'] = {
          ...resp.state,
        };
        console.log(sorterStateRef.current['Merge Sort']);
      }
      setArray(resp.array);

      if (resp.state.done) {
        resetAllAfterSort();
      }
    }, speed);

    return () => {
      if (sorterIntervalRef.current != null) {
        clearInterval(sorterIntervalRef.current);
        sorterIntervalRef.current = null;
      }
    };
  }, [userClickedSort, speed]);

  useEffect(() => {
    if (!userClickedSort) {
      setArray(generateNewArray(size));
    }
  }, [size]);

  const reset = () => {
    if (sorterIntervalRef.current != null) {
      clearInterval(sorterIntervalRef.current);
      sorterIntervalRef.current = null;
      sorterStateRef.current = {...initialSorterStates};
    }

    setArray(generateNewArray(size));
    setUserClickedSort(false);
  };

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
            min={10}
            max={500}
            onChange={(e) => handleSliderChange(e, setSpeed)}
          />
          {'Size of array: '}
          {/* <p className='text-nowrap'>Size of array: </p> */}
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
      <Graphic array={array} />
    </div>
  );
}
export default Visualizer;
