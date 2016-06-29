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
      radius: "",
      newPlace: "",
      showCancel: false,
      showCancel2: false,
    }
  }

  // toggleCancel(){
  //   this.setState({
  //     showCancel: !this.state.showCancel,
  //   });
  //  }
  //
  // toggleCancel2(){
  //       this.setState({
  //         showCancel2: !this.state.showCancel2,
  //       });
  //   }
  //
  // appendCategoryPicker(){
  //   console.log("click")
  //   if (this.state.showCancel){
  //   return(
  //     <View>
  //       <Picker
  //         selectedValue={this.state.category}
  //         onValueChange={(category) => this.setState({category: category})}>
  //         <Picker.Item label="Popular" value="tourist_destination" />
  //         <Picker.Item label="Restaurant" value="restaurant" />
  //         <Picker.Item label="Aquarium" value="aquarium" />
  //         <Picker.Item label="Casino" value="casino" />
  //         <Picker.Item label="Museum" value="museum" />
  //         <Picker.Item label="Night Life" value="night_club" />
  //         <Picker.Item label="Park" value="park" />
  //         <Picker.Item label="Zoo" value="zoo" />
  //         <Picker.Item label="Attractions" value="place_of_interset" />
  //       </Picker>
  //     </View>)
  //   } else {
  //       return null
  //     }
  // }
  //
  // appendRadiusPicker(){
  //   console.log("click")
  //   if (this.state.showCancel2){
  //   return(
  //     <View><Picker
  //         selectedValue={this.state.radius}
  //         onValueChange={(radius) => this.setState({radius: radius})}>
  //         <Picker.Item label="1 miles" value="10" />
  //         <Picker.Item label="5 miles" value="30" />
  //         <Picker.Item label="10 miles" value="50" />
  //         <Picker.Item label="20 miles" value="20" />
  //         <Picker.Item label="30 miles" value="80" />
  //       </Picker>
  //     </View>
  //       )
  //   } else {
  //       return null
  //     }
  // }
  render(){
    return(
      <View>
        {/*<Text style={styles.text}>Category: {this.state.category}</Text>
          <TouchableOpacity
              onPress={() => this.toggleCancel()}
              style={styles.button}>
                <Text style={styles.buttonText}>Choose Category</Text>
          </TouchableOpacity>
          {this.appendCategoryPicker()}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.toggleCancel2()}
            style={styles.button2}>
              <Text style={styles.buttonText}>Choose Radius</Text>
          </TouchableOpacity>
          {this.appendRadiusPicker()}
        </View>*/}
        <View>
        <Picker
          selectedValue={this.state.radius}
          onValueChange={(radius) => this.setState({radius: radius})}>
          <Picker.Item label="1 miles" value="10" />
          <Picker.Item label="5 miles" value="30" />
          <Picker.Item label="10 miles" value="50" />
          <Picker.Item label="20 miles" value="20" />
          <Picker.Item label="30 miles" value="80" />
        </Picker>
        </View>
        <Text style={styles.text1}>Radius</Text>
        <Text style={styles.text2}>Categories</Text>
      <View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category: category})} mode="dialog">
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

      </View>
    )
  }
};


const styles = StyleSheet.create({
  text1: {
    position: 'absolute',
    top: 98,
    left: 18,
    height: 38,
    fontSize: 23,
  },
  text2: {
    position: 'absolute',
    top: 312,
    left: 10,
    height: 38,
    fontSize: 23,
  },
})

export default Setting;
