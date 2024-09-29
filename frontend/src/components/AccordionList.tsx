// AccordionList.tsx
import React, { ReactElement, Suspense, lazy, useState } from 'react';
import AccordionItem from './AccordionItem';
import { DynamicObject, EventObj } from '../constants/types';
const EventElement = lazy(()=> import("./eventComponents/eventElement"))

interface AccordionItem{
  name: string;
  children:ReactElement
}






const AccordionList: React.FC<DynamicObject> = ({data,childElement}:DynamicObject) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getComponent=(name:string,data:DynamicObject)=>{
    
    switch(name){
        case "EventElement":
            return <EventElement data={data as EventObj}/>
        break;
        default:
            return <></>

    }
  }

  return (
    <div>
      {data.map((item:EventObj , index:any) => (
      <AccordionItem
      key={index}
      title={item.name}
      content={<Suspense fallback={"loading"}>{getComponent(childElement,item)}</Suspense>}
      expanded={expanded === `panel${index}`}
      onChange={handleChange(`panel${index}`)}
      panelId={`panel${index}`}
    />
      ))}
    </div>
  );
};

export default AccordionList;
