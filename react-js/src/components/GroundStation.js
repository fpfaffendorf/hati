import React from 'react';

import Functions from './Functions.js';

import '../css/GroundStation.css';

// ============================================================================

class GroundStation extends React.Component {

  render() {
    return (
        <div id={this.props.id} className="GroundStation">
          <img src="./ground-station-ico.png" alt={this.props.name} style={ {backgroundColor: this.props.color} } width="60" height="60" />
          <div>
            <h3>{this.props.name}</h3>
            <i>{this.props.description}</i><br />
            <span>Lat: {Functions.humanReadableLatitude(this.props.lat)} | Long: {Functions.humanReadableLongitude(this.props.long)} <span className="height">| Height: {this.props.height + "Km."}</span></span>
          </div>
        </div>  
      );
  }

}

// ============================================================================

export default GroundStation;