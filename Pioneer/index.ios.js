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
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import Main from './Main.js';
import CardContainer from './CardContainer.js';

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
        	 underlayColor="transparent"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
           <View>
             <Image source={require('./wishlist.png')}/>
           </View>
          {/*<Text style={ styles.leftNavButtonText }>Back</Text>*/}
        </TouchableHighlight>
  	)}
  	else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return ( <TouchableHighlight
    														onPress={ () => route.onPress() }>
                                <Text style={ styles.rightNavButtonText }>
                                  	{ route.rightText || 'Right Button' }
                                </Text>
                              </TouchableHighlight> )
  },
  Title(route, navigator, index, navState) {
    return <Image
        style = {styles.image}
        source={require('./Pioneer.png')}
      />
  }
};



class Pioneer extends Component {

  renderScene(route, navigator){
    if(route.title === 'Pioneer'){
      return <Main navigator={navigator} />
    } else if (route.title === 'CardContainer') {
      return <CardContainer navigator={navigator} index={route.index} collection={route.collection}/>
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
