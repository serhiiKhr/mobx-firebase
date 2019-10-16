import * as React from 'react';

// Types
import { ITabs, ITab, ITabName } from './types';

// Styles
import './styles.css';

export const Tab: React.FC<ITab> = ({ children }) => {
  return (
    <div className="app-tabs--item">
      { children }
    </div>
  )
};

export const Tabs: React.FC<ITabs> = ({ children, activeTabKey, tabNames, onTabClick }) => {

  return (
    <section className="app-tabs">
      <header className="app-tabs--header">
        { tabNames.map((tab: ITabName, i) =>
          <div key={i} className={`app-tabs--header__item ${activeTabKey === tab.key ? 'active' : ''}`} onClick={() => { onTabClick(tab.key) }}>{tab.name}</div>
        )}
      </header>
      { children }
    </section>
  )
};
