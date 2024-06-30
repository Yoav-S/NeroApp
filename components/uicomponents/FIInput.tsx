import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardTypeOptions } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { FIInputType } from "../../utils/interfaces";
import { styles } from "../../utils/styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const FIInput: React.FC<FIInputType> = (props) => {
    const { theme } = useContext(ThemeContext);
    const [currentInputText, setCurrentInputText] = useState('');
    const [isLocked, setisLocked] = useState(true);

    const clearInputIcon = <Icon onPress={() => {
        setCurrentInputText('')
        props.onChangeText('')
    }} name="remove" size={20} color={theme.Icons.AccentIcons} />;

    const lockIcon = <Icon onPress={() =>{setisLocked(!isLocked)}} name="eye-slash" size={25} color={theme.Main.Black} style={{position: 'absolute', right: 20 , bottom: -15}}/>;
    const unlockIcon = <Icon onPress={() =>{setisLocked(!isLocked)}} name="eye" size={25} color={theme.Main.Black} style={{position: 'absolute', right: 20, bottom: -15}}/>;

    const handleinputChange = (text: string) => {
        props.onChangeText(text)
        setCurrentInputText(text);
    }

    const keyboardType: KeyboardTypeOptions = props.numeric ? 'numeric' : 'default';

    return(
        <SafeAreaView style={{alignSelf: 'center', marginTop: '5%'}}>
            <Text style={[styles.textLabelStyle, {color: props.errorMessage && props.startValue !== '' ? 'red' : theme.Main.Black}]}>{props.errorMessage && props.startValue !== '' ? props.errorMessage : props.label}</Text>
            <View style={{  width: 328,  borderRadius: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={(text: string) => {handleinputChange(text)}}
            placeholderTextColor={theme.Text.SecondaryIcons}
            maxLength={props.maxLength || undefined}
            keyboardType={keyboardType}
            style={{color: theme.Text.Black, width: 328,  backgroundColor: theme.Background.White, borderWidth: 1, borderColor: (props.errorMessage && props.startValue !== '') ? 'red' : theme.Elements.ButtonDisabled, borderRadius: 10}}
            secureTextEntry={(props.label === 'Password' || props.label === 'Confirm password' || props.label === 'Confirm Password') && isLocked}/>
            <View style={{display: 'flex', flexDirection: 'row',gap: 20, position: 'relative'}}>
            {props.label === 'Password' || props.label === 'Confirm password' || props.label === 'Confirm Password' ? (isLocked ? (lockIcon) : (unlockIcon)) : (<View/>)}
            </View>
            </View>

        </SafeAreaView>
    )
}

export default FIInput;