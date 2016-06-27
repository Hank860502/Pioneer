import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ScrollView,
} from 'react-native';

import Separator from './Separator.js'

class WishList extends Component {
  render(){
    var likeCollection = this.props.likeCollection
    var list = likeCollection.map((place,index) => {
      var imageLink = place.photos[0]

      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Image style={styles.image} source={{uri: imageLink}}/>
            <Text style={styles.welcome}> {place.name}</Text>
          </View>
          <Separator />
        </View>
      )
    });

    return(
      <ScrollView style={styles.containerWishList}>
        <Text style={styles.welcome}>
          Your Wishlist
        </Text>
        {list}
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  containerWishList: {
    flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
    marginTop: 50,
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
    marginTop:100,
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
    rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },
});

export default WishList;
