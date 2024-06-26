import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../../context/ThemeContext';

interface SentenceCarouselProps {
  sentences: string[];
}

const SentenceCarousel: React.FC<SentenceCarouselProps> = ({ sentences }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get('window');
  const { theme } = useContext(ThemeContext);

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotsContainer}>
        {sentences.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,{
                backgroundColor: index === activeIndex ? theme.Elements.ButtonPressed : theme.Elements.ButtonDisabled
              }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{width: screenWidth, flex: 1}}>
      <View style={styles.dotCon}>
        {renderDotIndicator()}
      </View>
      
      <Carousel
      width={screenWidth}
        loop
        style={{marginTop: 20}}
        height={90} // Adjust this value as needed
        data={sentences}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              justifyContent: 'center',
              width: 328,
              alignSelf: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: theme.Main.Black, fontFamily:'Noto Sans', fontWeight: 400, lineHeight: 24 }}>
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dotCon: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SentenceCarousel;