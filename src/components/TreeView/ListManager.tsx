import React, { Fragment, useEffect, useRef, useState } from 'react';

import type { Node } from './TreeView.types';

const ListManager = ({
  id,
  label,
  icon,
  defaultState,
  children,
  ...props
}: Node) => {
  const ref = useRef<HTMLLIElement>(null);
  const [expanded, setExpanded] = useState<boolean>(defaultState ?? false);
  const handleClick = () => setExpanded((prev) => !prev);
  const randomNumber = Math.random() * 1000;
  console.log(props.height);
  const height = useRef(props.height ?? 0);

  function getTotalHeight(element: HTMLElement): number {
    height.current += element.scrollHeight; 

    const children = element.querySelectorAll('[data-expanded="true"]');
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        height.current += child.scrollHeight;
      }
    });

    return height.current;
  }

  useEffect(() => {
    if (ref.current) {
      const totalHeight = expanded
        ? getTotalHeight(ref.current)
        : 0;
      ref.current.style.maxHeight = `${totalHeight}px`;
    }
  }, [expanded]);

  return (
    <ul
      className="tree-view__list"
      key={`ul-${randomNumber}-${id}`}
      
    >
      <li
        onClick={handleClick}
        className="tree-view__list-label"
        key={`title-${randomNumber}-${id}`}
      >
        <div
          className={`tree-view__list-expandable-icon-${
            expanded ? 'open' : 'close'
          }`}
          data-expanded={expanded}
        ></div>
        <div className="tree-view__list-icon">{icon?.[expanded ? 1 : 0]}</div>
        <p>{label}</p>
      </li>

      <li
        ref={ref}
        className={'tree-view__list-children-container'}
        data-expanded={expanded}
      >
        {
          // expanded &&
          children &&
            children.map((node: Node, index: number) => (
              <Fragment key={`children-${randomNumber}-${index}-${node.label}`}>
                <ListManager
                  key={`${randomNumber}-${index}-${node.id}`}
                  height={height.current}
                  {...node}
                />
              </Fragment>
            ))
        }
      </li>
    </ul>
  );
};

export default ListManager;
