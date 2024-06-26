/* eslint-disable prettier/prettier */
import React, { useContext} from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";
interface Props {
  onPressGoogle: () => void; // Function for Google button press
  onPressFacebook: () => void; // Function for Facebook button press
}

const GoogleFBBtns: React.FC<Props> = ({ onPressGoogle, onPressFacebook }) => {
    const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '3%' , gap: 16 ,marginTop: '15%'}}>
      <TouchableOpacity onPress={onPressFacebook} 
      style={{borderWidth: 1, 
        borderColor: theme.Elements.ButtonDisabled , 
        paddingVertical: 18,
        paddingHorizontal: 45,
        borderRadius: 10

        }}>
      <Image
        source={require('../../assests/images/facebooksmalllogo.png')} 
        resizeMode='contain'
        style={{height: 25, width: 25}}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressGoogle} style={{borderWidth: 1, 
      borderColor: theme.Elements.ButtonDisabled,
      paddingVertical: 18,
      paddingHorizontal: 45,
      borderRadius: 10
      }}>
      <Image
        source={require('../../assests/images/googlesmalllogo.png')} 
        resizeMode='contain'
        style={{height: 25, width: 25}}
      />        
      </TouchableOpacity>

    </View>
  );
};

export default GoogleFBBtns;
