import type {Block, StateRef, StateUpdaters} from '../components/Visualizer';

async function insertionSort(array: Array<Block>) {
  if (array.length > 0) {
    array[0].state = 'sorted';
  }

  for (let i = 1; i < array.length; i++) {
    array[i].state = 'considering';

    if (array[i].value < array[i - 1].value) {
      let curr = i;
      while (curr > 0 && array[curr].value < array[curr - 1].value) {
        [array[curr].value, array[curr - 1].value] = [
          array[curr - 1].value,
          array[curr].value,
        ];

        [array[curr].state, array[curr - 1].state] = ['sorted', 'considering'];
        curr--;
      }
      array[curr].state = 'sorted';
    } else {
      array[i].state = 'sorted';
    }
  }

  return array;
}
export {insertionSort};
