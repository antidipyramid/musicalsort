import React from 'react';

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

function titleCase(s: string) {
  let done = [];
  for (let word of s.split(' ')) {
    done.push(word[0].toUpperCase().concat(word.slice(1)));
  }

  return done.join(' ');
}

export default function Legend() {
  return (
    <div className='row'>
      {Array.from(colorMap.keys()).map((state) => {
        const marginStyle = {
            'background-color': colorMap.get(state),
            width: '25px',
            height: '25px',
            display: 'inline-block',
            transform: 'translateY(25%)',
            'margin-right': '5px',
            'margin-left': '10px',
          },
          textStyle = {
            display: 'inline-block',
            'margin-right': '20px',
          };

        return (
          <div className='col col-md-6 col-lg-3 text-nowrap'>
            <div style={marginStyle} />
            <div style={textStyle}>{titleCase(state)}</div>
          </div>
        );
      })}
    </div>
  );
}
