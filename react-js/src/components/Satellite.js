import React from 'react';
import satellite from 'satellite.js';

import Functions from './Functions.js';

import '../css/Satellite.css';

// ============================================================================

class Satellite extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lat: 0, 
                   long: 0,
                   height: 0,
                   windowStatus: 'min' };
    this.bodyClick = this.bodyClick.bind(this); 
  }

  computeGeodeticPosition() 
  {
    var lat = 0;
    var long = 0;
    var height = 0;
    if ((typeof this.props.tle1 !== 'undefined') && (typeof this.props.tle2 !== 'undefined'))
    {
      var date = new Date();
      var satrec = satellite.twoline2satrec(this.props.tle1, this.props.tle2);
      var positionAndVelocity = satellite.propagate(satrec, date);
      var positionEci = positionAndVelocity.position;
      var gmst = satellite.gstimeFromDate(date);
      var positionGd = satellite.eciToGeodetic(positionEci, gmst);
      lat = satellite.degreesLat(positionGd.latitude);
      long = satellite.degreesLong(positionGd.longitude);
      height = positionGd.height;
    }
    return ({ lat: lat, 
              long: long,
              height: height });      
  }

  updateGeodeticPosition()
  {
    var gp = this.computeGeodeticPosition();
    this.setState({lat: gp.lat, 
                   long: gp.long, 
                   height: gp.height});
  }

  renderWorldMapImageOnCanvas() {
    var canvas = document.getElementById("map_" + this.props.id);
    var context = canvas.getContext("2d");
    var image = new Image();
    var thisComponent = this;
    context.beginPath();    
    image.onload = function() {
      context.drawImage(this, 0, 0, 140, 74);
      context.rect(70 + (70 * thisComponent.state.long / 180) - 2,
                   37 - (37 * thisComponent.state.lat / 90) - 2, 
                   4, 
                   4);
      context.fillStyle = thisComponent.props.color;
      context.fill();
    };
    image.src = "./world-equirectangular.jpg"; 
  }

  bodyClick() {
    if (this.state.windowStatus === 'min') this.setState({windowStatus: 'max'});
    else this.setState({windowStatus: 'min'});
  }

  render() {
    return (
        <div id={this.props.id} className={'Satellite ' + (this.state.windowStatus === 'max' ? 'maximized' : '') } style={{display: this.props.visible ? 'block' : 'none'}} onClick={this.bodyClick}>
          <img src="./cube-sat-ico.png" alt={this.props.name} style={ {backgroundColor: this.props.color} } width="60" height="60" />
          <div>
            <h3>{this.props.name}</h3>
            <i>{this.props.description}</i><br />
            <span>Next Station: -</span><br />
            <span>Lat: {Functions.humanReadableLatitude(this.state.lat)} | Long: {Functions.humanReadableLongitude(this.state.long)} <span className="height">| Height: {Math.ceil(this.state.height) + "Km."}</span></span>
          </div>
          <canvas id={"map_" + this.props.id} width="140" height="74"></canvas>
        </div>  
      );
  }

  componentDidMount() {
    this.updateGeodeticPosition();
    this.renderWorldMapImageOnCanvas();
    this.interval = setInterval(this.updateGeodeticPosition.bind(this), 5000);
    this.interval = setInterval(this.renderWorldMapImageOnCanvas.bind(this), 5000);
  }

}

// ============================================================================

export default Satellite;