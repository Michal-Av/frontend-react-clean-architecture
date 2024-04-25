import React, { useState, useEffect } from 'react';
import AirIcon from '@mui/icons-material/Air';
import { WiHumidity } from "react-icons/wi";
import { WiHot } from "react-icons/wi";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ForcastDays from '../components/Containers/Weather/ForcastDays';
import { addToFavorites } from '../services/api';
import ChartRain from '../components/Chart/ChartRain';
import { useTranslation } from "react-i18next";


export default function CityComp(props) {

  const [currentCity, setCurrentCity] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language'));
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
/**
 * useEffect start when the comp get alive
 * set the data from the father weatherComp
 * and the current language
 */
  useEffect(() => {
    setCurrentCity(props.datacity);
    setCurrentLanguage(props.lang);
    setDescription(props.nextdays[0]?.day?.condition.text);
  }, [])

  /**
 * useEffect start when the lang changed
 * set the current language in hooks
 */
  useEffect(() => {
    setCurrentLanguage(props.lang);
  }, [currentLanguage])

  /**
   * repeater on the list from the props and translate it to forcast Card
   * load component forcastDays
   */
  let days_items = [];
  if (props.nextdays && props.nextdays.length > 0) {
    days_items = props.nextdays.map((item, index) => (
      <div className="col align-self-center" key={index}>
        <ForcastDays day={item} lang={currentLanguage} key={props.langKey} />
      </div>
    ));
  }

/**
 * add city with the current data to the favorite in local server
 */
const addCityFavorites = async () => {
  try {
    if (!props.city || !props.datacity?.location || !props.nextdays) {
      throw new Error('Invalid data structure: Required properties are missing');
    }

    const cityData = {
      name: props.city.name,
      country: props.datacity.location.country,
      date: props.datacity.location.localtime,
      temp_c: props.datacity.current?.temp_c,
      icon: props.datacity.current?.condition?.icon,
      description: props.nextdays[0]?.day?.condition?.text,
      mintemp_c: props.nextdays[0]?.day?.mintemp_c,
      maxtemp_c: props.nextdays[0]?.day?.maxtemp_c,
      feel_like: props.datacity.current?.feelslike_c,
      humidity: props.datacity.current?.humidity,
      wind_kph: props.datacity.current?.wind_kph,
      wind_dir: props.datacity.current?.wind_dir,
      uv: props.datacity.current?.uv
    };

    console.log('cityData:', cityData);

    const response = await addToFavorites(cityData);
    alert('The city added to your favorites');
  } catch (error) {
    console.error('Error adding city to favorites:', error);
  }
};

  return (
    <div className={`city container ${currentLanguage === 'he' ? 'right-align' : ''}`}>
      <div className="row description">
        <div className="col-sm-2">
          {props.datacity.current && (
            <img className="current-icon" src={props.datacity.current.condition?.icon} alt="N1" /> // Check if props.datacity.current exists
          )}
        </div>
        <div className="col ">
          <p className={`tiny-text ${currentLanguage === 'he' ? 'right-align' : ''}`}>
            {props.datacity.location && props.datacity.location.localtime}
          </p>
          <div className="current-text">
            <p className={`${currentLanguage === 'he' ? 'right-align' : ''}`} style={{ fontSize: '50px' }}>
              {t(props.city.name)} {props.datacity.current && props.datacity.current.temp_c}°</p>
          </div>
          <div className="row">
            <div className="col">

              <div className="current-subtext">
                <p className="tiny-text">
                  {props.nextdays && t(props.nextdays[0]?.day?.condition.text)}< br />
                  {props.nextdays && props.nextdays[0]?.day?.mintemp_c}°-{props.nextdays && props.nextdays[0]?.day?.maxtemp_c}°
                  <br></br>
                  {t("Feels-like")} {props.datacity.current && props.datacity.current.feelslike_c}°</p>
              </div>
            </div>
            <div className="col"></div>
            <div className="current-subtext">
              <p className="tiny-text">
                <WiHumidity /> {t("humidity")}: {props.datacity.current && props.datacity.current.humidity}%
                <br />
                <AirIcon /> {t("Wind")}: {props.datacity.current && props.datacity.current.wind_kph} km/h {props.datacity.current && props.datacity.current.wind_dir}
                <br />
                <WiHot /> {t("uv")}: {props.datacity.current && props.datacity.current.uv}
              </p>
            </div>
          </div>
        </div>

        <div className="left col">
          <Button className='button' onClick={addCityFavorites} endIcon={<FavoriteIcon sx={{ fontSize: 35 }} />}>
            {t("addfavor")}
          </Button>
        </div>
      </div>
      <br></br>
      <div className="next-days">
        <div className="row">{days_items}</div>
      </div>
      <div className='graph-chance-rain'>
        {(localStorage.getItem('language') === 'en') && <ChartRain days={props.nextdays} lang={currentLanguage} />
        }
      </div>
    </div >
  );
}