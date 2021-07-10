import React from 'react';
import {render, screen} from '@testing-library/react';
import {insertionSort} from '../utils/Sorters';
import '@testing-library/jest-dom';

interface Block {
  value: number;
  state: 'unsorted' | 'sorted' | 'considering';
}

type InsertionOption = {
  array: Block[];
  curr: number;
  next: number;
};

type TestTuple = {
  input: InsertionOption;
  expected: InsertionOption;
};

describe('insertion sort', () => {
  let array: Block[] = [
    {value: 1, state: 'unsorted'},
    {value: 3, state: 'unsorted'},
    {value: 2, state: 'unsorted'},
    {value: 4, state: 'unsorted'},
    {value: 5, state: 'unsorted'},
  ];
  let curr = 0;
  let next = 1;
  while (true) {
    let resp = insertionSort(array, curr, next);
    [array, curr, next] = [resp.array, resp.curr, resp.next];
    console.log(array, curr, next);
    if (resp.next === 0) {
      break;
    }
  }

  test.each<TestTuple>([
    {
      input: {
        array: [
          {value: 5, state: 'unsorted'},
          {value: 4, state: 'unsorted'},
          {value: 3, state: 'unsorted'},
          {value: 2, state: 'unsorted'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 0,
        next: 1,
      },
      expected: {
        array: [
          {value: 5, state: 'sorted'},
          {value: 4, state: 'considering'},
          {value: 3, state: 'unsorted'},
          {value: 2, state: 'unsorted'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 1,
        next: 2,
      },
    },
    {
      input: {
        array: [
          {value: 5, state: 'sorted'},
          {value: 4, state: 'considering'},
          {value: 3, state: 'unsorted'},
          {value: 2, state: 'unsorted'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 1,
        next: 2,
      },
      expected: {
        array: [
          {value: 4, state: 'considering'},
          {value: 5, state: 'sorted'},
          {value: 3, state: 'unsorted'},
          {value: 2, state: 'unsorted'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 0,
        next: 2,
      },
    },
    {
      input: {
        array: [
          {value: 3, state: 'sorted'},
          {value: 4, state: 'sorted'},
          {value: 5, state: 'sorted'},
          {value: 2, state: 'considering'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 3,
        next: 4,
      },
      expected: {
        array: [
          {value: 3, state: 'sorted'},
          {value: 4, state: 'sorted'},
          {value: 2, state: 'considering'},
          {value: 5, state: 'sorted'},
          {value: 1, state: 'unsorted'},
        ],
        curr: 2,
        next: 4,
      },
    },
    {
      input: {
        array: [
          {value: 1, state: 'considering'},
          {value: 2, state: 'sorted'},
          {value: 3, state: 'sorted'},
          {value: 4, state: 'sorted'},
          {value: 5, state: 'sorted'},
        ],
        curr: 0,
        next: 5,
      },
      expected: {
        array: [
          {value: 1, state: 'sorted'},
          {value: 2, state: 'sorted'},
          {value: 3, state: 'sorted'},
          {value: 4, state: 'sorted'},
          {value: 5, state: 'sorted'},
        ],
        curr: 0,
        next: 0,
      },
    },
  ])('executes next step', ({input, expected}) => {
    expect(insertionSort(input.array, input.curr, input.next)).toEqual({
      array: expected.array,
      curr: expected.curr,
      next: expected.next,
    });
  });
});
