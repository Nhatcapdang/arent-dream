'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component
const Tabs = ({ defaultTab, children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabList component
const TabList = ({ children, className }: TabListProps) => {
  return (
    <div role="tablist" className={cn('w-full h-full', className)}>
      {children}
    </div>
  );
};

// Individual Tab component
const Tab = ({ value, children, className, disabled = false }: TabProps) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative active:-translate-y-[-2px] transition-all duration-100',
        className
      )}
    >
      {children}
    </div>
  );
};

const TabPanels = ({ children, className }: TabPanelsProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const TabPanel = ({ value, children, className }: TabPanelProps) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn(className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
export { Tab, TabList, TabPanel, TabPanels };
