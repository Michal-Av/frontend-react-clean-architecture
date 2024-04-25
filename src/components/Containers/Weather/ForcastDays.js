import React, { useState, useEffect } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { getSelectUnstyledUtilityClass } from '@mui/base';
import { useTranslation } from "react-i18next";


export default function ForcastDaysComp(props) {

  const [day, setDay] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const weekday = [t("Sunday"), t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday")];
    const d = new Date(props.day?.date);
    let name = weekday[d.getDay()];
    setDay(name);
    console.log(props.day?.day.avgtemp_c);
  }, [])

  return (
    <div className="card col-sm-12">
      <img src={props.day?.day.condition.icon} alt="N1" />
      <br></br>
      {day} <br></br>
      {props.day?.day.avgtemp_c}° C
    </div>
  )

}