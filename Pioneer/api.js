import React, { Component } from 'react';

var apiKey = 'AIzaSyDYWDEGapBa4gIQBtafipikpKs1kXYbOgg';

var api = {
  getPlaces(lng,lat){
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=prominence&radius=500&types=food&key=${apiKey}`;
    return fetch(url).then((response) => response.json()); // promise
  },
};

export default api;
