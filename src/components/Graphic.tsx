import React, {useEffect, useRef} from 'react';
import type {Block} from './Visualizer';
import {Container, SVG} from '@svgdotjs/svg.js';

const colorMap = new Map<string, string>([
  ['sorted', 'blue'],
  ['considering', 'yellow'],
  ['unsorted', 'red'],
  ['minimum', 'green'],
  ['pivot', 'black'],
  ['presorted', 'steelblue'],
  ['presorted low', 'cyan'],
  ['presorted high', 'hotpink'],
]);

function Graphic(props: {array: Array<Block>}) {
  const svgObject = useRef<Container | null>(null);
  const svg = useRef<HTMLDivElement>(null);

  let [svgWidth, svgHeight, offset] = [800, 500, 5];
  let blockWidth =
    (svgWidth - props.array.length * offset) / props.array.length;
  useEffect(() => {
    if (svgObject.current == null) {
      if (svg.current != null) {
        svgObject.current = SVG().addTo('#graphic').size(svgWidth, svgHeight);
      }
    } else {
      svgObject.current.clear();
    }

    props.array.forEach((element, i) => {
      let [height, blockStatus] = [element.value, element.state];
      if (svgObject.current != null) {
        svgObject.current
          .rect(blockWidth, height)
          .attr({fill: colorMap.get(blockStatus)})
          .move((blockWidth + offset) * i, 0);
      }
    });
  });

  return <div id='graphic' ref={svg} />;
}
export {Graphic};
