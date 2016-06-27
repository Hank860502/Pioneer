import React, { Component } from 'react';
import Separator from './Separator.js';
import MyMap from './Map.js';


import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ScrollView,
} from 'react-native';


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
      <View>
      <MyMap />
      <ScrollView  horizontal={true} style={styles.containerWishList}>
        {list}
      </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  containerWishList: {
    flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
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
