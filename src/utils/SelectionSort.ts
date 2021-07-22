import React from 'react';
import type {Block} from '../components/Visualizer';

export interface SelectionSortState {
  curr: number;
  prev: number;
  sortedIndex: number;
  minValue: number;
  minIndex: number;
  done: boolean;
}

function swap(a: Block[], indexOne: number, indexTwo: number) {
  [a[indexOne].value, a[indexTwo].value] = [
    a[indexTwo].value,
    a[indexOne].value,
  ];
}

function selectionSort(a: Block[], state: SelectionSortState) {
  if (state.curr >= a.length) {
    if (state.sortedIndex >= a.length - 1) {
      a[state.prev].state = 'sorted';
      a[a.length - 1].state = 'sorted';
      return {array: a, state: {...state, done: true}};
    }

    swap(a, state.sortedIndex + 1, state.minIndex);
    a[state.sortedIndex + 1].state = 'sorted';

    //sometimes the smallest element (minIndex) is the
    //the first element of the unsorted subarray (sortedIndex+1)
    if (state.sortedIndex + 1 !== state.minIndex) {
      a[state.minIndex].state = 'unsorted';
    }

    return {
      array: a,
      state: {
        ...state,
        minValue: Number.MAX_SAFE_INTEGER,
        sortedIndex: state.sortedIndex + 1,
        minIndex: -1,
        prev: a.length - 1,
        curr: state.sortedIndex + 2,
      },
    };
  }

  if (
    !(a[state.prev].state === 'minimum' || a[state.prev].state === 'sorted')
  ) {
    a[state.prev].state = 'unsorted';
  }
  a[state.curr].state = 'considering';
  if (a[state.curr].value <= state.minValue) {
    if (state.minIndex > -1) {
      a[state.minIndex].state = 'unsorted';
    }
    a[state.curr].state = 'minimum';
    return {
      array: a,
      state: {
        ...state,
        prev: state.curr,
        minIndex: state.curr,
        minValue: a[state.curr].value,
        curr: state.curr + 1,
      },
    };
  } else {
    return {
      array: a,
      state: {...state, prev: state.curr, curr: state.curr + 1},
    };
  }
}
export default selectionSort;
