import React from 'react';

interface ViewProps {
  title: string;
}

const Home: React.FC<ViewProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>    
    </div>
  );
};

export default Home;