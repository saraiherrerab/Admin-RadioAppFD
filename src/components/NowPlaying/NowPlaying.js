import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

export default function NowPlaying({ song, artist }) {
  return (
    <View style={styles.container}>
      <View style={styles.albumArt}>
        <View style={styles.discIcon}>
          <View style={styles.discOuter}>
            <View style={styles.discInner} />
          </View>
        </View>
      </View>
      
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
    backgroundColor: '#E8E4F3',
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
  discIcon: {
    width: '50%',
    aspectRatio: 1,
  },
  discOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
    borderWidth: 6,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discInner: {
    width: '30%',
    height: '30%',
    borderRadius: 1000,
    backgroundColor: COLORS.primary,
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
