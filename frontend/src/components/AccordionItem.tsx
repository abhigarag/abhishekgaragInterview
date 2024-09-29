// AccordionItem.tsx
import React, { ReactElement } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';


interface AccordionItemProps {
  title: string;
  content: ReactElement;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  panelId: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, expanded, onChange, panelId }) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
