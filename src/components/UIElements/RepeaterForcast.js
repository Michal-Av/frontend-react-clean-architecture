import React from 'react';
import ForcastDaysComp from '../Containers/Weather/ForcastDays';

/**
* repeater on the list from the props and translate it to forcast Card
* load component forcastDays
*/
export default function RepeaterForcast({ nextdays, lang }) {

  let days_items = [];
  if (nextdays && nextdays.length > 0) {
    days_items = nextdays.map((item, index) => (
      <div className="col align-self-center" key={index}>
        <ForcastDaysComp day={item} lang={lang} key={index} />
      </div>
    ));
  }
  return (
    <div className="row">{days_items}</div>
  );
}