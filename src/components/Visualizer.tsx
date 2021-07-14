import React from 'react';
import {
  Dispatch,
  useState,
  useEffect,
  useReducer,
  useRef,
  ChangeEvent,
  MutableRefObject,
} from 'react';
import {insertionSort, mergeSort} from '../utils/Sorters';
import {BubbleSortState, bubbleSort} from '../utils/BubbleSort';
import {Graphic} from './Graphic';
import {SampleOptions, AlgorithmOptions, SortOptionButton} from './Input';

interface Block {
  value: number;
  state: 'unsorted' | 'sorted' | 'considering';
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
};

type SorterState = InsertionSortState | MergeSortState | BubbleSortState;

// type SorterName = 'Insertion Sort' | 'Merge Sort';

type Action =
  | {type: 'update'; name: string; newState: SorterState}
  | {type: 'reset'};

// type InsertionSort = (
//   a: Block[],
//   state: InsertionSortState
// ) => {array: Block[]; state: InsertionSortState};
// type MergeSort = (
//   a: Block[],
//   state: MergeSortState
// ) => {array: Block[]; state: MergeSortState};

function generateNewArray(size: number): Array<Block> {
  let list: Array<Block> = [];
  for (let i = 0; i < size; i++) {
    list.push({value: Math.random() * 400 + 1, state: 'unsorted'});
  }
  return list;
}

function getSorterFromName(
  name: string
):
  | ((
      a: Block[],
      state: InsertionSortState
    ) => {array: Block[]; state: InsertionSortState})
  | ((
      a: Block[],
      state: MergeSortState
    ) => {array: Block[]; state: MergeSortState}) {
  switch (name) {
    case 'Insertion Sort':
      return insertionSort;
    case 'Merge Sort':
      return mergeSort;
    default:
      return insertionSort;
  }
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
};

function resetSorterStates() {
  return {
    'Insertion Sort': {...initialSorterStates['Insertion Sort']},
    'Merge Sort': {...initialSorterStates['Merge Sort']},
    'Bubble Sort': {...initialSorterStates['Bubble Sort']},
  };
}

// function reducer(state: SorterStates, action: Action): SorterStates {
//   switch (action.type) {
//     case 'update':
//       // console.log(state[action.name]);
//       console.log({...state, [action.name]: action.newState});
//       return {...state, [action.name]: {...action.newState}};
//     case 'reset':
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

  // const [sortStates, sortStatesDispatch] = useReducer(
  //   reducer,
  //   initialSorterStates
  // );

  const speedRef = useRef(10);
  // const sorterStateRef = useRef<InsertionSortState | MergeSortState | null>(
  //   null
  // );
  const sorterIntervalRef = useRef<NodeJS.Timeout>();

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

  // const sortArray = (algorithmName: SorterName) => {
  //   if (sorterIntervalRef.current != null) {
  //     return;
  //   }

  //   // let sorter = getSorterFromName(algorithmName);
  //   // let sorterState: SorterState = sortStates[algorithmName];

  //   console.log(array);
  // };

  useEffect(() => {
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
      } else {
        resp = mergeSort(array.slice(), sorterStateRef.current['Merge Sort']);
        sorterStateRef.current['Merge Sort'] = {
          ...resp.state,
        };
        console.log(sorterStateRef.current['Merge Sort']);
      }

      // console.log(sortStates[algorithmName]);
      console.log(resp.state);
      // let resp = sorter(array.slice(), sorterState);
      setArray(resp.array);
      // sortStatesDispatch({
      //   type: 'update',
      //   name: currentSorter,
      //   newState: resp.state,
      // });
      // console.log(sortStates['Merge Sort']);

      if (resp.state.done) {
        if (sorterIntervalRef.current) {
          clearInterval(sorterIntervalRef.current);
          setUserClickedSort(false);
          // sortStatesDispatch({type: 'reset'});
          sorterStateRef.current = resetSorterStates();
          console.log(array);
        }
      }
      // sorterStateRef.current = resp.state;
    }, speedRef.current);

    return () => {
      if (sorterIntervalRef.current) {
        clearInterval(sorterIntervalRef.current);
        setUserClickedSort(false);
      }
    };
  }, [userClickedSort]);

  const reset = () => {
    if (sorterIntervalRef.current != null) {
      clearInterval(sorterIntervalRef.current);
      sorterStateRef.current = {...initialSorterStates};
    }

    setArray(generateNewArray(size));
    setUserClickedSort(false);
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
      <AlgorithmOptions
        className='d-flex mb-3'
        handleClick={handleSortSelect}
      />
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
