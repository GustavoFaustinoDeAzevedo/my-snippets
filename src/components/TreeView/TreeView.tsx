'use client';

import ListManager from './ListManager';
import type { Node } from './TreeView.types';

const defaultIcons = {
  toggle: { open: '📁', close: '🗀' },
  leaf: ['♦', '♣', '♠', '♥'],
};

const inputTypes = ['checkbox', 'radio', 'none'];

const TreeView = () => {
  const data: Node[] = [
    {
      id: 'coisa1',
      label: 'Level 1',
      inputType: inputTypes[3],
      icon: defaultIcons,
      defaultState: false,
      children: [
        {
          id: 'algo1',
          label: 'Level 2',
          defaultState: false,
          icon: { toggle: { open: '+', close: '-' }, leaf: defaultIcons.leaf },
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
      inputType: inputTypes[1],
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
      <h1>Tree View</h1>
      {data.map((node: Node, index: number) => (
        <ListManager key={`${randomNumber}-${index}-${node.id}`} {...node} />
      ))}
    </div>
  );
};

export default TreeView;
