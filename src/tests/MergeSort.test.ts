import React from 'react';
import {render, screen} from '@testing-library/react';
import {mergeSort} from '../utils/Sorters';
import '@testing-library/jest-dom';

import type {MergeSortState} from '../componenets/Visualizer';
import Visualizer from '../components/Visualizer';

interface Block {
  value: number;
  state: 'unsorted' | 'sorted' | 'considering';
}

type MergeSortOption = {
  array: Block[];
  state: MergeSortState;
};

type TestTuple = {
  input: MergeSortOption;
  expected: MergeSortOption;
};

describe('merge sort', () => {
  let array: Block[] = [
    {value: 1, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
    {value: 2, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
    {value: 1, state: 'unsorted'},
    {value: 1, state: 'unsorted'},
    {value: 1, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
    {value: 2, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
    {value: 2, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
    {value: 2, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
  ];
  let state = {width: 1, left: 0, done: false};
  while (true) {
    let resp = mergeSort(array, state);
    [array, state] = [resp.array, resp.state];
    if (state.done) {
      break;
    }
  }
  console.log(array, state);

  test('dummy', () => expect('string').toEqual('string'));

  // test.each<TestTuple>([
  //   {
  //     input: {
  //       array: [
  //         {value: 5, state: 'unsorted'},
  //         {value: 4, state: 'unsorted'},
  //         {value: 3, state: 'unsorted'},
  //         {value: 2, state: 'unsorted'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 0,
  //       next: 1,
  //     },
  //     expected: {
  //       array: [
  //         {value: 5, state: 'sorted'},
  //         {value: 4, state: 'considering'},
  //         {value: 3, state: 'unsorted'},
  //         {value: 2, state: 'unsorted'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 1,
  //       next: 2,
  //     },
  //   },
  //   {
  //     input: {
  //       array: [
  //         {value: 5, state: 'sorted'},
  //         {value: 4, state: 'considering'},
  //         {value: 3, state: 'unsorted'},
  //         {value: 2, state: 'unsorted'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 1,
  //       next: 2,
  //     },
  //     expected: {
  //       array: [
  //         {value: 4, state: 'considering'},
  //         {value: 5, state: 'sorted'},
  //         {value: 3, state: 'unsorted'},
  //         {value: 2, state: 'unsorted'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 0,
  //       next: 2,
  //     },
  //   },
  //   {
  //     input: {
  //       array: [
  //         {value: 3, state: 'sorted'},
  //         {value: 4, state: 'sorted'},
  //         {value: 5, state: 'sorted'},
  //         {value: 2, state: 'considering'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 3,
  //       next: 4,
  //     },
  //     expected: {
  //       array: [
  //         {value: 3, state: 'sorted'},
  //         {value: 4, state: 'sorted'},
  //         {value: 2, state: 'considering'},
  //         {value: 5, state: 'sorted'},
  //         {value: 1, state: 'unsorted'},
  //       ],
  //       curr: 2,
  //       next: 4,
  //     },
  //   },
  //   {
  //     input: {
  //       array: [
  //         {value: 1, state: 'considering'},
  //         {value: 2, state: 'sorted'},
  //         {value: 3, state: 'sorted'},
  //         {value: 4, state: 'sorted'},
  //         {value: 5, state: 'sorted'},
  //       ],
  //       curr: 0,
  //       next: 5,
  //     },
  //     expected: {
  //       array: [
  //         {value: 1, state: 'sorted'},
  //         {value: 2, state: 'sorted'},
  //         {value: 3, state: 'sorted'},
  //         {value: 4, state: 'sorted'},
  //         {value: 5, state: 'sorted'},
  //       ],
  //       curr: 0,
  //       next: 0,
  //     },
  //   },
  // ])('executes next step', ({input, expected}) => {
  //   expect(mergeSort(input.array, input.curr, input.next)).toEqual({
  //     array: expected.array,
  //     curr: expected.curr,
  //     next: expected.next,
  //   });
  // });
});
