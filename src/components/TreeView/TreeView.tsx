'use client';
import './treeView.css';
import ListManager from './ListManager';

const TreeView = () => {
  const list = {
    parent1: ['coisa', 'coisa2'],
    parent2: ['coisa'],
    parent3: ['coisa', 'coisa2', 'coisa3'],
    parent4: ['coisa', 'coisa2', 'coisa3', 'coisa4', 'coisa5'],
  };
  return (
    <div className={'tree-view'!}>
      <h1>Tree View</h1>
      {Object.keys(list).map((parent: any) => (
        <ListManager key={parent} parent={parent} list={list} />
      ))}
    </div>
  );
};

export default TreeView;
