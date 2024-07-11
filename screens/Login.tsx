import React, {useState, useContext} from "react";
import { Text, View, SafeAreaView, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import ArrowBack from "../components/uicomponents/ArrowBack";
import TitleAndSubTitle from "../components/uicomponents/TitleAndSubTitle";
import { englishTranslationedSentences } from "../utils/sentences";
import FIInput from "../components/uicomponents/FIInput";
import { ThemeContext } from "../context/ThemeContext";
import { styles } from "../utils/styles";
import FIButton from "../components/uicomponents/FIButton";
import { useNavigation } from '@react-navigation/native';
import type { LoginScreenProps } from "../utils/interfaces";
import OrLoginWith from "../components/uicomponents/OrLoginWith";
import GoogleFBBtns from "../components/uicomponents/GoogleFBBtns";
import { emailSchema, passwordSchema } from "../utils/statements";
import LoadingModal from "../components/modals/LoadingModal";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik';
  import * as Yup from 'yup';
import StyledWrapper from "../components/uicomponents/StyledWrapper";
import { useDataContext } from "../context/DataContext";
import { useToken } from "../context/TokenContext";



const validationSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});
const Login: React.FC<LoginScreenProps> = (props) => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<LoginScreenProps['navigation']>();
    const [isLoading, setIsLoading] = useState(false);
    const {loginAttempt} = useToken();
    const [isTypedWrongEmailFormat, setisTypedWrongEmailFormat] = useState(false);
    const [isTypedWrongPasswordFormat, setisTypedWrongPasswordFormat] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginAttempt = async () => {
      const { isPasswordValid, isEmailValid } = await verifyUserInputs(email, password);
      console.log(isPasswordValid, isEmailValid);
      if(isPasswordValid && isEmailValid){
        setisTypedWrongPasswordFormat(false);
        setisTypedWrongEmailFormat(false);
        try {
          setIsLoading(true);
          const result = await loginAttempt(email, password);
          setIsLoading(false);
      
          const { success, data, error } = result;
          if (success) {
            // Login successful, handle data (e.g., update state, set tokens)
            console.log('Login successful:', data); // You can access data like result.data.token or result.data.user here
          } else {
            // Login failed, handle error
            console.error('Login failed:', error); // Log or handle the error appropriately
          }
        } catch (error) {
          console.error('An error occurred during login:', error); // Catch any unexpected errors
        }
      }
      else{
        if(!isPasswordValid){
          setisTypedWrongPasswordFormat(true);
          setPassword('');
          if(isEmailValid){
            setisTypedWrongEmailFormat(false);
          }
        }
        if(!isEmailValid){
          setisTypedWrongEmailFormat(true);
          setEmail('');
          if(isPasswordValid){
            setisTypedWrongPasswordFormat(false);
          }
        }
      }
    }

    const verifyUserInputs = async (email: string, password: string) => {      
        let isEmailValid = true;
        let isPasswordValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail: boolean = emailRegex.test(email);
        if(password.length < 7){
          isPasswordValid = false;
        }
        if (!isValidEmail){
          isEmailValid = false;
        }
        return {isPasswordValid, isEmailValid}
    }

    
    
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Login'}>
            <ArrowBack/>
            <TitleAndSubTitle title={englishTranslationedSentences.wbNeroText} subTitle={englishTranslationedSentences.chooseLoginOptionText}/>
            <ScrollView style={{margin: '3%'}} showsVerticalScrollIndicator={false}>

                <FIInput 
                placeholderError={englishTranslationedSentences.placeHolderEmailErrorMessage}
                errorMessage={englishTranslationedSentences.theEmailIsWrong}
                label={englishTranslationedSentences.emailLabelText} 
                value={email}
                startValue={email}
                onChangeText={(email: string) => {setEmail(email);}}
                placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
                isTypedWrongFormat={isTypedWrongEmailFormat}
                setisTypedWrongFormat={setisTypedWrongEmailFormat}
                />
                <FIInput 
                placeholderError={englishTranslationedSentences.placeHolderPasswordErrorMessage}
                errorMessage={englishTranslationedSentences.thePasswordIsWrong}
                value={password}
                startValue={password}
                label={englishTranslationedSentences.passwordLabelText} 
                onChangeText={(password: string) => {setPassword(password);}}
                placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                isTypedWrongFormat={isTypedWrongPasswordFormat}
                setisTypedWrongFormat={setisTypedWrongPasswordFormat}
                />   
                <View style={{position: 'relative', marginTop: '3%', marginBottom: '10%'}}>
                <TouchableOpacity onPress={() => {navigation.navigate('ForgotPassword')}} style={{position: 'absolute', right: 25, top: 15}}>
                    <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.forgotPasswordText}</Text>
                    </TouchableOpacity>
                </View>
                <FIButton
                backGroundColor={theme.Main.Black}
                buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
                disabledBackgroundColor={theme.Elements.ButtonDisabled}
                textColor={theme.Text.ButtonText}
                text={englishTranslationedSentences.loginText}
                borderRadius={10}
                disabled={(email === '' || password === '') || isLoading} 
                onPress={handleLoginAttempt}
                />

                    <OrLoginWith/>
                    <GoogleFBBtns 
                    onPressFacebook={() => {console.log('Facebook Pressed');}} 
                    onPressGoogle={()=> {console.log('Google Pressed');}}/>
                    <View style={{flexDirection: 'row', alignSelf: 'center', gap: 6, alignItems: 'center', marginTop: '10%'}}>
                        <Text style={[styles.textLabelStyle,{color: theme.Main.Black}]}>{englishTranslationedSentences.dontHaveAccountText}</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
                        <Text style={[styles.forgotPasswordTextStyle,{color: theme.Main.Black}]}>{englishTranslationedSentences.signUpText}</Text>
                        </TouchableOpacity>
                    </View>

                    </ScrollView>
                    {isLoading && <LoadingModal/>}
                  </StyledWrapper>
    )
}

export default Login