import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type { Node } from './TreeView.types';

const TreeNode = ({
  id,
  label,
  icon,
  defaultState,
  children,
  checkbox,
  onCheckChange,
  parentChecked,
  isUsingCheckbox,
  ...props
}: Node) => {
  const ref = useRef<HTMLLIElement>(null);
  const [collapsed, setCollapsed] = useState<boolean>(defaultState ?? false);

  const [isChecked, setIsChecked] = useState(false);
  const [childrenChecked, setChildrenChecked] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const values = Object.values(childrenChecked);
  const allChecked = values.length > 0 && values.every(Boolean);
  const isSelfChecked = children?.length ? allChecked : isChecked;

  // Atualiza estado de filhos
  const handleChildCheck = (childId: string, checked: boolean) => {
    setChildrenChecked((prev) => ({
      ...prev,
      [childId]: checked,
    }));
  };

  // Atualiza estado do pai com base nos filhos
  useEffect(() => {
    if (!children?.length || !checkboxRef.current) return;

    const values = Object.values(childrenChecked);
    const allChecked = values.length > 0 && values.every(Boolean);
    const hasSomeChecked = values.some(Boolean);

    checkboxRef.current.indeterminate = hasSomeChecked && !allChecked;
    setIsChecked(allChecked); // Atualiza o estado do pai
  }, [childrenChecked]);

  useEffect(() => {
    if (!children?.length) return;

    setChildrenChecked(
      children.reduce((acc, child) => ({ ...acc, [child.id]: isChecked }), {})
    );
  }, [isChecked]);

  useEffect(() => {
    // Só atualiza se o nó não tiver filhos
    if (!children?.length) {
      setIsChecked(parentChecked ?? false);
      onCheckChange?.(id, parentChecked ?? false);
    }
  }, [parentChecked]);

  // Quando o usuário marca/desmarca este nó
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.indeterminate ? true : e.target.checked;

    setIsChecked(checked);
    setChildrenChecked(
      children?.reduce((acc, child) => ({ ...acc, [child.id]: checked }), {}) ??
        {}
    );
    onCheckChange?.(id, checked);
  };
  const handleClick = () => setCollapsed((prev) => !prev);
  return (
    <ul className="tree-view__node" key={`ul-${id}`}>
      <li className="tree-view__node-leaf" key={`title-${id}`}>
        <div onClick={handleClick} className="tree-view__node-toggle">
          {children && children?.length > 0
            ? icon?.toggle?.[collapsed ? 'close' : 'open']
            : icon?.leaf?.[0] || '•'}
        </div>
        <div
          className={`tree-view__node-expandable-icon-${
            collapsed ? 'open' : 'close'
          }`}
        ></div>
        {isUsingCheckbox && (
          <input
            className="tree-view__node-checkbox"
            title={isSelfChecked ? 'Desmarcar' : 'Marcar'}
            type="checkbox"
            ref={checkboxRef}
            checked={isSelfChecked}
            disabled={!checkbox}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <p>{label}</p>
      </li>

      <li
        ref={ref}
        className={`tree-view__node-children-container 
          ${collapsed ? 'collapsed' : 'hidden'}`}
      >
        {
          // collapsed &&
          children &&
            children.map((node: Node, index: number) => (
              <TreeNode
                key={`children-${index}-${node.id}`}
                checkbox={checkbox}
                onCheckChange={handleChildCheck}
                parentChecked={isChecked}
                isUsingCheckbox={isUsingCheckbox}
                {...node}
              />
            ))
        }
      </li>
    </ul>
  );
};

export default React.memo(TreeNode);
