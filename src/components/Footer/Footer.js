import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants';

export default function Footer() {
  return (
    <LinearGradient
      colors={['#9333EA', '#3B82F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.text}>Información de canciones cortesía de iTunes</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'center',
  },
});
