import React, { Component } from 'react';

var apiKey = 'AIzaSyDYWDEGapBa4gIQBtafipikpKs1kXYbOgg';

var api = {
  getGooglePlaces(lat,lng, radius, category){
    var meterRadius = radius * 1609.34
    var googleType = ""
    if (category === "tourist_destination"){
      googleType = "place_of_interest"
    } else {
      googleType = category
    }
    
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=${meterRadius}&types=${category}&key=${apiKey}`;
    return fetch(url).then((response) => response.json()); // promise
  },
  getPioneerPlaces(lat,lng){
    var url = `https://sheltered-depths-18581.herokuapp.com/places?latitude=${lat}&longitude=${lng}`;
    return fetch(url).then((response) => response.json()); // promise
  }
};

export default api;
