/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import StyledWrapper from '../components/uicomponents/StyledWrapper';
import ArrowBack from '../components/uicomponents/ArrowBack';
import TitleAndSubTitle from '../components/uicomponents/TitleAndSubTitle';
import { englishTranslationedSentences } from '../utils/sentences';
import FIInput from '../components/uicomponents/FIInput';
import FIButton from '../components/uicomponents/FIButton';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import { emailSchema } from '../utils/statements';
import SentenceBtn from '../components/uicomponents/SentenceBtn';
import SendOtpToEmail from '../components/uicomponents/ForgotPasswordComps/SendOtpToEmail';

const ForgotPassword: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [otpNumber, setOtpNumber] = useState('');


  return (  
    <StyledWrapper style={{backgroundColor: theme.Background.White , flex: 1}} route={'ForgotPassword'}>
<SendOtpToEmail setOtpNumber={setOtpNumber}/>
    </StyledWrapper>
  );
};

export default ForgotPassword;