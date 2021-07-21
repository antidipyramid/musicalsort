import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Visualizer from '../components/Visualizer';
import quickSort from '../utils/Quicksort';
import QuickSortState from '../utils/Quicksort';
import {Block} from '../components/Visualizer';

describe('quick sort', () => {
  let array: Block[] = [
    {value: 8, state: 'unsorted'},
    {value: 8, state: 'unsorted'},
    {value: 0, state: 'unsorted'},
    {value: 25, state: 'unsorted'},
    {value: 14, state: 'unsorted'},
    {value: 1, state: 'unsorted'},
    {value: 0, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 15, state: 'unsorted'},
    {value: 9, state: 'unsorted'},
    {value: 7, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
    {value: 14, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
  ];
  let state: any = {
    partitioning: true,
    curr: 0,
    pivot: -1,
    high: array.length - 1,
    low: 0,
    lowBound: 0,
    stack: [],
    done: false,
  };

  while (true) {
    let resp = quickSort(array, state);
    [array, state] = [resp.array, resp.state];
    console.log(array, state);
    if (state.done) {
      break;
    }
  }
  console.log(array);

  test('dummy', () => expect('string').toEqual('string'));
});
