import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
} from 'react-native';

var apiKey = 'AIzaSyDO4ikGkFBkBem1VzMZuFYJil43jPcVz_8';

class Card extends Component {

  handleLike(){
    console.log('Show');
    this.props.navigator.push({
      title: 'Card',
      collection: this.props.collection,
      index: this.props.index += 1
    });
  }

  handleDislike(){
    console.log('dislike')
  }

  render(){
    // if (collection[index].photos === null){
    //   this.props.locationsSet.splice(0, 1);
    // }else{
    //   currentCard = this.props.locationsSet[0];
    //   console.log(this.props.locationsSet.length);
    // }

    const { collection, index } = this.props;
    const currentCard = collection[index];

    var referenceLink = currentCard.photos ? currentCard.photos[0].photo_reference : null
    var imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${referenceLink}&key=${apiKey}`
    return(

      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageLink}}/>
        <Text style={styles.welcome}>
          {currentCard.name}
        </Text>
        <TouchableHighlight
          style={styles.buttonLike}
          onPress={this.handleLike.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Like </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonDislike}
          onPress={this.handleDislike.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Dislike </Text>
        </TouchableHighlight>
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
   buttonText: {
     fontSize: 18,
     color: '#111',
     alignSelf: 'center',
   },
   buttonLike: {
     height: 45,
     flexDirection: 'row',
     backgroundColor: 'green',
     borderColor: 'white',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     marginTop: 10,
     alignSelf: 'stretch',
     justifyContent: 'center',
   },
   buttonDislike: {
     height: 45,
     flexDirection: 'row',
     backgroundColor: 'red',
     borderColor: 'white',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     marginTop: 10,
     alignSelf: 'stretch',
     justifyContent: 'center',
   },
});

export default Card;
