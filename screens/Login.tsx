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

    const handleFormSubmit = async (values: { email: string, password: string }) => {
      try {
        const { email, password } = values;
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
    };
    
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Login'}>
            <ArrowBack/>
            <TitleAndSubTitle title={englishTranslationedSentences.wbNeroText} subTitle={englishTranslationedSentences.chooseLoginOptionText}/>
            <ScrollView style={{margin: '3%'}} showsVerticalScrollIndicator={false}>
            <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
           >
          {({ handleChange, handleSubmit, values, errors, isValid, dirty, touched }) => (
            <>
                <FIInput 
                label={englishTranslationedSentences.emailLabelText} 
                value={values.email}
                startValue={values.email}
                errorMessage={errors.email}
                onChangeText={handleChange('email')}
                placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
                onPress={() => {handleChange('email')('')}}
                />
                <FIInput 
                value={values.password}
                startValue={values.password}
                errorMessage={errors.password}
                label={englishTranslationedSentences.passwordLabelText} 
                onChangeText={handleChange('password')}
                placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                onPress={() => {handleChange('password')('')}}
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
                disabled={!isValid  || (values.email === '' && values.password === '') || isLoading} 
                onPress={handleSubmit}
                />
                      </>
    )}
  </Formik>
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