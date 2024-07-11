import React, {useState, useContext, useEffect} from "react";
import StyledWrapper from './StyledWrapper';
import { ThemeContext } from "../../context/ThemeContext";
import FIInput from "./FIInput";
import { englishTranslationedSentences } from "../../utils/sentences";
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import { emailSchema, phoneNumberSchema } from "../../utils/statements";
import FIButton from "./FIButton";

interface RegisterionFirstPartProps {
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setisSecondPartFlagCheck: (isChecked: boolean) => void;
    setthirdPartMounts: (isMounted: boolean) => void;
    setfirstPartMounts: (isMounted: boolean) => void;
    setsecondPartMounts: (isMounted: boolean) => void;
    email: string;
    phone: string;
}





const RegisterionSecondPart: React.FC<RegisterionFirstPartProps> = ({phone,email,setEmail, setPhone, setisSecondPartFlagCheck, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts}) => {
    const { theme } = useContext(ThemeContext);
    const [isChecked, setisChecked] = useState(false);
    const [isTypedWrongEmailFormat, setisTypedWrongEmailFormat] = useState(false);
    const [isTypedWrongPhoneFormat, setisTypedWrongPhoneFormat] = useState(false);
    const handleNextBtn = async () => {
        const { isEmailValid, isPhoneValid } = await verifyUserInputs(email, phone);

        if (isEmailValid && isPhoneValid) {
            const phoneNumberString = phone.toString();
    
            setEmail(email);
            setPhone(phoneNumberString);
            setisSecondPartFlagCheck(true);
        } else {
            if(!isEmailValid){
                setisTypedWrongEmailFormat(true);
                setEmail('');
                if(isPhoneValid){
                    setisTypedWrongPhoneFormat(false);
                }
            }
            if(!isPhoneValid){
                setisTypedWrongPhoneFormat(true);
                setPhone('')
                if(isEmailValid){
                    setisTypedWrongEmailFormat(false);
                }
            }
        }
    }

    useEffect(() => {
        setsecondPartMounts(true);
        setfirstPartMounts(false);
        setthirdPartMounts(false);
    }, []);

    const verifyUserInputs = async (email: string, phone: string) => {      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;
    
        let isEmailValid = emailPattern.test(email);
        let isPhoneValid = phonePattern.test(phone);
    
        return { isEmailValid, isPhoneValid };
    };
    
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>

                        <FIInput
                            isTypedWrongFormat={isTypedWrongEmailFormat}
                            setisTypedWrongFormat={setisTypedWrongEmailFormat}
                            placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
                            label={englishTranslationedSentences.emailLabelText}
                            onChangeText={(email: string) => {setEmail(email)}}
                            value={email}
                            errorMessage={englishTranslationedSentences.invalidEmailAddress}
                            placeholderError={englishTranslationedSentences.placeHolderEmailErrorMessage}
                            bottomErrorMessage={englishTranslationedSentences.validEmailExample}
                            startValue={email}
                        />
                        <FIInput
                            isTypedWrongFormat={isTypedWrongPhoneFormat}
                            setisTypedWrongFormat={setisTypedWrongPhoneFormat}
                            placeholder={englishTranslationedSentences.yourPhoneNumberText}
                            label={englishTranslationedSentences.phoneText}
                            onChangeText={(phone: string) => {setPhone(phone)}}
                            value={phone}
                            errorMessage={englishTranslationedSentences.invalidPhoneNumber}
                            placeholderError={englishTranslationedSentences.enterValidPhoneNumber}
                            bottomErrorMessage={englishTranslationedSentences.phoneNumberBottomError}
                            startValue={phone}
                            numeric={true}
                            maxLength={10}
                        />
                        <FIButton
                            text={englishTranslationedSentences.nextText}
                            disabled={email === '' || phone === ''} 
                            onPress={() => {
                                setisChecked(true);
                                handleNextBtn();
                            }}
                            disabledBackgroundColor={theme.Elements.ButtonDisabled}
                            backGroundColor={theme.Main.Black}
                            textColor={theme.Text.ButtonText}
                            borderRadius={10}
                        />
        </StyledWrapper>
    );
};

export default RegisterionSecondPart;