import React, { useState, useEffect } from 'react';
import UpdateFavorComp from './UpdateFavorite';
import AirIcon from '@mui/icons-material/Air';
import { WiHumidity } from "react-icons/wi";
import { WiHot } from "react-icons/wi";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from "react-i18next";

function FavoriteComp(props) {
  const [favorites, setfavorites] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('he');

  const { t } = useTranslation();
  // Function to format date string to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // Adjust locale as needed
  }

  const updatefavor = () => {
    setUpdated(true)
  }

  const closefavor = () => {
    setUpdated(false)
  }

  const deletefavor = () => {
    let id = props.favorite._id;
    console.log(id)
    props.callbackDelete(id);
  }

  return (
    <div>
      {updated ? (<UpdateFavorComp fav={props.favorite}
        callbackUpdate={data => closefavor(data)} />)
        :
        (<div className="row">
          <div className="col-sm-2"><p className="tiny-text">
            {formatDate(props.favorite.date)}
          </p>
            <img className="favo-icon" src={props.favorite.icon} alt="N1" />
          </div>
          <div className="col">

            <div className="favo-text">
              <p style={{ fontSize: '40px' }}>{t(props.favorite.name)} {props.favorite.temp_c}°</p>
            </div>
            <div className="row">
              <div className="col-sm-5">

                <div className="favo-subtext">
                  <p className={`tiny-favo-text ${currentLanguage === 'he' ? 'right-align' : ''}`}>
                    {t(props.favorite.description)}<br />
                    {props.favorite.mintemp_c}°-{props.favorite.maxtemp_c}°
                    <br></br>
                    {t("Feels-like")} {props.favorite.feel_like}°.</p>
                </div>
              </div>
              <div className="col"></div>
              <div className="favo-subtext">
                <p className={`tiny-favo-text ${currentLanguage === 'he' ? 'right-align' : ''}`}>
                  <WiHumidity /> {t("humidity")}: {props.favorite.humidity}%
                  <br />
                  <AirIcon /> {t("Wind")}: {props.favorite.wind_kph} km/h {props.favorite.wind_dir}
                  <br />
                  <WiHot /> {t("uv")} {props.favorite.uv}
                </p>
              </div>
            </div>
          </div>

          <div className="favo-left col-sm-2">

            <IconButton className='icon-buttons' onClick={updatefavor} aria-label="edit">
              <EditIcon />
            </IconButton><br></br>
            <IconButton className='icon-buttons' onClick={deletefavor} aria-label="delete">
              <DeleteIcon />
            </IconButton>

          </div>
        </div>)}
    </div>
  )
}

export default FavoriteComp;

