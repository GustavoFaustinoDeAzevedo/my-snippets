import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

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
  const [collapsed, setCollapsed] = useState<boolean>(
    defaultState ?? ref.current?.style.maxHeight !== '0px'
  );
  const randomNumber = Math.random() * 1000;

  const handleClick = () => setCollapsed((prev) => !prev);

  return (
    <div className="tree-view__node" key={`ul-${randomNumber}-${id}`}>
      <div
        className="tree-view__node-label"
        key={`title-${randomNumber}-${id}`}
      >
        <div onClick={handleClick} className="tree-view__node-toggle">
          {icon?.toggle?.[collapsed ? 'close' : 'open']}
        </div>
        <div
          className={`tree-view__node-expandable-icon-${
            collapsed ? 'open' : 'close'
          }`}
          data-collapsed={collapsed}
        ></div>
        <p>{label}</p>
      </div>

      <div
        ref={ref}
        className={`tree-view__node-children-container 
          ${collapsed ? 'collapsed' : 'hidden'}`}
      >
        {
          // collapsed &&
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
