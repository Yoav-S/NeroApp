import React, {useState, useContext, useEffect} from "react";
import StyledWrapper from './StyledWrapper';
import { ThemeContext } from "../../context/ThemeContext";
import FIInput from "./FIInput";
import { englishTranslationedSentences } from "../../utils/sentences";
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import { firstNameSchema, lastNameSchema } from "../../utils/statements";
import FIButton from "./FIButton";
interface RegisterionFirstPartProps {
  setisFirstPartFlagCheck: (isChecked: boolean) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setthirdPartMounts: (isMounted: boolean) => void;
  setfirstPartMounts: (isMounted: boolean) => void;
  setsecondPartMounts: (isMounted: boolean) => void;
  firstName: string;
  lastName: string;
}

const validationSchema = Yup.object().shape({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
});
const RegisterionFirstPart: React.FC<RegisterionFirstPartProps> = ({setFirstName, setLastName, setisFirstPartFlagCheck, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts, firstName, lastName}) => {
    const { theme } = useContext(ThemeContext);

    const [isChecked, setisChecked] = useState(false);
    const [isTypedWrongFirstNameFormat, setisTypedWrongFirstNameFormat] = useState(false);
    const [isTypedWrongLastNameFormat, setisTypedWrongLastNameFormat] = useState(false);
    
    const capitalizeFirstLetter = (name: string) => {
      return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
    const handleNextBtn = async () => {
      console.log('arrived handleNext');
      const { isfirstNameValid, islastNameValid } = await verifyUserInputs(firstName, lastName);
      if(isfirstNameValid && islastNameValid){
        const capitalizedFirstName = capitalizeFirstLetter(firstName);
        const capitalizedLastName = capitalizeFirstLetter(lastName);
        setFirstName(capitalizedFirstName);
        setLastName(capitalizedLastName);
        setisFirstPartFlagCheck(true);
      }
      else{
        if(!isfirstNameValid){
          setisTypedWrongFirstNameFormat(true);
          setFirstName('');
          if(islastNameValid){
            setisTypedWrongLastNameFormat(false);
          }
        }
        if(!islastNameValid){
          setisTypedWrongLastNameFormat(true);
          setLastName('');
          if(isfirstNameValid){
            setisTypedWrongFirstNameFormat(false);
          }
        }
      }
    }

    const verifyUserInputs = async (firstName: string, lastName: string) => {      
      const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
      let isfirstNameValid = namePattern.test(firstName) && firstName.length >= 2;
      let islastNameValid = namePattern.test(lastName) && lastName.length >= 2;
      
      return {isfirstNameValid, islastNameValid};
  };
  










    useEffect(() => {
      setfirstPartMounts(true);
      setsecondPartMounts(false);
      setthirdPartMounts(false);
  }, []);
  return (
    <StyledWrapper  style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>
      
        <FIInput
        isTypedWrongFormat={isTypedWrongFirstNameFormat}
        setisTypedWrongFormat={setisTypedWrongFirstNameFormat}
        placeholder={englishTranslationedSentences.yourFirstNameText}
        label={englishTranslationedSentences.firstNameText}
        onChangeText={(firstName: string) => {setFirstName(firstName)}}
        value={firstName}
        errorMessage={englishTranslationedSentences.firstlastNameLabelError}
        placeholderError={englishTranslationedSentences.placeholderErrorenterAValidName}
        bottomErrorMessage={englishTranslationedSentences.firstlastNameBottomError}
        startValue={firstName}
        />
        <FIInput
        errorMessage={englishTranslationedSentences.firstlastNameLabelError}
        placeholderError={englishTranslationedSentences.placeholderErrorenterAValidName}
        bottomErrorMessage={englishTranslationedSentences.firstlastNameBottomError}
        isTypedWrongFormat={isTypedWrongLastNameFormat}
        setisTypedWrongFormat={setisTypedWrongLastNameFormat}
        placeholder={englishTranslationedSentences.yourLastNameText}
        label={englishTranslationedSentences.lastNameText}
        onChangeText={(lastName: string) => {setLastName(lastName)}}
        value={lastName}
        startValue={lastName}
        />
        <FIButton
          text={englishTranslationedSentences.nextText}
          disabled={firstName === '' || lastName === ''} 
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

export default RegisterionFirstPart;