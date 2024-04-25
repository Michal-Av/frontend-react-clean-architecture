import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { UpdateFavorite } from '../../../services/api';

export default function UpdateFavorComp(props) {

  const [country, setCountry] = useState("");
  const [temp_c, setTemp_c] = useState("");
  const [description, setDescription] = useState("");
  const [mintemp_c, setMintemp_c] = useState("");
  const [maxtemp_c, setMaxtemp_c] = useState("");
  const [feel_like, setFeel_like] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind_kph, setWind_kph] = useState("");
  const [wind_dir, setWind_dir] = useState("");
  const [uv, setUv] = useState("");
  const { t } = useTranslation();


  useEffect(() => {
    setCountry(props.fav.country);
    setTemp_c(props.fav.temp_c);
    setDescription(props.fav.description);
    setMintemp_c(props.fav.mintemp_c);
    setMaxtemp_c(props.fav.maxtemp_c);
    setFeel_like(props.fav.feel_like);
    setHumidity(props.fav.humidity);
    setWind_kph(props.fav.wind_kph);
    setWind_dir(props.fav.wind_dir);
    setUv(props.fav.uv);


  }, [])


  const customSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      name: props.fav.name,
      country: country,
      date: props.fav.date,
      temp_c: temp_c,
      icon: props.fav.icon,
      description: description,
      mintemp_c: mintemp_c,
      maxtemp_c: maxtemp_c,
      feel_like: feel_like,
      humidity: humidity,
      wind_kph: wind_kph,
      wind_dir: wind_dir,
      uv: uv
    };
    await UpdateFavorite(props.fav._id, obj); // Call updateCity function
    props.callbackUpdate(false)
    window.location = `/favorites`;

  }

  const closefavor = () => {
    props.callbackUpdate(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // Adjust locale as needed
  }

  return (

    <div className="row description">
      <div className="col-sm-2"><p className="tiny-text">
        {formatDate(props.fav.date)}<br></br>
        {props.fav.name}
      </p>
        <img className="favo-icon" src={props.fav.icon} alt="N1" />
      </div>

      <form onSubmit={e => customSubmit(e)} style={{ textAlign: 'left' }}>
        <div>
          <label htmlFor="temp_c">{t("Temp")}:</label>
          <input id="temp_c" value={temp_c} type="text" name="temp_c" onChange={e => setTemp_c(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">{t("Description")} :</label>
          <input id="description" value={description} type="text" name="description" onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="mintemp_c">{t("Mintemp_c")} :</label>
          <input id="mintemp_c" value={mintemp_c} type="text" name="mintemp_c" onChange={e => setMintemp_c(e.target.value)} />
        </div>
        <div>
          <label htmlFor="maxtemp_c">{t("Maxtemp_c")} :</label>
          <input id="maxtemp_c" value={maxtemp_c} type="text" name="maxtemp_c" onChange={e => setMaxtemp_c(e.target.value)} />
        </div>
        <div>
          <label htmlFor="feel_like"> {t("Feels-like")}:</label>
          <input id="feel_like" value={feel_like} type="text" name="feel_like" onChange={e => setFeel_like(e.target.value)} />
        </div>
        <div>
          <label htmlFor="humidity">{t("humidity")}:</label>
          <input id="humidity" value={humidity} type="text" name="humidity" onChange={e => setHumidity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="wind_kph">{t("Wind_kph")}:</label>
          <input id="wind_kph" value={wind_kph} type="text" name="wind_kph" onChange={e => setWind_kph(e.target.value)} />
        </div>
        <div>
          <label htmlFor="wind_dir">{t("Wind_dir")}:</label>
          <input id="wind_dir" value={wind_dir} type="text" name="wind_dir" onChange={e => setWind_dir(e.target.value)} />
        </div>
        <div>
          <label htmlFor="uv">{t("uv")}:</label>
          <input id="uv" value={uv} type="text" name="uv" onChange={e => setUv(e.target.value)} />
        </div>
      </form>

      <div className="favo-right col-sm-3">
        <IconButton className='icon-buttons' onClick={customSubmit} aria-label="send">
          <SendIcon />
        </IconButton>
        <IconButton className='icon-buttons' onClick={closefavor} aria-label="cancel">
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
}