import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

export default function NowPlaying({ song, artist }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E8D5F5', '#D4E4F7', '#E8D5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.albumArt}
      >
        <Image 
          source={require('../../../assets/icons/DISK.png')} 
          style={styles.diskImage}
        />
      </LinearGradient>
      
      <Text style={styles.nowPlayingLabel}>REPRODUCIENDO AHORA</Text>
      <Text style={styles.songTitle} numberOfLines={1}>{song}</Text>
      <Text style={styles.artistName} numberOfLines={1}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: 20,
  },
  albumArt: {
    width: width * 0.45,
    maxWidth: 200,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  diskImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  nowPlayingLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    letterSpacing: 1,
    marginBottom: 6,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
