/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import { passwordSchema } from '../../../utils/statements';
import FIInput from '../FIInput';
import { englishTranslationedSentences } from '../../../utils/sentences';
import FIButton from '../FIButton';
import { ThemeContext } from '../../../context/ThemeContext';
interface Props {
    setPasswordChangedFlag: (isChanged: boolean) => void;
    setNewUserPassword: (newPassword: string) => void;
}
const validationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
});
const ResetPassword: React.FC<Props> = ({setPasswordChangedFlag, setNewUserPassword}) => {
    const { theme } = useContext(ThemeContext);

    const handleFormSubmit = (values: {password: string}) => {
        setNewUserPassword(values.password);
        setPasswordChangedFlag(true);
    }
  return (
    <View>
            <Formik
                initialValues={{password: '', confirmPassword: ''}}  // Initialize phone as an empty string
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({handleChange, handleSubmit, values, errors, isValid, dirty, touched}) => (
                    <>
                        <FIInput
                            placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                            label={englishTranslationedSentences.passwordLabelText}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            errorMessage={errors.password}
                            startValue={values.password}
                            onPress={() => {handleChange('password')('')}}
                        />
                        <FIInput
                            placeholder={englishTranslationedSentences.confirmYourPasswordText}
                            label={englishTranslationedSentences.confirmPasswordText}
                            onChangeText={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            errorMessage={errors.confirmPassword}
                            startValue={values.confirmPassword}
                            onPress={() => {handleChange('confirmPassword')('')}}
                        />
                <View style={{gap: 12,flexDirection: 'row', alignItems: 'center',marginLeft: '5%'}}>

            
                    </View>
                        <FIButton
                            text={englishTranslationedSentences.signUpText}
                            disabled={!isValid || (values.password === '' && values.confirmPassword === '')} 
                            onPress={() => {
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
    </View>
  );
};

export default ResetPassword;