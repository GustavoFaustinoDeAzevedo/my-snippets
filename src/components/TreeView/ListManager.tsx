import React, { useState } from 'react';

import type { Item } from './TreeView.types';

const ListManager = ({ text, icon, list, defaultState, ...props }: Item) => {
  const [expanded, setExpanded] = useState<boolean>(defaultState ?? false);
  const handleClick = () => setExpanded((prev) => !prev);
  const randomNumber = Math.random() * 1000;
  return (
    <ul key={`ul-${randomNumber}-${text}`}>
      <li onClick={handleClick} key={`title-${randomNumber}-${text}`}>
        {icon?.[expanded ? 1 : 0]} {text}
      </li>
      {expanded &&
        list &&
        Object.values(list).map((item: Item, index: number) => (
          <li
            key={`children-${randomNumber}-${index}-${item.text}`}
            className="list-children"
          >
            <ListManager {...item}>{item.text}</ListManager>
          </li>
        ))}
    </ul>
  );
};

export default ListManager;
