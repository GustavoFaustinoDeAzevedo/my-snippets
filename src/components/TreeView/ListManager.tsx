import React, { Fragment, useState } from 'react';

const ListManager = ({ list, parent }: { list: any; parent: any }) => {
  const [state, setState] = useState<boolean>(true);

  const handleClick = () => setState((prev) => !prev);

  return (
    <ul onClick={handleClick} key={parent} className="list-item">
      <li>{parent}</li>
      {state &&
        list[parent].map((item: any) => (
          <li className="list-children" key={item}>
            {item}
          </li>
        ))}
    </ul>
  );
};

export default ListManager;
