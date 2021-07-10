import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('sorter options selectors', () => {
  // test('renders sample options', () => {
  //   render(<App />);
  //   expect(screen.getByText('Organ')).toBeInTheDocument();
  //   expect(screen.getByText('Piano')).toBeInTheDocument();
  //   expect(screen.getByText('Synth')).toBeInTheDocument();
  //   expect(screen.getByText('Flute')).toBeInTheDocument();
  // });
  test('renders algorithm options', () => {
    render(<App />);
    expect(screen.getByText('Merge Sort')).toBeInTheDocument();
    expect(screen.getByText('Radix Sort')).toBeInTheDocument();
    expect(screen.getByText('Insertion Sort')).toBeInTheDocument();
    expect(screen.getByText('Bubble Sort')).toBeInTheDocument();
    expect(screen.getByText('Bucket Sort')).toBeInTheDocument();
  });
  // test('renders sound options', () => {
  //   render(<App />);
  //   expect(screen.getByText('Number of items: ')).toBeInTheDocument();
  //   expect(screen.getByText('Speed: ')).toBeInTheDocument();
  // });
});
