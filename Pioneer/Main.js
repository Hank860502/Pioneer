import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

// import api from './api.js'
// import Card from './Card.js'

class Main extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: false,
      error: false,
      travelLocation: '',
    }
  }

  handleSubmit(){
    // update indicatorIOS spinner
    // fetch data from Github
    // reroute to the next passing the Github information
    console.log('button clicked')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Find your next destination ! </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.travelLocation}
          onChangeText={(text) => this.setState({travelLocation: text})}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> By location </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
            <Text style={styles.buttonText}> Around me </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default Main;
