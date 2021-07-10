import React, {useEffect, useRef} from 'react';
import type {Block} from './Visualizer';
import {Container, SVG} from '@svgdotjs/svg.js';

const colorMap = new Map<string, string>([
  ['sorted', 'blue'],
  ['considering', 'yellow'],
  ['unsorted', 'red'],
]);

function Graphic(props: {array: Array<Block>}) {
  const svgObject = useRef<Container | null>(null);
  const svg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgObject.current == null) {
      if (svg.current != null) {
        svgObject.current = SVG().addTo('#graphic').size(1000, 500);
      }
    } else {
      svgObject.current.clear();
    }

    props.array.forEach((element, i) => {
      let [height, blockStatus] = [element.value, element.state];
      if (svgObject.current != null) {
        svgObject.current
          .rect(10, height)
          .attr({fill: colorMap.get(blockStatus)})
          .move(15 * i, 0);
      }
    });
  });

  return <div id='graphic' ref={svg} />;
}
export {Graphic};
