/* eslint-disable prettier/prettier */
import React,{useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useDataContext } from '../../context/DataContext';
import CheckBox from 'react-native-check-box'
import { englishTranslationedSentences } from '../../utils/sentences';
import { ThemeContext } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIButton from '../uicomponents/FIButton';

interface PrivacyPolicyModalProps {
  modalVisiblity: boolean;
  setmodalVisibility: (isVisible: boolean) => void;
  setisModalChecked: (isChecked: boolean) => void;
  setToggleCheckBox: (isToggle: boolean) => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({modalVisiblity, setmodalVisibility,  setisModalChecked, setToggleCheckBox}) => {
    const [isModalReachEnd, setisModalReachEnd] = useState(false);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const { theme } = useContext(ThemeContext);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adjust the threshold as needed
    setisModalReachEnd(isEndReached);
  };

  
    return (
        <View style={[styles.centeredView]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisiblity}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setmodalVisibility(!modalVisiblity);
                }}>
                <View style={[styles.centeredView]}>
                    <View style={[styles.modalView, { height: screenHeight * 0.84, width: screenWidth, borderWidth: 1 }]}>
                        <View>
                            <Icon onPress={() => { setmodalVisibility(!modalVisiblity) 
                              setisModalReachEnd(false);
                            }} name='remove' color={'black'} size={24} style={{ alignSelf: 'flex-end', marginRight: '4%', marginTop: '4%' }} />
                        </View>
                        <ScrollView style={{ margin: '4%', marginTop: '5%', flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>
                            <Text style={[styles.checkboxTextStyle, { color: theme.Main.Black }]}>
                                {englishTranslationedSentences.termsAndPoliciesText}
                            </Text>
                        </ScrollView>
                        <FIButton
                            borderRadius={10}
                            textColor={theme.Text.ButtonText}
                            disabledBackgroundColor={theme.Elements.ButtonDisabled}
                            backGroundColor={theme.Main.Black}
                            onPress={() => { 
                              setisModalChecked(true);
                              setmodalVisibility(false);
                              setToggleCheckBox(true);
                             }}
                            disabled={!isModalReachEnd}
                            text={englishTranslationedSentences.acceptText}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        padding: '2%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
    checkboxTextStyle: {
        fontFamily: 'Noto Sans',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
    }
});

export default PrivacyPolicyModal;
