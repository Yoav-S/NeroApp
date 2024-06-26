import React, { useContext } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
    amount: number;
    firstPartMounts: boolean;
    secondPartMounts: boolean;
    thirdPartMounts: boolean;
}

const DotsIndicator: React.FC<Props> = ({ amount, firstPartMounts, secondPartMounts, thirdPartMounts }) => {
    const { theme } = useContext(ThemeContext);
    const activeDotBackground = theme.Main.Black;
    const notActiveDotBackground = theme.Elements.ButtonDisabled;

    const dots = Array.from({ length: amount }, (_, index) => {
        let dotStyle: ViewStyle = {
            ...styles.dot,
            backgroundColor: notActiveDotBackground
        };
        if (
            (index === 0 && firstPartMounts) ||
            (index === 1 && secondPartMounts) ||
            (index === 2 && thirdPartMounts)
        ) {
            dotStyle = {
                ...dotStyle,
                ...styles.activeDot,
                backgroundColor: activeDotBackground
            };
        }
        return <View key={index} style={dotStyle} />;
    });

    return (
        <View style={styles.container}>
            <View style={styles.dotsWrapper}>
                {dots}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 100,
    },
    dotsWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        top: 15,
        left: 160,
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 10,
        margin: 5,
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 10,
    
    },
});

export default DotsIndicator;