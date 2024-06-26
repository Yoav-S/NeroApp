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

}

// Update the validation schema if necessary
const validationSchema = Yup.object().shape({
    email: emailSchema,
    phone: phoneNumberSchema,
});

// Define an interface for your form values
interface FormValues {
    email: string;
    phone: string;  // Changed to string
}

const RegisterionSecondPart: React.FC<RegisterionFirstPartProps> = ({setEmail, setPhone, setisSecondPartFlagCheck, setthirdPartMounts,setsecondPartMounts, setfirstPartMounts}) => {
    const { theme } = useContext(ThemeContext);
    const [isChecked, setisChecked] = useState(false);

    const handleNextBtn = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      setEmail(values.email);
      setPhone(values.phone);
      setisSecondPartFlagCheck(true);
    }

    useEffect(() => {
        setsecondPartMounts(true);
        setfirstPartMounts(false);
        setthirdPartMounts(false);
    }, []);
    return (
        <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'Signup'}>
            <Formik<FormValues>
                initialValues={{email: '', phone: ''}}  // Initialize phone as an empty string
                validationSchema={validationSchema}
                onSubmit={handleNextBtn}
            >
                {({handleChange, handleSubmit, values, errors, isValid, dirty, touched}) => (
                    <>
                        <FIInput
                            placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
                            label={englishTranslationedSentences.emailLabelText}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            errorMessage={errors.email}
                            startValue={values.email}
                            onPress={() => {handleChange('email')('')}}
                        />
                        <FIInput
                            placeholder={englishTranslationedSentences.yourPhoneNumberText}
                            label={englishTranslationedSentences.yourPhoneNumberText}
                            onChangeText={handleChange('phone')}
                            value={values.phone}
                            errorMessage={errors.phone}
                            startValue={values.phone}
                            onPress={() => {handleChange('phone')('')}}
                            numeric={true}
                            maxLength={10}
                        />
                        <FIButton
                            text={englishTranslationedSentences.nextText}
                            disabled={!isValid || (values.email === '' && values.phone === '')} 
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
        </StyledWrapper>
    );
};

export default RegisterionSecondPart;