import React from 'react';
import FontAwesome from 'react-fontawesome';

import Header from './Header.js';

import '../css/SatelliteForm.css';

// ============================================================================

class SatelliteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      satelliteName: ''
    };
    this.satelliteName = null;
    this.confirmClick = this.confirmClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.satelliteNameChange = this.satelliteNameChange.bind(this);
    this.satelliteNameBlur = this.satelliteNameBlur.bind(this);
  }

  confirmClick(event) {
    console.log("confirm");
    this.props.onBlur();
    if(event) event.stopPropagation();
  }

  cancelClick(event) {
    this.setState({
      satelliteName: ''
    });
    this.props.onBlur();
    if(event) event.stopPropagation();
  }

  satelliteNameChange(event) {
    this.setState({satelliteName: event.target.value});
  }

  satelliteNameBlur(event) {
    this.satelliteNameChange(event);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible)
    {
      window.setTimeout(function () { this.satelliteName.focus(); }, 0);
    }
  }

  render() {
    return (
        <div id={this.props.id} className="SatelliteForm" style={{visibility: this.props.visible ? 'visible' : 'hidden'}}>
          <Header id="headerSettings" title="New Satellite" background="#3498DB" />
          <div className="body">
            <div>
              <label htmlFor="satelliteName">Name</label>
              <input type="text" id="satelliteName" name="satelliteName" ref={(input) => { this.satelliteName = input; }} value={this.state.satelliteName} onChange={this.satelliteNameChange} />              
            </div>
            <div>
              <label htmlFor="satelliteDescription">Description</label>
              <input type="text" id="satelliteDescription" name="satelliteDescription" />
            </div>
            <div>
              <label htmlFor="satelliteTLELine1">TLE Line 1</label>
              <input type="text" id="satelliteTLELine1" name="satelliteTLELine1" />
            </div>
            <div>
              <label htmlFor="satelliteTLELine2">TLE Line 2</label>
              <input type="text" id="satelliteTLELine2" name="satelliteTLELine2" />
            </div>
            <div>
              <label htmlFor="satellitePredictionMinutes">Prediction (minutes)</label>
              <input type="number" id="satellitePredictionMinutes" name="satellitePredictionMinutes" />
            </div>
            <div>
              <label htmlFor="satelliteColor">Color</label>
              <input type="color" id="satelliteColor" name="satelliteColor" />
            </div>
            <div>
              <span style={{background: "#27AE60"}}><FontAwesome name="check" onClick={this.confirmClick} /></span>
              <span style={{background: "#E74C3C"}}><FontAwesome name="close" onClick={this.cancelClick} /></span>
            </div>
          </div>  
        </div>
    );
  }

}

// ============================================================================

export default SatelliteForm;