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
import { useToken } from "../context/TokenContext";
const Signup: React.FC = (props) => {
    const { theme } = useContext(ThemeContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstPartFlagCheck, setisFirstPartFlagCheck] = useState(false);
    const [secondPartFlagCheck, setisSecondPartFlagCheck] = useState(false);
    const [thirdPartFlagSubmit, setisThirdPartFlagSubmit] = useState(false);
    const [firstPartMounts, setfirstPartMounts] = useState(true);
    const [secondPartMounts, setsecondPartMounts] = useState(false);
    const [thirdPartMounts, setthirdPartMounts] = useState(false);
    const {signupAttempt} = useToken();
    
    
    const signUpAttempt = async (password: string) => {
        setisThirdPartFlagSubmit(false);
        setisFirstPartFlagCheck(false);
        setisSecondPartFlagCheck(false);
        const { success, data, error } = await signupAttempt(email, password, firstName, lastName, phone);
        console.log(success);
        console.log(data);
        console.log(error);

    }
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Login'}>
<ArrowBack/>
<TitleAndSubTitle title={englishTranslationedSentences.welcomeToNeroText} subTitle={englishTranslationedSentences.pleaseRegisterText}/>
<ScrollView>
    {
        !firstPartFlagCheck ? 
        (<RegisterionFirstPart 
        setfirstPartMounts={setfirstPartMounts} 
        setsecondPartMounts={setsecondPartMounts}
        setthirdPartMounts={setthirdPartMounts}
        setFirstName={setFirstName} 
        setLastName={setlastName} 
        setisFirstPartFlagCheck={setisFirstPartFlagCheck}
        />) : 
        (!secondPartFlagCheck ? 
            (<RegisterionSecondPart 
            setfirstPartMounts={setfirstPartMounts} 
            setsecondPartMounts={setsecondPartMounts}
            setthirdPartMounts={setthirdPartMounts}
            setEmail={setEmail} 
            setPhone={setPhone}
            setisSecondPartFlagCheck={setisSecondPartFlagCheck}
            />) :
        (<RegisterionThirdPart 
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
        </StyledWrapper>
    )
}
export default Signup