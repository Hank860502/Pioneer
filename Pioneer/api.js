import React, { Component } from 'react';

var apiKey = 'AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8';

var api = {
  getPlaces(lng,lat){
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lng},${lat}&radius=50000&types=points_of_interest&key=${apiKey}`;
    return fetch(url).then((response) => response.json()); // promise
  },
};

export default api;
