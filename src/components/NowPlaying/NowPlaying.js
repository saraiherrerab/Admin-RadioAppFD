import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AlbumArt } from '../AlbumArt';
import { getCoverSource, shouldShowDiskIcon } from '../../utils/coverArtHelper';
import { COLORS } from '../../constants';

const { height } = Dimensions.get('window');

export default function NowPlaying({ song, artist, coverUrl }) {
  const coverSource = getCoverSource(coverUrl);
  const showDiskIcon = shouldShowDiskIcon(coverUrl);

  return (
    <View style={styles.container}>
      <AlbumArt 
        imageSource={coverSource}
        showDiskIcon={showDiskIcon}
        size="medium"
      />
      
      <Text style={styles.nowPlayingLabel}>REPRODUCIENDO AHORA</Text>
      <Text style={styles.songTitle} numberOfLines={1}>{song}</Text>
      <Text style={styles.artistName} numberOfLines={1}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: 20,
  },
  nowPlayingLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: 8,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});
