import getConfig from 'next/config';
import { Timeline } from 'primereact/timeline';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';

const TimelineDemo = () => {
  const customEvents = [
    { status: 'Coming Together', date: '2023-01-15', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'The Wrestling Match', date: '2023-01-22', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'The Stein Heist', date: '2023-01-29', icon: 'pi pi-envelope', color: '#FF9800' },
  ];

  const customizedContent = (item) => {
    return (
        <Card title={item.status} subTitle={item.date}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                quas!
            </p>
            <Button label="Read more" className="p-button-text"></Button>
        </Card>
    );
};

  const customizedMarker = (item) => {
    return (
      <span className="custom-marker shadow-1" style={{ backgroundColor: item.color }}>
        <i className={item.icon}></i>
      </span>
    );
  };

  return (
    <div>
      <div className="col-12 ">
        <div className="timeline-demo">
          <h5>Time Line</h5>
          <Timeline 
            value={customEvents}
            // align="alternate"
            opposite={(item) => item.status} 
            content={(item) => <medium className="p-text-secondary">{item.date}</medium>} 
            // content={customizedContent}
            marker={customizedMarker}
            className="customized-timeline"
            />
            
        </div>
      </div>
    </div>
  )
}

export default TimelineDemo