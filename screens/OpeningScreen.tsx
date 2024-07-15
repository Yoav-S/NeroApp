import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { OpeningScreenProps } from '../utils/interfaces';
import { ThemeContext } from '../context/ThemeContext';
import FIButton from '../components/uicomponents/FIButton';
import Title from '../components/uicomponents/Title';
import { englishTranslationedSentences } from '../utils/sentences';
import SentenceCarousel from '../components/uicomponents/SentenceCarousel';
import { useToken } from '../context/TokenContext';
const OpeningScreen: React.FC<OpeningScreenProps> = () => {
  const { theme } = useContext(ThemeContext);
  const {loginAsAGuestAttempt} = useToken();

  const navigation = useNavigation<OpeningScreenProps['navigation']>();

  const loginAttempt = () => {

  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.Background.White }]}>
      <Title name='NERO' />
      
      <Image
        source={require('../assests/images/openingScreenImage.png')} 
        style={styles.image}
        resizeMode='contain'
      />   
      <View style={styles.dotsIndicatorAndSentencesCon}>
        <SentenceCarousel sentences={[
          englishTranslationedSentences.openingScreenSVContent1,
          englishTranslationedSentences.openingScreenSVContent2,
          englishTranslationedSentences.openingScreenSVContent3,
          englishTranslationedSentences.openingScreenSVContent4]}/>
      </View>
      <FIButton
        backGroundColor={theme.Main.Black}
        buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
        disabledBackgroundColor={theme.Elements.ButtonDisabled}
        textColor={theme.Text.ButtonText}
        text={englishTranslationedSentences.loginText}
        borderColor={theme.Text.SecondaryIcons}
        borderWidth={1}
        borderRadius={10}
        disabled={false}
        onPress={() => navigation.navigate('Login')}
      />
      <FIButton
        backGroundColor={theme.Text.ButtonText}
        buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
        disabledBackgroundColor={theme.Elements.ButtonDisabled}
        textColor={theme.Main.Black}
        borderColor={theme.Text.SecondaryIcons}
        borderWidth={1}
        borderRadius={10}
        text={englishTranslationedSentences.createAccountText}
        disabled={false}
        onPress={() => navigation.navigate('Signup')}
      />
      <TouchableOpacity style={{margin: '2%'}} onPress={() => {loginAttempt}}>
        <Text style={{color: theme.Main.Black, fontFamily: 'Noto Sans', fontWeight: '700', fontSize: 16, lineHeight: 20}}>{englishTranslationedSentences.continueAsAGuestText}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 190, // Adjust width and height according to your image size requirements
    height: 190,
    marginTop: 94,
    marginBottom: 75,
    marginVertical: 20,
  },
  dotsIndicatorAndSentencesCon: {
    height: 90, 
    marginBottom: 20,
  },
});

export default OpeningScreen;
