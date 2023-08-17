/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import img1 from './assets/img/1.png';
import img2 from './assets/img/2.png';
import img3 from './assets/img/3.png';
import img4 from './assets/img/4.png';
import img5 from './assets/img/5.png';
import img6 from './assets/img/6.png';
import img7 from './assets/img/7.png';
import img8 from './assets/img/8.png';
import img9 from './assets/img/9.png';
import img10 from './assets/img/10.png';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const ImageGrid = ({ data, className, show }) => {
  return (
    <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit={true}>
      <div className={`col-span-${data.col} row-span-${data.row} relative ${className}`}>
        <img src={data.img} alt="" className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 p-1 bg-slate-200">
          {data.img.match(/\d+(?=\.[^.]*$)/)}
        </span>
      </div>
    </CSSTransition>
  );
};

function getTotalRows(gridData) {
  let maxEndRowIndex = 0;

  gridData.forEach(item => {
    const endIndex = item.row + item.col - 1;
    if (endIndex > maxEndRowIndex) {
      maxEndRowIndex = endIndex;
    }
  });

  return maxEndRowIndex;
}

const data = [
  { img: img1, col: 1, row: 2, category: [1, 4] },
  { img: img2, col: 1, row: 2, category: [1, 3] },
  { img: img3, col: 1, row: 1, category: [1, 2] },
  { img: img5, col: 1, row: 2, category: [1, 3] },
  { img: img4, col: 1, row: 1, category: [1, 2, 3] },
  { img: img6, col: 1, row: 2, category: [1, 2] },
  { img: img7, col: 1, row: 1, category: [1, 2] },
  { img: img9, col: 2, row: 1, category: [1, 2] },
  { img: img8, col: 1, row: 1, category: [1, 4] },
  { img: img10, col: 2, row: 1, category: [1, 2] }
];

const App = () => {
  const [images, setImages] = useState(data);
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const calcRows = () => {
    if (!containerRef.current) return;

    const containerComputerStyle = window.getComputedStyle(containerRef.current);
    const nRows = containerComputerStyle.getPropertyValue('grid-template-rows').split(' ').length;
    return nRows;
  };

  const handleClick = category => {
    setSelectedCategory(category);
    // setImages(data.filter(image => category === 1 || image.category.includes(category)));
  };

  console.log({ images });

  return (
    <>
      <button
        className="p-2 bg-blue-500 m-2"
        onClick={() => {
          console.log({ rows: calcRows() });
        }}
      >
        Get rows
      </button>
      <div className="flex gap-2">
        <button className="p-2 bg-blue-500 m-2" onClick={() => handleClick(1)}>
          All
        </button>
        <button className="p-2 bg-blue-500 m-2" onClick={() => handleClick(2)}>
          Second
        </button>
        <button className="p-2 bg-blue-500 m-2" onClick={() => handleClick(3)}>
          Third
        </button>
        <button className="p-2 bg-blue-500 m-2" onClick={() => handleClick(4)}>
          Fourth
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-3xl  transition-all" ref={containerRef}>
        {images.map((item, index) => (
          <ImageGrid
            data={item}
            key={item.img}
            // className={classNames({
            //   hidden: !item.category.includes(selectedCategory)
            // })}
            show={item.category.includes(selectedCategory)}
          />
        ))}
      </div>
      <div className="col-span-1 col-span-2 col-span-3 col-span-4 row-span-1 row-span-2 row-span-3 row-span-4" />
    </>
  );
};

export default App;
