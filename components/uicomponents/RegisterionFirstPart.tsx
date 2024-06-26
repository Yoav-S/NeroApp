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

}

const validationSchema = Yup.object().shape({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
});
const RegisterionFirstPart: React.FC<RegisterionFirstPartProps> = ({setFirstName, setLastName, setisFirstPartFlagCheck, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts}) => {
    const { theme } = useContext(ThemeContext);

    const [isChecked, setisChecked] = useState(false);

    const handleNextBtn = async (values: { firstName: string; lastName: string }, formikHelpers: FormikHelpers<{ firstName: string; lastName: string }>) => {
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setisFirstPartFlagCheck(true);
    }
    useEffect(() => {
      setfirstPartMounts(true);
      setsecondPartMounts(false);
      setthirdPartMounts(false);
  }, []);
  return (
    <StyledWrapper  style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>
      
      <Formik
      initialValues={{firstName: '', lastName: ''}}
      validationSchema={validationSchema}
      onSubmit={handleNextBtn}>
      {({handleChange, handleSubmit, values, errors, isValid, dirty, touched}) => (
        <>
        <FIInput
        placeholder={englishTranslationedSentences.yourFirstNameText}
        label={englishTranslationedSentences.firstNameText}
        onChangeText={handleChange('firstName')}
        value={values.firstName}
        errorMessage={errors.firstName}
        startValue={values.firstName}
        onPress={() => {handleChange('firstName')('')}}
        />
        <FIInput
        placeholder={englishTranslationedSentences.yourLastNameText}
        label={englishTranslationedSentences.lastNameText}
        onChangeText={handleChange('lastName')}
        value={values.lastName}
        errorMessage={errors.lastName}
        startValue={values.lastName}
        onPress={() => {handleChange('lastName')('')}}
        />
        <FIButton
          text={englishTranslationedSentences.nextText}
          disabled={!isValid || (values.firstName === '' && values.lastName === '')} 
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
     ) }
        </Formik>

    </StyledWrapper>
  );
};

export default RegisterionFirstPart;