class Functions {

  static humanReadableLatitude(lat)
  {
    var latNS = "N";
    if (lat < 0) {
      latNS = "S";
      lat *= -1;
    }
    var latDeg = parseInt(lat, 10);    
    var latMin = parseInt((lat - latDeg) * 60, 10);    
    return latDeg + "°" + latMin + "'" + latNS;
  }

  static humanReadableLongitude(long)
  {
    var longEW = "E";
    if (long < 0) {
      longEW = "W";
      long *= -1;
    }
    var longDeg = parseInt(long, 10);    
    var longMin = parseInt((long - longDeg) * 60, 10);    
    return longDeg + "°" + longMin + "'" + longEW;
  }

}

// ============================================================================

export default Functions;