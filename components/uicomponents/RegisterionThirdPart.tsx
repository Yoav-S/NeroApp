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

}

const validationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
});


const RegisterionThirdPart: React.FC<RegisterionFirstPartProps> = ({setPassword, setisThirdPartFlagSubmit, signUpAttempt, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts}) => {
    const { theme } = useContext(ThemeContext);
    const [isChecked, setisChecked] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [isModalChecked, setIsModalChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const handleNextBtn = async (values: { password: string; confirmPassword: string }, formikHelpers: FormikHelpers<{ password: string; confirmPassword: string }>) => {
        setPassword(values.password);
        setisThirdPartFlagSubmit(true);        
        signUpAttempt(values.password);
    }

    useEffect(() => {
        setthirdPartMounts(true);
        setsecondPartMounts(false);
        setfirstPartMounts(false);
    }, []);
    
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>
            <Formik
                initialValues={{password: '', confirmPassword: ''}}  // Initialize phone as an empty string
                validationSchema={validationSchema}
                onSubmit={handleNextBtn}
            >
                {({handleChange, handleSubmit, values, errors, isValid, dirty, touched}) => (
                    <>
                        <FIInput
                            placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                            label={englishTranslationedSentences.passwordLabelText}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            errorMessage={errors.password}
                            startValue={values.password}
                            onPress={() => {handleChange('password')('')}}
                        />
                        <FIInput
                            placeholder={englishTranslationedSentences.confirmYourPasswordText}
                            label={englishTranslationedSentences.confirmPasswordText}
                            onChangeText={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            errorMessage={errors.confirmPassword}
                            startValue={values.confirmPassword}
                            onPress={() => {handleChange('confirmPassword')('')}}
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
                            disabled={!isValid || (values.password === '' && values.confirmPassword === '') || !toggleCheckBox} 
                            onPress={() => {
                                setisChecked(true);
                                handleSubmit();
                            }}
                            disabledBackgroundColor={theme.Elements.ButtonDisabled}
                            backGroundColor={theme.Main.Black}
                            textColor={theme.Text.ButtonText}
                            borderRadius={10}
                        />


                    </>
                )}
            </Formik>
            <PrivacyPolicyModal setToggleCheckBox={setToggleCheckBox} setisModalChecked={setIsModalChecked} modalVisiblity={modalVisible} setmodalVisibility={setModalVisible}/>
        </StyledWrapper>
    );
};

export default RegisterionThirdPart;