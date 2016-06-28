/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} from 'react-native';

import Main from './Main.js';
import CardContainer from './CardContainer.js';
import WishList from './WishList.js';
import Detail from './Detail';

/*
  Issue: Because there isn't a shared store sharing the likeCollection  between the NavigationBarRouteMapper and Pioneer component, resorting to a hacky `const likeCollection` with array value would be needed (as below). However this `IS NOT THE PREFERRED` method as React prefers `stores` to manage the state of the application.  I would look into implementing React's Flux or third-party library Redux.  Personally I like Redux better
*/
const likeCollection = [];

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(route.title==='Detail'){
      return (
        <TouchableOpacity
        	 underlayColor="transparent"
           onPress={() => { navigator.pop() }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableOpacity>
  	)}
  	else { return null }
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        // onPress={this.goToWishList.bind(this)}
        onPress={() => { navigator.push({
            title: 'Wishlist',
            likeCollection: likeCollection,
            dislikeCollection: []
          })
        }}
      >
         <View>
           <Image source={require('./wishlist.png')}/>
         </View>
      </TouchableOpacity>
  )},
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        onPress={() => { navigator.push({
            title: 'Pioneer',
          })
        }}
      >
        <Image
          style = {styles.image}
          source={require('./Pioneer.png')}
        />
      </TouchableOpacity>
    )},
};

class Pioneer extends Component {
  /*
    Because React is essentially a tree structure of parent => child components, you will have to find a parent node that will essentially share data/state between sibling components - i.e Card Container and WishList.  Because the only pre-req of the shared store is an array with pushed card objects to render the Wish list; All you would need to do then, is pass the updateLikeCollection method down as a prop to the CardContainer Smart Component using method bind (.bind(this))
  */
  updateLikeCollection(card) {
    likeCollection.push(card);
  }

  renderScene(route, navigator){
    if(route.title === 'Pioneer'){
      return <Main navigator={navigator} />
    } else if (route.title === 'CardContainer') {
      return (
        <CardContainer navigator={navigator}
          index={route.index}
          collection={route.collection}
          updateLikeCollection={this.updateLikeCollection.bind(this)}

        />
      );
    } else if (route.title === 'Wishlist') {
      return (
        <WishList
          navigator={navigator}
          likeCollection={likeCollection}
        />
      );
    } else if (route.title === 'Detail') {
      return (
        <Detail
          navigator={navigator}
          card={route.card}
        />
      );
    }
  }

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{title: 'Pioneer'}}
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
            style={ styles.nav }
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    	flex: 4,
      flexDirection: 'column',
      marginTop:100
    },
    leftNavButtonText: {
    	fontSize: 18,
      marginLeft:13,
      marginTop:2
    },
    rightNavButtonText: {
    	fontSize: 18,
      marginRight:13,
      marginTop:2
    },
    nav: {
    	height: 60,
      backgroundColor: 'white'
    },
    title: {
    	marginTop:4,
      fontSize:16
    },
    button: {
    	height:60,
      marginBottom:10,
      backgroundColor: '#efefef',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
    	fontSize:18
    },
    image: {
      top: -5
    }
});

AppRegistry.registerComponent('Pioneer', () => Pioneer);
