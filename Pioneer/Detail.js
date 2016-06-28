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

        <Image style={styles.image} source={{uri: this.props.card.photos[0]}} />
        <Text>
        {this.props.card.description}
        </Text>

      </View>
    );
  }
}

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
     height:190,
     width:180,
     borderRadius:50,
     marginTop: 10,
     alignSelf: 'center'
   },
});


export default Detail;
