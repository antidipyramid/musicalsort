import React from 'react';
import type {Block} from '../components/Visualizer';

export interface QuickSortState {
  partitioning: boolean;
  curr: number;
  prev: number;
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
        prev: state.low,
        curr: state.low,
        lowBound: state.low - 1,
      },
    };
  }

  a[state.pivot].state = 'pivot';

  if (state.prev > state.lowBound) {
    a[state.prev].state = 'presorted high';
  }
  // a[state.prev].state = 'presorted high';
  if (state.curr !== state.pivot) {
    a[state.curr].state = 'considering';
  }

  if (state.curr >= state.high) {
    //we've reached our pivot, swap and we're done
    swap(a, state.high, state.lowBound + 1);
    a[state.lowBound + 1].state = 'sorted';

    if (state.lowBound + 1 != state.high) {
      a[state.high].state = 'presorted high';
    } else {
      a[state.high].state = 'presorted low';
    }

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
    a[state.lowBound + 1].state = 'presorted low';
    return {
      array: a,
      state: {
        ...state,
        stack: [...state.stack],
        lowBound: state.lowBound + 1,
        prev: state.curr,
        curr: state.curr + 1,
      },
    };
  }

  return {
    array: a,
    state: {
      ...state,
      stack: [...state.stack],
      prev: state.curr,
      curr: state.curr + 1,
    },
  };
}

function quickSort(a: Block[], state: any) {
  if (state.partitioning) {
    return partition(a, state);
  }

  a.slice(state.low, state.high + 1).forEach((x, i) =>
    i + state.low !== state.pivot
      ? (x.state = 'presorted')
      : (x.state = 'sorted')
  );

  let stackAddition = [];
  if (state.pivot > state.low + 1) {
    stackAddition.push(state.low, state.pivot - 1);
  } else {
    a[state.low].state = 'sorted';
  }

  if (state.pivot < state.high - 1) {
    stackAddition.push(state.pivot + 1, state.high);
  } else {
    a[state.high].state = 'sorted';
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
