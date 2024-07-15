/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import { verifypasswordUserInputs } from '../../../utils/verifications';
import FIInput from '../FIInput';
import { englishTranslationedSentences } from '../../../utils/sentences';
import FIButton from '../FIButton';
import { ThemeContext } from '../../../context/ThemeContext';
interface Props {
    setNewUserPassword: (newPassword: string) => void;
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    setconfirmPassword: (confirmPassword: string) => void;
    setPassword: (password: string) => void;

}

const ResetPassword: React.FC<Props> = ({ setNewUserPassword, isLoading,password,setPassword,confirmPassword, setconfirmPassword}) => {
    const { theme } = useContext(ThemeContext);
    const [isTypedWrongPasswordFormat, setisTypedWrongPasswordFormat] = useState(false);
    const [isTypedWrongconfirmPasswordFormat, setisTypedWrongconfirmPasswordFormat] = useState(false);
    const handleFormSubmit = async () => {
        const { isPasswordValid, isConfirmPasswordValid } = await verifypasswordUserInputs(password, confirmPassword);

            if(!isPasswordValid){
                setisTypedWrongPasswordFormat(true);
                setPassword('');
                if(isConfirmPasswordValid){
                    setisTypedWrongconfirmPasswordFormat(false);
                }

            }
            else if(!isConfirmPasswordValid){
                setisTypedWrongconfirmPasswordFormat(true);
                setconfirmPassword('');
                if(isPasswordValid){
                    setisTypedWrongPasswordFormat(false);
                }
        }
        else{
            setNewUserPassword(password);
        }
    }
  return (
    <View>

<FIInput
                        isTypedWrongFormat={isTypedWrongPasswordFormat}
                        setisTypedWrongFormat={setisTypedWrongPasswordFormat}
                        placeholder={englishTranslationedSentences.yourPasswordPlaceholder}
                        label={englishTranslationedSentences.passwordLabelText}
                        onChangeText={(password: string) => {setPassword(password);}}
                        value={password}
                        errorMessage={englishTranslationedSentences.useAllRequiredCharacters}
                        placeholderError={englishTranslationedSentences.enterAValidPassword}
                        bottomErrorMessage={englishTranslationedSentences.passwordHelpers}
                        startValue={password}
                        />
                        <FIInput
                        isTypedWrongFormat={isTypedWrongconfirmPasswordFormat}
                        setisTypedWrongFormat={setisTypedWrongconfirmPasswordFormat}
                        placeholder={englishTranslationedSentences.confirmYourPasswordText}
                        label={englishTranslationedSentences.confirmPasswordText}
                        onChangeText={(confirmPassword: string) => {setconfirmPassword(confirmPassword)}}
                        value={confirmPassword}
                        errorMessage={englishTranslationedSentences.confirmPasswordError}
                        startValue={confirmPassword}
                        />
                <View style={{gap: 12,flexDirection: 'row', alignItems: 'center',marginLeft: '5%'}}>

            
                    </View>
                        <FIButton
                            text={englishTranslationedSentences.resetPasswordText}
                            disabled={(password === '' && confirmPassword === '') || isLoading} 
                            onPress={() => {
                                handleFormSubmit();
                            }}
                            disabledBackgroundColor={theme.Elements.ButtonDisabled}
                            backGroundColor={theme.Main.Black}
                            textColor={theme.Text.ButtonText}
                            borderRadius={10}
                        />

    </View>
  );
};

export default ResetPassword;