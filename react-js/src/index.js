import React from 'react';
import ReactDOM from 'react-dom';
import satellite from 'satellite.js';
import moment from 'moment';
import './index.css';

// ========================================

class Textbox extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  render() {
    return (
        <div>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input type={this.props.type} id={this.props.id} readOnly={this.props.readOnly === true} 
                 value={this.props.value} defaultValue={this.props.defaultValue} 
                 max={this.props.max} min={this.props.min} />
        </div>
      );
  }
}

// ========================================

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event);
  }

  render() {
    return (
        <div>
          <input type="button" value={this.props.value} onClick={(event) => {this.handleClick(event)}} />
        </div>
      );
  }

}

// ========================================

class WorldMap extends React.Component {

  static WorldMapImageSrc = "./world-equirectangular.jpg";    
  static WorldMapImageWidth = 640;    
  static WorldMapImageHeight = 320;    
  static SatelliteRadius = 10;  
  static SatelliteColor = "red";  
  static SatellitePathRadius = 2;    
  static SatellitePathColor = "green";
  static PredictionMinMinutes = -10;
  static PredictionMaxMinutes = 60;

  renderWorldMapImageOnCanvas() {
    var canvas = document.getElementById(this.props.id);
    var context = canvas.getContext("2d");
    var image = new Image();
    var thisComponent = this;
    image.onload = function() {
      context.drawImage(this, 0, 0);
      thisComponent.renderSatelliteOnCanvas();
      thisComponent.renderSatelliteOrbitPredictionOnCanvas();
    };
    image.src = WorldMap.WorldMapImageSrc;    
  }

  getSatelliteWorldMapXYCoordinates(date, radius)
  {

    var halfWidth = WorldMap.WorldMapImageWidth / 2;
    var halfHeight = WorldMap.WorldMapImageHeight / 2;

    var satrec = satellite.twoline2satrec(this.props.tle1, this.props.tle2);
    var positionAndVelocity = satellite.propagate(satrec, date);
    var positionEci = positionAndVelocity.position;
    var gmst = satellite.gstimeFromDate(date);
    var positionGd = satellite.eciToGeodetic(positionEci, gmst);

    return ({ x: halfWidth + (halfWidth * satellite.degreesLong(positionGd.longitude) / 180) - radius / 2, 
              y: halfHeight - (halfHeight * satellite.degreesLat(positionGd.latitude) / 90) - radius / 2 });

  }

  renderSatelliteOnCanvas() {
    var canvas = document.getElementById(this.props.id);
    var context = canvas.getContext("2d");
    context.beginPath();
    var satelliteWorldMapXYCoordinates = this.getSatelliteWorldMapXYCoordinates(new Date(), WorldMap.SatelliteRadius);
    context.rect(satelliteWorldMapXYCoordinates.x, 
                 satelliteWorldMapXYCoordinates.y, 
                 WorldMap.SatelliteRadius, 
                 WorldMap.SatelliteRadius);    
    context.fillStyle = WorldMap.SatelliteColor;
    context.fill();
  }

  renderSatelliteOrbitPredictionOnCanvas() {
    var canvas = document.getElementById(this.props.id);
    var context = canvas.getContext("2d");
    context.beginPath();   
    for (var minutesShift = WorldMap.PredictionMinMinutes; minutesShift <= WorldMap.PredictionMaxMinutes; minutesShift++)
    {
      var satelliteWorldMapXYCoordinates = this.getSatelliteWorldMapXYCoordinates(moment().add(minutesShift, 'minutes').toDate(), 
                                                                                  WorldMap.SatellitePathRadius);
      context.rect(satelliteWorldMapXYCoordinates.x, 
                   satelliteWorldMapXYCoordinates.y, 
                   WorldMap.SatellitePathRadius, 
                   WorldMap.SatellitePathRadius);         
    }
    context.fillStyle = WorldMap.SatellitePathColor;
    context.fill();
  }

  render() { 
    return (
        <div>
          <canvas id={this.props.id} width={WorldMap.WorldMapImageWidth} height={WorldMap.WorldMapImageHeight}></canvas>
        </div>
      );
  }

  componentDidMount() {
    this.renderWorldMapImageOnCanvas();    
  }

  componentDidUpdate() {
    this.renderWorldMapImageOnCanvas();        
  }  

}

// ========================================

class App extends React.Component {

  static latitudeTextBox;

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = { tle1: '1 25544U 98067A   17323.83488426  .00003772  00000-0  64076-4 0  9995', 
                   tle2: '2 25544  51.6413 342.3930 0004362 132.3714 214.5425 15.54187097 85959' };
  }

  handleButtonClick(event) {
    this.setState({ tle1: document.getElementById('tle1').value, 
                    tle2: document.getElementById('tle2').value });
  }

  render() {    
    return (
        <div>
          <Textbox type="text" id="tle1" label="TLE Line 1" defaultValue={this.state.tle1} />
          <Textbox type="text" id="tle2" label="TLE Line 2" defaultValue={this.state.tle2} />
          <WorldMap id="map1" tle1={this.state.tle1} tle2={this.state.tle2} />
          <Button value="Compute" onClick={this.handleButtonClick} />
        </div>
      );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);