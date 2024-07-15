/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import { ScrollView, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { englishTranslationedSentences } from '../utils/sentences';
import SentenceBtn from '../components/uicomponents/SentenceBtn';
import SendOtpToEmail from '../components/uicomponents/ForgotPasswordComps/SendOtpToEmail';
import ArrowBack from '../components/uicomponents/ArrowBack';
import TitleAndSubTitle from '../components/uicomponents/TitleAndSubTitle';
import OtpInputCom from '../components/uicomponents/ForgotPasswordComps/OtpInputCom';
import { useToken } from '../context/TokenContext';
import ResetPassword from '../components/uicomponents/ForgotPasswordComps/ResetPassword';
import PasswordChanged from '../components/uicomponents/ForgotPasswordComps/PasswordChanged';
import LoadingModal from '../components/modals/LoadingModal';
const screen = Dimensions.get('window');

const ForgotPassword: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const {sendOtpEmailAttempt, resetPasswordAttempt} = useToken();
  const [isLoading, setisloading] = useState(false);
  const [currentOtpValue, setCurrentOtpValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isTypedWrongOtp, setisTypedWrongOtp] = useState(false);
  const [otpNumber, setOtpNumber] = useState<{
    number: string;
    toEmail: string;
  }>({
    number: '',
    toEmail: ''
  });
  const [firstOtpSendingFlag, setOtpSendingFlag] = useState(false); 
  const [otpVerifiedFlag, setOtpVerifiedFlag] = useState(false); 
  const [passwordChangedFlag, setPasswordChangedFlag] = useState(false); 


  const sendOtpAgain = async () => {    
    handleSendOtp(otpNumber.toEmail);
  }

  const handleOtpAttempt = async (userOtpNumber: string) => {
  if(userOtpNumber === otpNumber.number){
    setOtpVerifiedFlag(true);
    //success code
  }
  else{
    setisTypedWrongOtp(true);
    setCurrentOtpValue('');
  }
  }

  const handleUserPasswordChange = async (newPassword: string) => {
    setisloading(true);
    const result = await resetPasswordAttempt(newPassword ,otpNumber.toEmail);
    setisloading(false);
    const { success, isChanged, error } = result;
    console.log('change password results:');
    if(isChanged){
    setPasswordChangedFlag(isChanged);
    } else{

    }
    
  }

  const handleSendOtp = async (email: string) => { 
     setisloading(true);
      const result = await sendOtpEmailAttempt(email);
      setisloading(false);
      const { success, data, error } = result;
      if(success){
        setOtpNumber({number:data, toEmail: email});
        setOtpSendingFlag(true);
      }else{
        setOtpNumber({number: '00000', toEmail: email});
        setOtpSendingFlag(true);
      }
    }  


  return (  
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.Background.White }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    >
    <ArrowBack/>
    <TitleAndSubTitle 
  title={!firstOtpSendingFlag ? 
    englishTranslationedSentences.forgotPasswordText : 
    !otpVerifiedFlag ? 
    englishTranslationedSentences.pleaseCheckYourEmail : 
    !passwordChangedFlag ? 
    englishTranslationedSentences.rememberPassword : 
    englishTranslationedSentences.passwordChanged
  } 
  subTitle={!firstOtpSendingFlag ? 
    englishTranslationedSentences.forgotPasswordHelp : 
    !otpVerifiedFlag ? 
    `${englishTranslationedSentences.weveSentEmailTo}\n${otpNumber.toEmail}` : 
    !passwordChangedFlag ? 
    englishTranslationedSentences.pleaseTypeSomething : 
    englishTranslationedSentences.yourPasswordHasBeenChanged
  }
/>




      <SafeAreaView style={{flex: 1, backgroundColor: theme.Background.White,  height: screen.height}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>



         {
          !firstOtpSendingFlag ? 
          (<SendOtpToEmail 
            isLoading={isLoading}
            setOtpNumber={setOtpNumber}
            handleSendOtp={handleSendOtp}/>) : 
            (!otpVerifiedFlag ? 
              (<OtpInputCom 
                currentOtpValue={currentOtpValue}
                setCurrentOtpValue={setCurrentOtpValue}
                isTypedWrongOtp={isTypedWrongOtp} 
                handleOtpAttempt={handleOtpAttempt} 
                sendOtpAgain={sendOtpAgain} 
                />) : 
                (!passwordChangedFlag ? 
                  (<ResetPassword confirmPassword={confirmPassword} setconfirmPassword={setconfirmPassword} password={password} setPassword={setPassword} isLoading={isLoading} setNewUserPassword={handleUserPasswordChange}/>) : 
                  (<PasswordChanged/>)))
         }


          { (!firstOtpSendingFlag || !otpVerifiedFlag || !passwordChangedFlag) && <SentenceBtn 
            btnText={englishTranslationedSentences.loginText} 
            sentenceText={englishTranslationedSentences.forgotPasswordText}
          />}
        </ScrollView>
      </SafeAreaView>


{isLoading && <LoadingModal/>}
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;