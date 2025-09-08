'use client';

import ListManager from './ListManager';
import type { Node } from './TreeView.types';

const TreeView = () => {
  const data: Node[] = [
    {
      id: 'coisa1',
      label: 'coisa1',
      icon: ['▶', '▼'],
      defaultState: false,
      children: [
        {
          id: 'algo1',
          label: 'algo1',
          defaultState: false,
          icon: ['+', '-'],
          children: [{ id: 'algo1', label: 'algo1' }],
        },
        { id: 'algo2', label: 'algo2' },
        { id: 'algo3', label: 'algo3' },
      ],
    },
    {
      id: 'coisa2',
      label: 'coisa2',
      icon: ['☻', '☺'],
      defaultState: true,
      children: [
        { id: 'algo4', label: 'algo4' },
        { id: 'algo5', label: 'algo5' },
        { id: 'algo6', label: 'algo6' },
      ],
    },
  ];
  const randomNumber = Math.random() * 1000;
  return (
    <div key={`tree-view-${randomNumber}`} className={'tree-view'}>
      <h1 className="text-2xl text-zinc-900 dark:text-zinc-100">Tree View</h1>
      {data.map((node: Node, index: number) => (
        <ListManager key={`${randomNumber}-${index}-${node.id}`} {...node} />
      ))}
    </div>
  );
};

export default TreeView;
