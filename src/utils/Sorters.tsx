import type {Block, StateRef, StateUpdaters} from '../components/Visualizer';

// function insertionSort(array: Array<Block>, start: number) {
//   if (array.length > 0) {
//     array[0].state = 'sorted';
//   }

//   array[start].state = 'considering';

//   if (array[start].value < array[start - 1].value) {
//     let curr = i;
//     if (curr > 0 && array[curr].value < array[curr - 1].value) {
//       [array[curr].value, array[curr - 1].value] = [
//         array[curr - 1].value,
//         array[curr].value,
//       ];

//       [array[curr].state, array[curr - 1].state] = ['sorted', 'considering'];
//       curr--;
//     }
//     array[curr].state = 'sorted';
//   } else {
//     array[i].state = 'sorted';
//   }

//   return array;
// }

function insertionSort(array: Block[], curr: number, next: number) {
  if (curr === 0) {
    if (next >= array.length) {
      array[curr].state = 'sorted';
      return {array: array, curr: curr, next: 0};
    } else {
      array[curr].state = 'sorted';
      array[next].state = 'considering';
      return {array: array, curr: next, next: next + 1};
    }
  }

  if (array[curr].value < array[curr - 1].value) {
    [array[curr].value, array[curr - 1].value] = [
      array[curr - 1].value,
      array[curr].value,
    ];
    [array[curr].state, array[curr - 1].state] = ['sorted', 'considering'];
    return {array: array, curr: curr - 1, next: next};
  } else {
    if (next >= array.length) {
      array[curr].state = 'sorted';
      return {array: array, curr: curr, next: 0};
    } else {
      array[curr].state = 'sorted';
      array[next].state = 'considering';
      return {array: array, curr: next, next: next + 1};
    }
  }
}

export {insertionSort};
