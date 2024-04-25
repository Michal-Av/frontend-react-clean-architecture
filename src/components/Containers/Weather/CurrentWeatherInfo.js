import React from 'react';
import './../../../App.css'
import AirIcon from '@mui/icons-material/Air';
import { WiHumidity } from "react-icons/wi";
import { WiHot } from "react-icons/wi";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";

export default function CurrentWeatherInfo({ datacity, city, nextdays, lang }) {
  const { t } = useTranslation();

  return (
    <div className='row desc'>
    <div className="col-sm-2">
      {datacity.current && (
        <img className="current-icon" src={datacity.current.condition?.icon} alt="N1" /> // Check if datacity.current exists
      )}
      </div>
      <div className="col ">
      <p className={`tiny-text ${lang === 'he' ? 'right-align' : ''}`}>
        {datacity.location && datacity.location.localtime}
      </p>
      <div className="current-text">
        <p className={`${lang === 'he' ? 'right-align' : ''}`} style={{ fontSize: '50px' }}>
          {t(city.name)} {datacity.current && datacity.current.temp_c}°</p>
      </div>
      <div className="row">
        <div className="col">
          <div className="current-subtext">
            <p className="tiny-text">
              {nextdays && t(nextdays[0]?.day?.condition.text)}< br />
              {nextdays && nextdays[0]?.day?.mintemp_c}°-{nextdays && nextdays[0]?.day?.maxtemp_c}°
              <br></br>
              {t("Feels-like")} {datacity.current && datacity.current.feelslike_c}°</p>
          </div>
        </div>
        
        <div className="current-subtext">
          <p className="tiny-text">
            <WiHumidity /> {t("humidity")}: {datacity.current && datacity.current.humidity}%
            <br />
            <AirIcon /> {t("Wind")}: {datacity.current && datacity.current.wind_kph} km/h {datacity.current && datacity.current.wind_dir}
            <br />
            <WiHot /> {t("uv")}: {datacity.current && datacity.current.uv}
          </p>
        </div>
      
      </div>
    </div>
    </div>
  );
}
