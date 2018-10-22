import React from 'react';
import NavBarz from './Navs';
import Header from './Header';
import HistoryList from './HistoryList';
import toggler from '../assets/css/images/toggler.png';
import notification from '../assets/css/images/notification.png';



const History = () => (
  <div>
    <body className="driver no-date">
      <Header />
      <NavBarz />
      <HistoryList />
    </body>
  </div>

);

export default History;
