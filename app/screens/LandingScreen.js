import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const images = [
  require('../assets/newPhoto.jpeg'),
  require('../assets/new3.jpeg'),
  require('../assets/new4.jpeg'),
];

const LandingScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }, 8000); 

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const GetStarted = () => {
    navigation.navigate("WelcomeScreen");
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((img, index) => (
            <Image key={index} source={img} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.overlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Locals</Text>
          </View>
          <Text style={styles.headline}>
            Find Work{'\n'}Hire Locally{'\n'}Grow Together
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Connecting everyday experts with those who need them most.
        </Text>

        <View style={styles.dotsContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.getStartedBtn} onPress={GetStarted}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  imageContainer: {
    height: height * 0.65,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  badge: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#00875A',
    fontWeight: '600',
    fontSize: 18,
  },
  headline: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    lineHeight: 34,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00875A',
  },
  getStartedBtn: {
    backgroundColor: '#00875A',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
