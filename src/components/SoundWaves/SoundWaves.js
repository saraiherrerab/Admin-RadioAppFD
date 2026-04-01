import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function SoundWaves({ isPlaying }) {
  const numberOfBars = 40;
  const animatedValues = useRef(
    Array.from({ length: numberOfBars }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isPlaying) {
      // Iniciar animaciones para todas las barras
      const animations = animatedValues.map((animatedValue, index) => {
        const duration = Math.random() * 500 + 300; // 300-800ms
        const delay = Math.random() * 200; // 0-200ms delay

        return Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: Math.random() * 0.7 + 0.3, // 0.3-1.0
              duration: duration,
              delay: delay,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.3,
              duration: duration,
              useNativeDriver: true,
            }),
          ])
        );
      });

      // Iniciar todas las animaciones
      animations.forEach(animation => animation.start());

      return () => {
        // Detener todas las animaciones
        animations.forEach(animation => animation.stop());
      };
    } else {
      // Resetear todas las barras a su valor inicial
      animatedValues.forEach(animatedValue => {
        animatedValue.setValue(0.3);
      });
    }
  }, [isPlaying]);

  if (!isPlaying) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barsContainer}>
        {animatedValues.map((animatedValue, index) => {
          const opacity = animatedValue.interpolate({
            inputRange: [0.3, 1.0],
            outputRange: [0.15, 0.35],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.bar,
                {
                  transform: [{ scaleY: animatedValue }],
                  opacity: opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 3,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
  },
});
