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
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean>(defaultState ?? false);
  const handleClick = () => setExpanded((prev) => !prev);
  const [height, setHeight] = useState<string>('0px');
  const randomNumber = Math.random() * 1000;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (expanded) {
      // Expande suavemente
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.opacity = '1';

      // Após a transição, libera maxHeight para não travar conteúdo dinâmico
      const timeout = setTimeout(() => {
        el.style.maxHeight = 'none';
      }, 400);

      return () => clearTimeout(timeout);
    } else {
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.opacity = '1';

      requestAnimationFrame(() => {
        el.style.maxHeight = '0px';
        el.style.opacity = '0';
      });
    }
  }, [expanded]);

  return (
    <div className="tree-view__node" key={`ul-${randomNumber}-${id}`}>
      <div
        onClick={handleClick}
        className="tree-view__node-label"
        key={`title-${randomNumber}-${id}`}
      >
        <div
          className={`tree-view__node-expandable-icon-${
            expanded ? 'open' : 'close'
          }`}
          data-expanded={expanded}
        ></div>
        <div className="tree-view__node-icon">{icon?.[expanded ? 1 : 0]}</div>
        <p>{label}</p>
      </div>

      <div
        ref={ref}
        className={`tree-view__node-children-container ${
          expanded ? 'expanded' : ''
        }`}
      >
        {
          // expanded &&
          children &&
            children.map((node: Node, index: number) => (
              <Fragment key={`children-${randomNumber}-${index}-${node.label}`}>
                <ListManager
                  key={`${randomNumber}-${index}-${node.id}`}
                  {...node}
                />
              </Fragment>
            ))
        }
      </div>
    </div>
  );
};

export default ListManager;
