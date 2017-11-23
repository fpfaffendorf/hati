class Functions {

  static humanReadableLatitude(lat)
  {
    var latNS = "N";
    if (lat < 0) {
      latNS = "S";
      lat *= -1;
    }
    var latDeg = parseInt(lat);    
    var latMin = parseInt((lat - latDeg) * 60);    
    return latDeg + "°" + latMin + "'" + latNS;
  }

  static humanReadableLongitude(long)
  {
    var longEW = "E";
    if (long < 0) {
      longEW = "W";
      long *= -1;
    }
    var longDeg = parseInt(long);    
    var longMin = parseInt((long - longDeg) * 60);    
    return longDeg + "°" + longMin + "'" + longEW;
  }

}

// ============================================================================

export default Functions;