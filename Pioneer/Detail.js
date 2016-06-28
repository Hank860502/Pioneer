import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Card from './Card.js'
console.log(this.props)

class Detail extends Component {
  render(){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          {this.props.card.title}
        </Text>
      </View>
    );
  }
}

export default Detail;
