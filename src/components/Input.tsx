import React, {ChangeEvent} from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

function SortOptionsPanel() {}
export {SortOptionsPanel};

// function SoundOptions() {
//   return (
//     <div>
//       <Row>
//         <Col>
//           {'Speed:'}
//           <SoundSlider className='ml-3' />
//         </Col>
//         <Col>
//           {'Number of items: '}
//           <Slider value={0} orientation='horizontal' />
//         </Col>
//       </Row>
//     </div>
//   );
// }
// export {SoundOptions};

function AlgorithmOptions(props: {className: string; handleClick: Function}) {
  return (
    <div className={props.className}>
      <SortOptionButton
        text='Insertion Sort'
        className='mr-3 w-100 text-nowrap col-md-3 col-sm-4 col-lg'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Bubble Sort'
        className='mr-3 w-100 text-nowrap col-md-3 col-sm-4 col-lg'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Quicksort'
        className='mr-3 w-100 text-nowrap col-md-3 col-sm-4 col-lg'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Selection Sort'
        className='mr-3 w-100 text-nowrap col-md-3 col-sm-4 col-lg'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Merge Sort'
        className='mr-3 w-100 text-nowrap col-md-3 col-sm-4 col-lg'
        handleClick={props.handleClick}
      />
    </div>
  );
}
export {AlgorithmOptions};

function SampleOptions(props: {className: string; handleClick: Function}) {
  return (
    <div className='d-flex mb-3'>
      <SortOptionButton
        text='Synth'
        className='mr-3 w-100'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Piano'
        className='mr-3 w-100'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Organ'
        className='mr-3 w-100'
        handleClick={props.handleClick}
      />
      <SortOptionButton
        text='Flute'
        className='mr-3 w-100'
        handleClick={props.handleClick}
      />
    </div>
  );
}
export {SampleOptions};

function SortOptionButton(props: {
  className: string;
  text: string;
  handleClick: Function;
}) {
  return (
    <Button
      variant='primary'
      onClick={(e) =>
        props.handleClick((e.target as HTMLInputElement).textContent)
      }
      className={props.className}
    >
      <b>{props.text}</b>
    </Button>
  );
}
export {SortOptionButton};

function SortOptionSlider(props: {label: string}) {}

function SortOptionDropdown(props: {label: string}) {}
