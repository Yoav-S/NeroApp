import React, { useContext, useEffect, useState } from 'react';
import { View  ,Text, TouchableOpacity} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { ThemeContext } from '../../../context/ThemeContext';
import { englishTranslationedSentences } from '../../../utils/sentences';
import FIButton from '../FIButton';
import { styles } from '../../../utils/styles';

interface Props {
isTypedWrongOtp: boolean;
handleOtpAttempt: (userOtp: string) => void;
sendOtpAgain: () => void
setOtpVerifiedFlag: (isVerified: boolean) => void;
}

const OtpInputCom: React.FC<Props> = ({isTypedWrongOtp, handleOtpAttempt, sendOtpAgain}) => {
  const { theme } = useContext(ThemeContext);
  const [currentOtpLength, setCurrentOtpLength] = useState(0);
  const [currentOtpValue, setCurrentOtpValue] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        startCountdown();
    }, [])




  const startCountdown = () => {
    setIsActive(true);
    setSecondsLeft(60);
  
    const interval = setInterval(() => {
      setSecondsLeft((secs) => {
        if (secs <= 1) {
          clearInterval(interval);
          setIsActive(false);
          setSecondsLeft(60);  // Reset to 60 when it reaches 0
          return 60;
        }
        return secs - 1;
      });
    }, 1000);
  };




  return (
    <View style={{ width: 300, alignSelf: 'center', marginTop: 28,}}>
        <View style={{ marginBottom: 82 }}>

      <OTPTextView
        offTintColor={isTypedWrongOtp ? 'red' : theme.Elements.ButtonDisabled}
        tintColor={isTypedWrongOtp ? 'red' : theme.Main.Black}
        handleTextChange={(otp: string) => 
        {
            setCurrentOtpLength(otp.length)
            setCurrentOtpValue(otp);
        }}
        containerStyle={{ height: 73 }}
        textInputStyle={{
          borderRadius: 16,
          borderWidth: 1,
          height: 73,
          width: 64,
          borderBottomWidth: 1
        }}
      />

      { isTypedWrongOtp && <Text style={{color: 'red', textAlign: 'center', marginTop: 18, position: 'absolute', alignSelf: 'center', bottom: -36}}>
        {englishTranslationedSentences.wrongOtpCode}
      </Text>}
      </View>
        <View style={{alignSelf: 'center', flexDirection: 'row', gap: 6}}>
            <TouchableOpacity 
            disabled={isActive} 
            onPress={() => 
            {sendOtpAgain
            startCountdown();
            }}>
                <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>
                    {englishTranslationedSentences.sendCodeAgain}
                </Text>
            </TouchableOpacity>
            {isActive && <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>{secondsLeft}</Text>}
        </View>
      <FIButton
       disabled={currentOtpLength !== 4}
       onPress={() => {handleOtpAttempt(currentOtpValue)}}
       backGroundColor={theme.Main.Black}
       buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
       disabledBackgroundColor={theme.Elements.ButtonDisabled}
       textColor={theme.Text.ButtonText}
       text={englishTranslationedSentences.verifyText}
       borderRadius={10}/>
    </View>
  );
};

export default OtpInputCom;
