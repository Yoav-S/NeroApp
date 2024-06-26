import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { FIButtonType } from "../../utils/interfaces";
import Icon from 'react-native-vector-icons/FontAwesome';

const FIButton: React.FC<FIButtonType> = (props) => {
    const { theme } = useContext(ThemeContext);
    const [isPressed, setIsPressed] = useState(false);

    const myIcon = props.icon ? (
        <Icon 
            style={{ position: 'absolute', left: 15, top: 10 }} 
            name={props.icon} 
            size={20} 
            color={theme.Icons.SecondaryIcons} 
        />
    ) : null;

    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            disabled={props.disabled} 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[
                styles.body,
                { backgroundColor: 
                    props.disabled ? 
                    props.disabledBackgroundColor : 
                    isPressed ? 
                    props.buttonPressedBackgroundColor : 
                    props.backGroundColor,
                   borderRadius: props.borderRadius,
                   borderColor: props.borderColor,
                   borderWidth: props.borderWidth  ,
                   marginTop: props.text === 'Sign Up' || props.text === 'Next' ? '10%' : '5%'
                }
            ]}
        >
            {myIcon}
            <Text style={{ textAlign: 'center', color: props.textColor , fontFamily: 'Noto Sans', fontWeight: 700, fontSize: 16, lineHeight: 20}}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    body: {
        width: 328,
        height: 48,
        alignSelf: 'center',
        borderRadius: 10,
        margin: '2%',
        flexDirection: 'row',
        paddingTop: 12,
        paddingRight: 0,
        paddingBottom: 12,
        paddingLeft: 0,
        justifyContent: 'center',
    }
});

export default FIButton;
