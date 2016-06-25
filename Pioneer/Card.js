import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
} from 'react-native';

class Card extends Component {

  render(){
    var referenceLink = 'CoQBcwAAAFb7DYQA-km0R3UYSfoaOTcBnU9_9LUEK827vULnJhXXjstFxxn5esL4p7ipJgYV43eJ_iiHFvDb-nIX_Z9mMaK3pGPJ8Ts9sdQ1M2kmBkNcpQViRt4TCvnXOzIRreMoV_aeldOznpQEtcaitvBpz920D-j-moST9jHbqj_MOIRCEhBr4BD8Cl-5D-T7kblRxAHXGhT8jVx0oxTo3-5xeIwejudfI9G9cg&key=AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8'
    var imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${referenceLink}`

    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageLink}}/>
        <Text style={styles.welcome}>
          {this.props.locationsSet[0].name}
        </Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   welcome: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   },
   instructions: {
     textAlign: 'center',
     color: '#333333',
     marginBottom: 5,
   },
   image:{
     height:300,
     width:300,
     borderRadius:50,
     marginTop:5,
     alignSelf: 'center'
   },
});

export default Card;
