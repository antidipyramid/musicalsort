import React, {ReactChildren, useEffect, useRef} from 'react';
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

  let [svgWidth, svgHeight, offset] = [1110, 350, 5];
  let blockWidth =
    (svgWidth - (props.array.length + 1) * offset) / props.array.length;

  useEffect(() => {
    if (svgObject.current == null) {
      if (svg.current != null) {
        svgObject.current = SVG().addTo('#graphic').size(svgWidth, svgHeight);
        svgObject.current.css('transform', 'scale(1,-1)');
        svgObject.current
          .rect(svgWidth, svgHeight)
          .attr({'stroke-width': 1, stroke: '#e9ecef', fill: 'none'});
      }
    } else {
      svgObject.current.clear();
      svgObject.current
        .rect(svgWidth, svgHeight)
        .attr({'stroke-width': 3, stroke: '#e9ecef', fill: 'none'});
    }

    props.array.forEach((element, i) => {
      let [height, blockStatus] = [element.value, element.state];
      if (svgObject.current != null) {
        if (i > 0) {
          svgObject.current
            .rect(blockWidth, height)
            .attr({fill: colorMap.get(blockStatus)})
            .move((blockWidth + offset) * i + offset, 0);
        } else {
          svgObject.current
            .rect(blockWidth, height)
            .attr({fill: colorMap.get(blockStatus)})
            .move(offset, 0);
        }
      }
    });
  });

  return <div id='graphic' ref={svg}></div>;
}
export {Graphic};
