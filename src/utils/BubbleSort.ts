import type {Block} from '../components/Visualizer';

export interface BubbleSortState {
  curr: number;
  prev: number;
  swappedOnPrevPass: boolean;
  swappedOnCurrentPass: boolean;
  done: boolean;
}

function bubbleSort(a: Block[], state: BubbleSortState) {
  // go back to the beginning if we've passed the end
  if (state.curr >= a.length) {
    // reset color of last items in array
    a[state.prev].state = 'unsorted';
    return {
      array: a,
      state: {
        curr: 1,
        prev: a.length - 1,
        swappedOnPrevPass: state.swappedOnCurrentPass,
        swappedOnCurrentPass: false,
        done: false,
      },
    };
  }

  // if we didn't swap on the prev round or this is the first
  // pass, keep going, otherwise, we're done
  if (state.curr === 1) {
    if (state.swappedOnPrevPass === false) {
      a.forEach((obj) => (obj.state = 'sorted'));

      return {
        array: a,
        state: {
          curr: 0,
          prev: 0,
          swappedOnPrevPass: false,
          swappedOnCurrentPass: false,
          done: true,
        },
      };
    }
  }

  [a[state.prev].state, a[state.curr - 1].state, a[state.curr].state] = [
    'unsorted',
    'considering',
    'considering',
  ];

  let swap = false;
  if (a[state.curr - 1].value > a[state.curr].value) {
    [a[state.curr - 1].value, a[state.curr].value] = [
      a[state.curr].value,
      a[state.curr - 1].value,
    ];
    swap = true;
  }

  return {
    array: a,
    state: {
      curr: state.curr + 1,
      prev: state.curr - 1,
      swappedOnPrevPass: state.swappedOnPrevPass,
      swappedOnCurrentPass: state.swappedOnCurrentPass ? true : swap,
      done: false,
    },
  };
}
export {bubbleSort};
