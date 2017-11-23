import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';

import Header from './components/Header.js';
import Satellite from './components/Satellite.js';
import GroundStation from './components/GroundStation.js';
import Footer from './components/Footer.js';

// ============================================================================

class App extends React.Component {

  render() {    
    return (
        <div>
          <Header id="header0" title="hati.space" background="#2C3E50" actionIcon="cog" />
          <Header id="header1" title="Satellites" background="#3498DB" actionIcon="plus" />
            <Satellite id="satellite1" name="ISS" description="International Space Station" color="#E74C3C" tle1="1 25544U 98067A   17325.60009263  .00002709  00000-0  48044-4 0  9996" tle2="2 25544  51.6412 333.5923 0004264 138.5938  11.3472 15.54195017 86237" />
            <Satellite id="satellite2" name="Hubble" description="Hubble Space Telescope" color="#27AE60" tle1="1 20580U 90037B   17324.72339730  .00000720  00000-0  33347-4 0  9998" tle2="2 20580 028.4704 053.0516 0002957 058.9513 076.0770 15.08923964313861" />
          <Header id="header2" title="Commands" background="#3498DB" actionIcon="plus" />
          <Header id="header3" title="Parameters" background="#3498DB" actionIcon="plus" />
          <Header id="header4" title="Ground stations" background="#3498DB" actionIcon="plus" />
            <GroundStation id="groundStation1" name="Wilde, Avellaneda" description="Ground Station Wilde" lat="-34.701747" long="-58.3205107" height="0.5" color="#8E44AD" />
          <Footer id="footer0" title="developed by Federico Pfaffendorf" background="#2C3E50" />
        </div>
      );
  }

}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

