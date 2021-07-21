import React from 'react';
import type {Block} from '../components/Visualizer';

export interface QuickSortState {
  partitioning: boolean;
  curr: number;
  pivot: number;
  high: number;
  low: number;
  lowBound: number;
  stack: number[];
  done: boolean;
}

function swap(a: Block[], indexOne: number, indexTwo: number) {
  [a[indexOne].value, a[indexTwo].value] = [
    a[indexTwo].value,
    a[indexOne].value,
  ];
}

function partition(a: Block[], state: any) {
  // check if we have a pivot, if not make it high index
  if (state.pivot === -1) {
    return {
      array: a,
      state: {
        ...state,
        stack: [...state.stack],
        pivot: state.high,
        curr: state.low,
        lowBound: state.low - 1,
      },
    };
  }

  if (state.curr >= state.high) {
    //we've reached our pivot, swap and we're done
    swap(a, state.high, state.lowBound + 1);
    return {
      array: a,
      state: {
        ...state,
        stack: [...state.stack],
        pivot: state.lowBound + 1,
        partitioning: false,
      },
    };
  }

  if (a[state.curr].value <= a[state.pivot].value) {
    swap(a, state.curr, state.lowBound + 1);
    return {
      array: a,
      state: {
        ...state,
        stack: [...state.stack],
        lowBound: state.lowBound + 1,
        curr: state.curr + 1,
      },
    };
  }

  return {
    array: a,
    state: {
      ...state,
      stack: [...state.stack],
      curr: state.curr + 1,
    },
  };
}

function quickSort(a: Block[], state: any) {
  if (state.partitioning) {
    return partition(a, state);
  }

  let stackAddition = [];
  if (state.pivot > state.low) {
    stackAddition.push(state.low, state.pivot - 1);
  }

  if (state.pivot < state.high) {
    stackAddition.push(state.pivot + 1, state.high);
  }

  if (state.stack.length + stackAddition.length < 1) {
    return {
      array: a,
      state: {
        ...state,
        done: true,
      },
    };
  }

  let high, low;
  if (state.stack.length >= 2) {
    [high, low] = [state.stack.pop(), state.stack.pop()];
  } else {
    [high, low] = [stackAddition.pop(), stackAddition.pop()];
  }
  return {
    array: a,
    state: {
      ...state,
      high: high,
      low: low,
      stack: state.stack.concat(stackAddition),
      partitioning: true,
      pivot: -1,
    },
  };
}
export default quickSort;
