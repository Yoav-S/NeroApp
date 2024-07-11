import React, {useState, useContext, useEffect} from "react";
import StyledWrapper from './StyledWrapper';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Modal } from 'react-native'
import { ThemeContext } from "../../context/ThemeContext";
import FIInput from "./FIInput";
import { englishTranslationedSentences } from "../../utils/sentences";
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import { passwordSchema } from "../../utils/statements";
import FIButton from "./FIButton";
import CheckBox from 'react-native-check-box'
import { styles } from "../../utils/styles";
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";
import { useDataContext } from "../../context/DataContext";
interface RegisterionFirstPartProps {
    setPassword: (password: string) => void;
    setisThirdPartFlagSubmit: (value: boolean) => void;
    signUpAttempt: (password: string) => void; // Updated to pass password to signUpAttempt
    setthirdPartMounts: (isMounted: boolean) => void;
    setfirstPartMounts: (isMounted: boolean) => void;
    setsecondPartMounts: (isMounted: boolean) => void;
    password: string;
    confirmPassword: string;
    setconfirmPassword: (confirmPassword: string) => void;
}

const validationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
});


const RegisterionThirdPart: React.FC<RegisterionFirstPartProps> = ({confirmPassword, setconfirmPassword,password,setPassword, setisThirdPartFlagSubmit, signUpAttempt, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts}) => {
    const { theme } = useContext(ThemeContext);
    const [isChecked, setisChecked] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [isTypedWrongPasswordFormat, setisTypedWrongPasswordFormat] = useState(false);
    const [isTypedWrongconfirmPasswordFormat, setisTypedWrongconfirmPasswordFormat] = useState(false);
    const [isModalChecked, setIsModalChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const handleNextBtn = async () => {
        const { isPasswordValid, isConfirmPasswordValid } = await verifyUserInputs(password, confirmPassword);
        if (isPasswordValid && isConfirmPasswordValid && toggleCheckBox) {
            setPassword(password);
            setisThirdPartFlagSubmit(true);
            signUpAttempt(password);
        } else {
            if(!isPasswordValid){
                setisTypedWrongPasswordFormat(true);
                setPassword('');
                if(isConfirmPasswordValid){
                    setisTypedWrongconfirmPasswordFormat(false);
                }
            }
            if(!isConfirmPasswordValid){
                setisTypedWrongconfirmPasswordFormat(true);
                setconfirmPassword('');
                if(isPasswordValid){
                    setisTypedWrongPasswordFormat(false);
                }
            }
            if(!toggleCheckBox){
                if(isConfirmPasswordValid){
                    setisTypedWrongconfirmPasswordFormat(false);
                }
                if(isPasswordValid){
                    setisTypedWrongPasswordFormat(false);
                }
                console.log('Didnt check the checkbox');
                
            }
        }
    };
    useEffect(() => {
        setthirdPartMounts(true);
        setsecondPartMounts(false);
        setfirstPartMounts(false);
    }, []);
    const verifyUserInputs = async (password: string, confirmPassword: string) => {      
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d.*\d).{6,}$/;
    
        let isPasswordValid = passwordPattern.test(password);
        let isConfirmPasswordValid = password === confirmPassword;
        
        return { isPasswordValid, isConfirmPasswordValid };
    };
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>

                        <FIInput
                        isTypedWrongFormat={isTypedWrongPasswordFormat}
                        setisTypedWrongFormat={setisTypedWrongPasswordFormat}
                        placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                        label={englishTranslationedSentences.passwordLabelText}
                        onChangeText={(password: string) => {setPassword(password);}}
                        value={password}
                        errorMessage={englishTranslationedSentences.useAllRequiredCharacters}
                        placeholderError={englishTranslationedSentences.enterAValidPassword}
                        bottomErrorMessage={englishTranslationedSentences.passwordHelpers}
                        startValue={password}
                        />
                        <FIInput
                        isTypedWrongFormat={isTypedWrongconfirmPasswordFormat}
                        setisTypedWrongFormat={setisTypedWrongconfirmPasswordFormat}
                        placeholder={englishTranslationedSentences.confirmYourPasswordText}
                        label={englishTranslationedSentences.confirmPasswordText}
                        onChangeText={(confirmPassword: string) => {setconfirmPassword(confirmPassword)}}
                        value={confirmPassword}
                        errorMessage={englishTranslationedSentences.confirmPasswordError}
                        startValue={confirmPassword}
                        />
                <View style={{gap: 12,flexDirection: 'row', alignItems: 'center',marginLeft: '5%'}}>
                    <CheckBox
                    disabled={!isModalChecked}
                    style={{ padding: 10}}
                    onClick={()=>{
                    setToggleCheckBox(!toggleCheckBox)
                    }}
                    isChecked={toggleCheckBox}
                />
                
                <View style={{ flexDirection: 'row', gap: 4}}>
                    <Text style={[styles.checkboxTextStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.byContinuingText}</Text>
                    <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={[styles.privacyPolicyTextStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.privacyPolicyText}</Text>
                    </TouchableOpacity>
                </View>
                    </View>
                        <FIButton
                            text={englishTranslationedSentences.signUpText}
                            disabled={password === '' || confirmPassword === ''} 
                            onPress={() => {
                                setisChecked(true);
                                handleNextBtn();
                            }}
                            disabledBackgroundColor={theme.Elements.ButtonDisabled}
                            backGroundColor={theme.Main.Black}
                            textColor={theme.Text.ButtonText}
                            borderRadius={10}
                        />

            <PrivacyPolicyModal setToggleCheckBox={setToggleCheckBox} setisModalChecked={setIsModalChecked} modalVisiblity={modalVisible} setmodalVisibility={setModalVisible}/>
        </StyledWrapper>
    );
};

export default RegisterionThirdPart;