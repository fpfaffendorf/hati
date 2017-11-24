import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';

import Header from './components/Header.js';
import Settings from './components/Settings.js';
import Satellite from './components/Satellite.js';
import GroundStation from './components/GroundStation.js';
import Footer from './components/Footer.js';

// ============================================================================

class App extends React.Component {

  constructor(props) {
    super(props);
    this.headerSettingsActionClick = this.headerSettingsActionClick.bind(this); 
    this.headerSatellitesBodyClick = this.headerSatellitesBodyClick.bind(this); 
    this.headerGroundStationsBodyClick = this.headerGroundStationsBodyClick.bind(this); 
    this.state = {settingsVisible: false, satellitesVisible: false};
  }

  headerSettingsActionClick()
  {
    this.setState({settingsVisible: !this.state.settingsVisible});
  }

  headerSatellitesBodyClick()
  {
    this.setState({satellitesVisible: !this.state.satellitesVisible});
  }

  headerGroundStationsBodyClick()
  {
    this.setState({groundStationsVisible: !this.state.groundStationsVisible});
  }

  render() {    
    return (
        <div>
          <Header id="headerSettings" title="hati.space" background="#2C3E50" actionIcon="cog" actionClick={this.headerSettingsActionClick} />
            <Settings id="settings" visible={this.state.settingsVisible} />          
          <Header id="headerSatellites" title="Satellites" background="#3498DB" actionIcon="plus" bodyClick={this.headerSatellitesBodyClick} />
            <Satellite id="satellite1" visible={this.state.satellitesVisible} name="ISS" description="International Space Station" color="#E74C3C" tle1="1 25544U 98067A   17325.60009263  .00002709  00000-0  48044-4 0  9996" tle2="2 25544  51.6412 333.5923 0004264 138.5938  11.3472 15.54195017 86237" />
            <Satellite id="satellite2" visible={this.state.satellitesVisible} name="Hubble" description="Hubble Space Telescope" color="#27AE60" tle1="1 20580U 90037B   17324.72339730  .00000720  00000-0  33347-4 0  9998" tle2="2 20580 028.4704 053.0516 0002957 058.9513 076.0770 15.08923964313861" />
          <Header id="headerGroundStations" title="Ground stations" background="#3498DB" actionIcon="plus" bodyClick={this.headerGroundStationsBodyClick} />
            <GroundStation id="groundStation1" visible={this.state.groundStationsVisible} name="Wilde, Avellaneda" description="Ground Station Wilde" lat="-34.701747" long="-58.3205107" height="0.5" color="#8E44AD" />
          <Header id="headerCommands" title="Commands" background="#3498DB" actionIcon="plus" />
          <Header id="headerParameters" title="Parameters" background="#3498DB" actionIcon="plus" />
          <Footer id="footer0" title="hati.space 2017 | mobile satellite mission control - v0.0.4" background="#2C3E50" />
        </div>
      );
  }

}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

