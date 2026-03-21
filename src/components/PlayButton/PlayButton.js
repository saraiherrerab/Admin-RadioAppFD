import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const { height } = Dimensions.get('window');

export default function PlayButton({ onPress, isPlaying = false }) {
  const buttonSize = Math.min(height * 0.09, 70);
  
  return (
    <TouchableOpacity 
      style={[styles.button, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]} 
      onPress={onPress}
    >
      {isPlaying ? (
        <Ionicons name="stop" size={28} color={COLORS.white} />
      ) : (
        <Ionicons name="play" size={28} color={COLORS.white} style={styles.playIcon} />
      )}
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
  playIcon: {
    marginLeft: 3,
  },
});
