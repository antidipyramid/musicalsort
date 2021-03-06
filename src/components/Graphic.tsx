import React, {ReactChildren, useEffect, useRef} from 'react';
import type {Block} from './Visualizer';
import {Container, SVG} from '@svgdotjs/svg.js';
import * as Tone from 'tone';

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

  useEffect(() => {
    let [svgWidth, svgHeight, offset] = [1110, 350, 5];

    if (svg.current != null) {
      [svgWidth, svgHeight] = [
        svg.current.clientWidth,
        svg.current.clientHeight,
      ];
    }

    let blockWidth;
    if (svgObject.current == null) {
      if (svg.current != null) {
        svgObject.current = SVG().addTo('#graphic').size('100%', '100%');
        svgObject.current.css('transform', 'scale(1,-1)');
        svgObject.current
          .rect(
            Number(svgObject.current.width()),
            Number(svgObject.current.height())
          )
          .attr({'stroke-width': 1, stroke: '#e9ecef', fill: 'none'});

        svgObject.current.id('svg-graphic');
      }
      blockWidth =
        (svgWidth - (props.array.length + 1) * offset) / props.array.length;
    } else {
      svgObject.current.clear();
      svgObject.current.rect(svgWidth, svgHeight).attr({
        'stroke-width': 3,
        stroke: '#e9ecef',
        fill: 'none',
        preserveAspectRatio: 'xMinYMin',
      });
      blockWidth =
        (svgWidth - (props.array.length + 1) * offset) / props.array.length;
    }

    for (let i = 0; i < props.array.length; i++) {
      let [height, blockStatus] = [props.array[i].value, props.array[i].state];
      if (svgObject.current != null) {
        if (i > 0) {
          svgObject.current
            .rect(blockWidth, height - 500)
            .attr({fill: colorMap.get(blockStatus)})
            .move((blockWidth + offset) * i + offset, 0);
        } else {
          svgObject.current
            .rect(blockWidth, height - 500)
            .attr({fill: colorMap.get(blockStatus)})
            .move(offset, 0);
        }
      }
    }
  });

  return <div id='graphic' ref={svg}></div>;
}
export {Graphic};
