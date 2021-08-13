import type {
  Block,
  MergeSortState,
  InsertionSortState,
} from '../components/Visualizer';

function insertionSort(
  array: Block[],
  state: InsertionSortState
  // state?: {curr: number; next: number; done: boolean} | null
): {array: Block[]; state: InsertionSortState} {
  if (state == null) {
    return {array: array, state: {curr: 0, next: 1, done: false}};
  }

  if (state.curr === 0) {
    if (state.next >= array.length) {
      array[state.curr].state = 'sorted';
      return {array: array, state: {curr: state.curr, next: 0, done: true}};
    } else {
      array[state.curr].state = 'sorted';
      array[state.next].state = 'considering';
      return {
        array: array,
        state: {curr: state.next, next: state.next + 1, done: false},
      };
    }
  }

  if (array[state.curr].value < array[state.curr - 1].value) {
    [array[state.curr].value, array[state.curr - 1].value] = [
      array[state.curr - 1].value,
      array[state.curr].value,
    ];
    [array[state.curr].state, array[state.curr - 1].state] = [
      'sorted',
      'considering',
    ];
    return {
      array: array,
      state: {curr: state.curr - 1, next: state.next, done: false},
    };
  } else {
    if (state.next >= array.length) {
      array[state.curr].state = 'sorted';
      return {array: array, state: {curr: state.curr, next: 0, done: true}};
    } else {
      array[state.curr].state = 'sorted';
      array[state.next].state = 'considering';
      return {
        array: array,
        state: {curr: state.next, next: state.next + 1, done: false},
      };
    }
  }
}
export {insertionSort};

function mergeSortTest(a: number[], start: number, end: number) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSortTest(a, start, mid);
    mergeSortTest(a, mid + 1, end);
    merge(a, start, mid, end);
  }

  function merge(a: number[], left: number, m: number, right: number) {
    let tmpLeft: number[] = a
        .slice(left, m + 1)
        .concat(Number.MAX_SAFE_INTEGER),
      tmpRight: number[] = a
        .slice(m + 1, right + 1)
        .concat(Number.MAX_SAFE_INTEGER);

    let [i, j] = [0, 0];
    for (let curr = left; curr <= right; curr++) {
      if (tmpLeft[i] < tmpRight[j]) {
        a[curr] = tmpLeft[i];
        i++;
      } else {
        a[curr] = tmpRight[j];
        j++;
      }
    }
  }
}
export {mergeSortTest};

function mergeSort(
  a: Block[],
  state: MergeSortState
  // state?: {width: number; left: number; done: boolean}
): {array: Block[]; state: MergeSortState} {
  let oldState = {...state};
  if (state.width < a.length) {
    if (state.left < a.length) {
      let right = Math.min(state.left + (state.width * 2 - 1), a.length - 1);

      let mid = Math.floor((state.left + right) / 2);

      if (state.width > Math.floor(a.length / 2)) {
        mid = right - (a.length % state.width);
      }

      merge(a, state.left + 0, mid, right);

      return {
        array: a.slice(),
        state: {
          width: state.width,
          left: state.left + state.width * 2,
          done: false,
        },
      };
    } else {
      return {
        array: a.slice(),
        state: {width: oldState.width * 2, left: 0, done: false},
      };
    }
  }
  return {array: a.slice(), state: {width: 0, left: 0, done: true}};
}
export {mergeSort};

function merge(a: Block[], left: number, mid: number, right: number) {
  // let tmpLeft: Block[] = a
  //     .slice(left, mid + 1)
  //     .concat({value: Number.MAX_SAFE_INTEGER, state: 'sorted'}),
  //   tmpRight: Block[] = a
  //     .slice(mid + 1, right + 1)
  //     .concat({value: Number.MAX_SAFE_INTEGER, state: 'sorted'});

  let tmpLeft = a.slice(left, mid + 1).map((obj) => obj.value),
    tmpRight = a.slice(mid + 1, right + 1).map((obj) => obj.value);

  tmpLeft.push(Number.MAX_SAFE_INTEGER);
  tmpRight.push(Number.MAX_SAFE_INTEGER);

  console.log(left, mid, right);
  console.log(tmpLeft, tmpRight);

  let [i, j] = [0, 0];
  for (let curr = left; curr <= right; curr++) {
    if (tmpLeft[i] < tmpRight[j]) {
      a[curr].value = tmpLeft[i];
      i++;
    } else {
      a[curr].value = tmpRight[j];
      j++;
    }
  }
}
