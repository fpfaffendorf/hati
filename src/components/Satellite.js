import React from 'react';
import satellite from 'satellite.js';
import moment from 'moment';

import Functions from './Functions.js';

import '../css/Satellite.css';

// ============================================================================

class Satellite extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = { lat: 0, 
                   long: 0,
                   height: 0,
                   velocity: 0,
                   canvasBackground: 'url(./worldmap.png)',
                   canvasStatus: 'min',
                   canvasWidth: 180,
                   canvasHeight: 90,
                   windowStatus: 'min' };
    this.computeGeodeticPosition = this.computeGeodeticPosition.bind(this); 
    this.renderSatellitePathAndPosition = this.renderSatellitePathAndPosition.bind(this); 
    this.bodyClick = this.bodyClick.bind(this); 
    this.canvasClick = this.canvasClick.bind(this); 
  }

  computeGeodeticPosition(date) 
  {
    if ((typeof this.props.tle1 !== 'undefined') && (typeof this.props.tle2 !== 'undefined'))
    {
      var satrec = satellite.twoline2satrec(this.props.tle1, this.props.tle2);
      var positionAndVelocity = satellite.propagate(satrec, date);
      var positionEci = positionAndVelocity.position;
      var gmst = satellite.gstimeFromDate(date);
      var positionGd = satellite.eciToGeodetic(positionEci, gmst);
      var velocity = Math.sqrt(Math.pow(positionAndVelocity.velocity.x, 2) + Math.pow(positionAndVelocity.velocity.y, 2) + Math.pow(positionAndVelocity.velocity.z, 2));
      return ({ lat: satellite.degreesLat(positionGd.latitude), 
                long: satellite.degreesLong(positionGd.longitude),
                height: positionGd.height,
                velocity: velocity});      
    }    
  }  

  renderSatellitePathAndPosition() 
  {
    var context = this.canvas.getContext("2d");
    var thisComponent = this;
    var canvasWidth = thisComponent.state.canvasWidth;
    var canvasHeight = thisComponent.state.canvasHeight;
    var halfCanvasWidth = canvasWidth / 2;
    var halfCanvasHeight = canvasHeight / 2;
    var satelliteWidth = thisComponent.state.canvasWidth * 4 / 140;
    var halfSatelliteWidth = satelliteWidth / 2;
    var firstLoop = true;
    var lastLong = 0;
    context.beginPath();
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);    
    for (var minutes = -10; minutes <= 4 * 60; minutes++)
    {
      var positionGd = thisComponent.computeGeodeticPosition(moment().add(minutes, 'minutes').toDate());
      if ((firstLoop) || (positionGd.long < lastLong))
      {
        context.moveTo(halfCanvasWidth + (halfCanvasWidth * positionGd.long / 180),
                     halfCanvasHeight - (halfCanvasHeight * positionGd.lat / 90));
        firstLoop = false;
      }
      context.lineTo(halfCanvasWidth + (halfCanvasWidth * positionGd.long / 180),
                     halfCanvasHeight - (halfCanvasHeight * positionGd.lat / 90));
      if (minutes === -2) {
        minutes = 1;
        firstLoop = true;
      }
      lastLong = positionGd.long;
    }
    var imageSat = new Image();
    imageSat.onload = function() {
      thisComponent.setState (thisComponent.computeGeodeticPosition(new Date()));
      context.drawImage(this, 
                        halfCanvasWidth + (halfCanvasWidth * thisComponent.state.long / 180) - halfSatelliteWidth, 
                        halfCanvasHeight - (halfCanvasHeight * thisComponent.state.lat / 90) - halfSatelliteWidth, 
                        satelliteWidth, 
                        satelliteWidth);
      context.strokeStyle = thisComponent.props.color;
      context.lineWidth = thisComponent.state.canvasStatus === 'min' ? 1 : 2;
      context.stroke();
    }
    imageSat.src = "./cube-sat-ico.png";
  }

  bodyClick(event) {
    if (this.state.windowStatus === 'min') this.setState({windowStatus: 'max'});
    else this.setState({windowStatus: 'min'});
    this.renderSatellitePathAndPosition();
    event.stopPropagation();
  }

  canvasClick(event) {
    if (this.state.canvasStatus === 'min') this.setState({canvasStatus: 'max', canvasWidth: 2000, canvasHeight: 1000});
    else this.setState({canvasStatus: 'min', canvasWidth: 180, canvasHeight: 90});
    setTimeout(this.renderSatellitePathAndPosition, 10);
    event.stopPropagation();
  }

  render() {
    return (
        <div id={this.props.id} className={'Satellite ' + (this.state.windowStatus === 'max' ? 'maximized' : '') } style={{display: this.props.visible ? 'block' : 'none'}} onClick={this.bodyClick}>
          <div className="header">
            <h3>{this.props.name}</h3>
            <i>{this.props.description}</i><br />
            <span>Next Station: -</span><br />
            <span>
              Lat {Functions.humanReadableLatitude(this.state.lat)} | Long {Functions.humanReadableLongitude(this.state.long)}<br />
              Alt {Math.ceil(this.state.height) + " Km"} | Vel { this.state.velocity.toFixed(2) + " Km/s"}
            </span>
          </div>
          <canvas id={"map_" + this.props.id} ref={(input) => { this.canvas = input; }} className={'WorldMap ' + (this.state.canvasStatus === 'max' ? 'maximized' : '')} width={this.state.canvasWidth} height={this.state.canvasHeight} style={{background: this.state.canvasBackground, backgroundSize: '100% 100%'}} onClick={this.canvasClick}></canvas>
          <div className="extended">
            <b>Next Passes (24Hs.)</b>
            
            <table>
              <thead>
                <tr>
                  <th>11/29/2017</th>
                  <th>Wilde, Avellaneda</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>GS</th>
                  <th>Rise</th>
                  <th colSpan="2">Transit</th>
                  <th>Set</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>5:06PM</td>
                  <td>5:06PM</td>
                  <td>34&deg;</td>
                  <td>5:06PM</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>  
    );
  }

  componentDidMount() {
    this.renderSatellitePathAndPosition();
    this.interval = setInterval(this.renderSatellitePathAndPosition, 10000);
  }

}

// ============================================================================

export default Satellite;