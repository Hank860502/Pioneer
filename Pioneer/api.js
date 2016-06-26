import React, { Component } from 'react';

var apiKey = 'AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8';

var api = {
  getPlaces(lng,lat){
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=500&type=point_of_interest&key=${apiKey}`;
    return fetch(url).then((response) => response.json()); // promise
  },
};

export default api;
