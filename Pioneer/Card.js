import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} from 'react-native';

class Card extends Component {

  readMore(){
    this.props.navigator.push({
      title: 'Detail',
      card: this.props.cardInfo
    });
  }
  render(){
    var imageLink = this.props.cardInfo.photos[0]

    return(
    <TouchableOpacity
      onPress={this.readMore.bind(this)}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageLink}}/>
        <Text style={styles.welcome}>
          {this.props.cardInfo.title}
        </Text>
      </View>
    </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'white',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   image:{
     height:380,
     width:360,
     borderRadius:50,
   },
});

export default Card;
