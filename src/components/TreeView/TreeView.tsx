'use client';

import { useEffect, useRef, useState } from 'react';
import type { Node } from './TreeView.types';
import TreeNode from './TreeNode';
import { type } from '../../../.next/types/routes';

const defaultIcons = {
  toggle: { open: '+', close: '-' },
  leaf: ['♦', '♣', '♠', '♥'],
};

const TreeView = () => {
  const [useCheckBox, setUseCheckBox] = useState(false);

  const data: Node[] = [
    {
      id: 'coisa1',
      label: 'Level 1',
      checkbox: false,
      icon: defaultIcons,
      defaultState: false,
      children: [
        {
          id: 'algo1',
          label: 'Level 2',
          defaultState: false,
          icon: { toggle: { open: '📁', close: '🗀' }, leaf: defaultIcons.leaf },
          children: [{ id: 'algoTeste', label: 'Level 3' }],
        },
        { id: 'algo2', label: 'Level 2' },
        { id: 'algo3', label: 'Level 2' },
      ],
    },
    {
      id: 'coisa2',
      label: 'Level 1',
      icon: { toggle: { open: '☻', close: '☺' } },
      defaultState: true,
      checkbox: true,
      children: [
        { id: 'algo4', label: 'Level 2' },
        { id: 'algo5', label: 'Level 2' },
        { id: 'algo6', label: 'Level 2' },
      ],
    },
  ];
  const randomNumber = Math.random() * 1000;
  return (
    <div key={`tree-view-${randomNumber}`} className={'tree-view'}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} htmlFor="useCheckBox">
        Usar checkbox?{' '}
        <input
          className="tree-view__node-checkbox"
          name="useCheckBox"
          title={useCheckBox ? 'Desmarcar' : 'Marcar'}
          checked={useCheckBox}
          id="useCheckBox"
          type="checkbox"
          onChange={(e) => setUseCheckBox(e.target.checked)}
        />
      </label>

      <h1>Tree View</h1>
      {data.map((node: Node, index: number) => (
        <TreeNode
          key={`${randomNumber}-${index}-${node.id}`}
          isUsingCheckbox={useCheckBox}
          {...node}
        />
      ))}
    </div>
  );
};

export default TreeView;
