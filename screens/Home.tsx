import React, {useState, useContext} from "react";
import { Text, View, SafeAreaView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useToken } from "../context/TokenContext";
import FIButton from "../components/uicomponents/FIButton";
const { theme } = useContext(ThemeContext);

const Home: React.FC = (props) => {
    const {currentUser} = useToken();
    console.log('currentUser message:', currentUser);
    const {logoutAttempt} = useToken();
    return (
        <View>
<FIButton text="logout" disabled={false} onPress={logoutAttempt}/>
        </View>
    )
}
export default Home