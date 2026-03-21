import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { height } = Dimensions.get('window');

export default function PlayButton({ onPress, isPlaying = false }) {
  const buttonSize = Math.min(height * 0.09, 70);
  
  return (
    <TouchableOpacity 
      style={[styles.button, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]} 
      onPress={onPress}
    >
      <Text style={styles.icon}>{isPlaying ? '⏸' : '▶'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  icon: {
    fontSize: 28,
    color: COLORS.white,
    marginLeft: 3,
  },
});
