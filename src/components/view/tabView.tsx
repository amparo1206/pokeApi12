import React, { useState } from "react";
import 'devextreme/dist/css/dx.light.css';


interface Tab {
  title: string;
  component: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
}

const TabView = ({tabs}:TabViewProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);
  
    const handleTabClick = (index: number) => {
      setActiveTab(index);
    };
  
    return (
      <div>
        <div className="tab-list">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="tab-content">
          {tabs[activeTab].component}
        </div>
      </div>
    );
  };

export default TabView;
