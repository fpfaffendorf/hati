import React from 'react';

import Functions from './Functions.js';

import '../css/GroundStation.css';

// ============================================================================

class GroundStation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { windowStatus: 'min' };
    this.bodyClick = this.bodyClick.bind(this); 
  }

  bodyClick() {
    if (this.state.windowStatus === 'min') this.setState({windowStatus: 'max'});
    else this.setState({windowStatus: 'min'});
  }

  render() {
    return (
        <div id={this.props.id} className={'GroundStation ' + (this.state.windowStatus === 'max' ? 'maximized' : '') } style={{display: this.props.visible ? 'block' : 'none'}} onClick={this.bodyClick}>
          <div>
            <h3>{this.props.name}</h3>
            <i>{this.props.description}</i><br />
            <span>Sats: -</span><br />            
            <span>Lat {Functions.humanReadableLatitude(this.props.lat)} | Long {Functions.humanReadableLongitude(this.props.long)} <span className="height">| Hgt {this.props.height + "Km."}</span></span>
          </div>
        </div>  
      );
  }

}

// ============================================================================

export default GroundStation;