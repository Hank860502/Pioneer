import React, { Component } from 'react';


import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TextInput
} from 'react-native';

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: "",
      radius: "", // destination lat lng
      newPlace: "",
    }
  }
  render(){
    return(
      <View>
        <Text style={styles.text}>HIsdfsdf</Text>
        <Text>This is the category: {this.state.category}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(category) => this.setState({category})}
          value={this.state.category}
        />
        <Text>This is the second: {this.state.category}</Text>
      </View>
    )
  }
};


const styles = StyleSheet.create({
  text: {
    marginTop: 100,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    fontSize: 20,
  }
})

export default Setting;
