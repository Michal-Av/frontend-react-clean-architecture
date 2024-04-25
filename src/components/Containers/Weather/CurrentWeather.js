import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import CurrentWeatherInfo from './CurrentWeatherInfo'
import { addToFavorites } from '../../../services/api';
import ChartRain from '../../Chart/ChartRain';
import { useTranslation } from "react-i18next";
import RepeaterForcast from '../../UIElements/RepeaterForcast';


export default function CurrentWeatherComp(props) {

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
    setDescription(props.nextdays[0]?.day?.condition?.text); // Added optional chaining here
  }, [])
  
  /**
 * useEffect start when the lang changed
 * set the current language in hooks
 */
  useEffect(() => {
    setCurrentLanguage(props.lang);
  }, [currentLanguage])

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
        <CurrentWeatherInfo datacity={props.datacity} city={props.city} nextdays={props.nextdays} lang={currentLanguage} />
        <div className="left col">
          <Button className='button' onClick={addCityFavorites} endIcon={<FavoriteIcon sx={{ fontSize: 35 }} />}>
            {t("addfavor")}
          </Button>
        </div>
      </div>
      <br></br>
      <div className="next-days">
    <RepeaterForcast nextdays={props.nextdays} lang={currentLanguage} />
      </div>
      <div className='graph-chance-rain'>
        {(localStorage.getItem('language') === 'en') && <ChartRain days={props.nextdays} lang={currentLanguage} />}
      </div>
    </div>
  );
}
