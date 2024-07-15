import * as Yup from 'yup';

/* eslint-disable prettier/prettier */


  export const emailSchema = Yup.string().required('required') .email('Email address is wrong');

  export const passwordSchema = Yup.string() .required('required') .min(6, 'Password is wrong');
 
  export const fullnameSchema =  Yup.string().required('required').min(2,'Name must be have at least one letter');

  export const firstNameSchema =  Yup.string().required('required').min(2,'First Name is wrong');

  export const lastNameSchema =  Yup.string().required('required').min(2,'Last Name is wrong');

  export const phoneNumberSchema = Yup.string().matches(/^\d{10}$/, 'Phone number is wrong').required('Phone number is required');
  
  export const genderSchema = Yup.string() .required('required')

  export const birthDateSchema = Yup.string() .required('required')

  export const termsSchema = Yup.boolean() .required('required')

  export const otpCodeSchema = Yup.number().required('required').min(1000, 'OTP code must be 4 digits').max(9999, 'OTP code must be 4 digits'); 

  export const imageSchema = Yup.string().optional()

  export const categorySchema = Yup.string().required()

  export const descriptionSchema = Yup.string().required('Must Write Description').min(20, 'At list 20 letters')

  export const cardholderSchema = Yup.string().required('Must Write Cardholder').min(4, 'At list 4 characters')

  export const cardNumberSchema = Yup.string().required('Must write Card Number').min(16, 'Exactly 16 digits').max(16, 'Exactly 16 digits');

  export const cardTypeOptions = ['dankort', 'discover', 'mastercard', 'visa', 'amex'];

  export const cardTypeSchema = Yup.string().required('Must be one of the above types').oneOf(cardTypeOptions, 'Invalid card type');
  
  export const expirationDateSchema = Yup.string().required('Must be in this format: mm/yy').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format: mm/yy');
  
  export const cvvSchema = Yup.string().required('Must insert cvv number').min(3, 'exactly 3 digits').max(3, 'exactly 3 digits')

  export const isDefaultSchema = Yup.boolean()