'use client';
import './treeView.css';
import ListManager from './ListManager';
import type { Item, TreeList } from './TreeView.types';

const TreeView = () => {
  const list: TreeList = {
    coisa1: {
      text: 'coisa1',
      icon: ['▶', '▼'], // fechado|aberto
      defaultState: false,
      list: {
        algo1: { text: 'algo1' },
        algo2: { text: 'algo2' },
        algo3: { text: 'algo3' },
      },
    },
    coisa2: {
      text: 'coisa2',
      icon: ['+', '-'],
      defaultState: true,
      list: {
        algo1: { text: 'algo1' },
        algo2: { text: 'algo2' },
        algo3: { text: 'algo3' },
      },
    },
  };
  const randomNumber = Math.random() * 1000;
  return (
    <div key={`tree-view-${randomNumber}`} className={'tree-view'!}>
      <h1>Tree View</h1>
      {Object.values(list).map((item: Item, index: number) => (
        <ListManager key={`${randomNumber}-${index}-${item.text}`} {...item} />
      ))}
    </div>
  );
};

export default TreeView;
