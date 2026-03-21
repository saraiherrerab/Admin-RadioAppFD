import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

export default function Header({ onNotificationPress }) {
  return (
    <LinearGradient
      colors={['#9333EA', '#3B82F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Image 
          source={require('../../../assets/icons/radiologo.png')} 
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Estrella FM</Text>
        <Text style={styles.tagline}>Tu música, tu radio</Text>
      </View>
      <TouchableOpacity 
        style={styles.notificationButton}
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
  },
  notificationButton: {
    padding: 8,
    marginLeft: 8,
  },
});
