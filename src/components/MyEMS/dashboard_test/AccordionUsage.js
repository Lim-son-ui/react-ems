import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';

import Gauge_chart2_volt from './Gauge_chart2_volt';
import Gauge_chart2_current from './Gauge_chart2_current';
import Gauge_chart2_power from './Gauge_chart2_power';

function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#7B7B7B', color: 'white'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          電壓 Volt (V)
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#003D79'}}>
          <Gauge_chart2_volt/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#7B7B7B', color: 'white'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          電流 Current (A)
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#003D79'}}>
          <Gauge_chart2_current/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#7B7B7B', color: 'white'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          功率 Power (kw)
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#003D79'}}>
          <Gauge_chart2_power/>
        </AccordionDetails>
      </Accordion>

      {/* <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion> */}
    </div>
  );
}

export default AccordionUsage;