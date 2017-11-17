import React from 'react';
import ReactDOM from 'react-dom';
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
          <input type="number" id={this.props.id} readOnly={this.props.readOnly === true} 
                 onChange={(event) => {this.handleChange(event)}} value={this.props.value} defaultValue={this.props.defaultValue} 
                 max={this.props.max} min={this.props.min} />
        </div>
      );
  }
}

// ========================================

class WorldMap extends React.Component {

  static WorldMapImageSrc = "./world-equirectangular.jpg";    
  static WorldMapImageWidth = 640;    
  static WorldMapImageHeight = 322;    
  static SatelliteRadius = 10;    

  constructor(props) {
    super(props);
  }

  renderWorldMapImageOnCanvas() {
    var canvas = document.getElementById(this.props.id);
    var context = canvas.getContext("2d");
    var image = new Image();
    var thisComponent = this;
    image.onload = function() {
      context.drawImage(this, 0, 0);
      thisComponent.renderSatelliteOnCanvas();
    };
    image.src = WorldMap.WorldMapImageSrc;    
  }

  renderSatelliteOnCanvas() {
    var canvas = document.getElementById(this.props.id);
    var context = canvas.getContext("2d");
    context.beginPath();
    var halfWidth = WorldMap.WorldMapImageWidth / 2;
    var halfHeight = WorldMap.WorldMapImageHeight / 2;
    context.rect(halfWidth + halfWidth * this.props.long / 180 - WorldMap.SatelliteRadius / 2, 
                 halfHeight - halfHeight * this.props.lat / 90 - WorldMap.SatelliteRadius / 2, 
                 WorldMap.SatelliteRadius, WorldMap.SatelliteRadius);    
    context.fillStyle = "red";
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
    this.handleValueChange = this.handleValueChange.bind(this);
    this.state = { lat1: 0, 
                   long1: 0 };
  }

  handleValueChange(event) {
    this.setState({ [event.target.id]: [event.target.value] });
  }

  render() {    
    return (
        <div>
          <Textbox id="lat1" label="Latitude" onChange={this.handleValueChange} defaultValue="0" min="-90" max="90" />
          <Textbox id="long1" label="Longitude" onChange={this.handleValueChange} defaultValue="0" min="-180" max="180" />
          <WorldMap id="map1" lat={this.state.lat1} long={this.state.long1} />
        </div>
      );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);