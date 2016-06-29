import React, { Component } from 'react';


import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: "",
      radius: "", // destination lat lng
      newPlace: "",
      showCancel: false,
    }
  }

  toggleCancel(){
       this.setState({
           showCancel: !this.state.showCancel
       });
   }

   _renderCancel() {
       if (this.state.showCancel) {
           return (
               <TouchableHighlight
                   onPress={this.toggleCancel()}>
                   <View>
                       <Text style={styles.cancelButtonText}>Cancel</Text>
                   </View>
               </TouchableHighlight>
           );
       } else {
           return null;
       }
   },

  appendPicker(){
    console.log("click")
    return(
      <View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category: category})}>
          <Picker.Item label="Popular" value="tourist_destination" />
          <Picker.Item label="Restaurant" value="restaurant" />
          <Picker.Item label="Aquarium" value="aquarium" />
          <Picker.Item label="Casino" value="casino" />
          <Picker.Item label="Museum" value="museum" />
          <Picker.Item label="Night Life" value="night_club" />
          <Picker.Item label="Park" value="park" />
          <Picker.Item label="Zoo" value="zoo" />
          <Picker.Item label="Attractions" value="place_of_interset" />
        </Picker>
      </View>
    )
  }
  render(){
    var pickerCategory = this.appendPicker()
    return(
      <View>
        <Text style={styles.text}>This is the category: {this.state.category}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={pickerCategory}
          underlayColor= '#40B7DB' >
          <Text style={styles.buttonText}>Search By Category</Text>
        </TouchableOpacity>
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
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    left: 30,
    top: 415,
    height: 45,
    width: 320,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#30ABBD',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 60,
  },
})

export default Setting;
