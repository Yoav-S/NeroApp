import React, {useState, useContext, useEffect} from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import StyledWrapper from "../components/uicomponents/StyledWrapper";
import { ThemeContext } from "../context/ThemeContext";
import ArrowBack from "../components/uicomponents/ArrowBack";
import TitleAndSubTitle from "../components/uicomponents/TitleAndSubTitle";
import { englishTranslationedSentences } from "../utils/sentences";
import RegisterionFirstPart from "../components/uicomponents/RegisterionFirstPart";
import RegisterionSecondPart from "../components/uicomponents/RegisterionSecondPart";
import RegisterionThirdPart from "../components/uicomponents/RegisterionThirdPart";
import OrLoginWith from "../components/uicomponents/OrLoginWith";
import GoogleFBBtns from "../components/uicomponents/GoogleFBBtns";
import AlreadyHaveAccount from "../components/uicomponents/AlreadyHaveAccount";
import DotsIndicator from "../components/uicomponents/DotsIndicator";
import { useNavigation } from '@react-navigation/native';
import type { SignupScreenProps } from '../utils/interfaces';
import { useToast } from "../context/ToastContext";

import { useToken } from "../context/TokenContext";
import LoadingModal from "../components/modals/LoadingModal";
const Signup: React.FC = (props) => {
    const { theme } = useContext(ThemeContext);
    const { showToast } = useToast();

    const navigation = useNavigation<SignupScreenProps['navigation']>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [firstPartFlagCheck, setisFirstPartFlagCheck] = useState(false);
    const [secondPartFlagCheck, setisSecondPartFlagCheck] = useState(false);
    const [thirdPartFlagSubmit, setisThirdPartFlagSubmit] = useState(false);
    const [firstPartMounts, setfirstPartMounts] = useState(true);
    const [secondPartMounts, setsecondPartMounts] = useState(false);
    const [thirdPartMounts, setthirdPartMounts] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const {signupAttempt} = useToken();
    
    
    const signUpAttempt = async (password: string) => {
        setisLoading(true);
        const { success, data, error } = await signupAttempt(email, password, firstName, lastName, phone);
        setisLoading(false);
        console.log(success);
        console.log(data);
        console.log(error);
        if(success){
            setisFirstPartFlagCheck(false);
            setisSecondPartFlagCheck(false);
            setisThirdPartFlagSubmit(false);
            setFirstName('');
            setlastName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setconfirmPassword('');
            showToast('success', 'Success!', 'You have been registered successfully', 'top');
            navigation.navigate('Login');
        } else{
            showToast('error', 'Error!', error || 'An error occurred', 'top');
            console.log('Failure operation');
            
        }
    }
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Login'}>
<ArrowBack/>
<TitleAndSubTitle 
  title={englishTranslationedSentences.welcomeToNeroText} 
  subTitle={!firstPartFlagCheck ? 
    englishTranslationedSentences.pleaseEnterYourFullName : 
    !secondPartFlagCheck ? 
    englishTranslationedSentences.pleaseEnterYourContactInformation: 
    !thirdPartFlagSubmit ? 
    englishTranslationedSentences.pleaseEnterYourStrongPassword : 
    ''
  }
/>
<ScrollView>
    {
        !firstPartFlagCheck ? 
        (<RegisterionFirstPart 
        firstName={firstName}
        lastName={lastName}    
        setfirstPartMounts={setfirstPartMounts} 
        setsecondPartMounts={setsecondPartMounts}
        setthirdPartMounts={setthirdPartMounts}
        setFirstName={setFirstName} 
        setLastName={setlastName} 
        setisFirstPartFlagCheck={setisFirstPartFlagCheck}
        />) : 
        (!secondPartFlagCheck ? 
            (<RegisterionSecondPart 
            email={email}
            phone={phone}
            setfirstPartMounts={setfirstPartMounts} 
            setsecondPartMounts={setsecondPartMounts}
            setthirdPartMounts={setthirdPartMounts}
            setEmail={setEmail} 
            setPhone={setPhone}
            setisSecondPartFlagCheck={setisSecondPartFlagCheck}
            />) :
        (<RegisterionThirdPart 
          isLoading={isLoading}
          confirmPassword={confirmPassword}
          setconfirmPassword={setconfirmPassword}
          password={password}
          setfirstPartMounts={setfirstPartMounts} 
          setsecondPartMounts={setsecondPartMounts}
          setthirdPartMounts={setthirdPartMounts} 
          signUpAttempt={(password: string) => {signUpAttempt(password)}} 
          setPassword={setPassword} 
          setisThirdPartFlagSubmit={setisThirdPartFlagSubmit}/>
        ))
    }

<DotsIndicator
amount={3}
firstPartMounts={firstPartMounts}
secondPartMounts={secondPartMounts}
thirdPartMounts={thirdPartMounts}/>
<OrLoginWith/>
<GoogleFBBtns onPressFacebook={() => {console.log('Facebook');}}
    onPressGoogle={() => {console.log('Google');
}}/>
<AlreadyHaveAccount/>
</ScrollView>
{isLoading && <LoadingModal/>}

        </StyledWrapper>
    )
}
export default Signup