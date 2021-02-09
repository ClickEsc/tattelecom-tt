import React from 'react';
import telIcon from '../images/tel-icon.png';
import emailIcon from '../images/email-icon.png';
import './User.css';
import { UserContext } from '../contexts/UserContext.js';

function User(props) {
  const user = React.useContext(UserContext);

  return (
    <li className="user">
      <h2 className="user__username">{user.username}</h2>
      <p className="user__name">Имя: {user.name}</p>
      <p className="user__city">Город: {user.address.city}</p>
      <p className="user__company">Компания: {user.company.name}</p>
      <div className="user__contacts">
        <p className="user__website">{user.website}</p>
        <img className="user__phone-icon" src={telIcon} alt="Иконка телефона"/>
        <p className="user__phone">{user.phone}</p>
        <img className="user__email-icon" src={emailIcon} alt="Иконка электронного почтового ящика" />
        <p className="user__email">{user.email}</p>
      </div>
    </li>
  );
}

export default User;