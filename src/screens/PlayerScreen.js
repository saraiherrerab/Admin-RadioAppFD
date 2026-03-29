import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NowPlaying, PlayButton, SocialLinks, Footer, Schedule, NotificationPanel } from '../components';
import { audioPlayer, apiService } from '../services';
import { COLORS } from '../constants';

const STREAM_URL = 'https://streamingned.com:7190/stream';
const METADATA_REFRESH_INTERVAL = 10000; // 10 segundos

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({ song: 'Estrella FM', artist: 'Tu música, tu radio' });

  useEffect(() => {
    audioPlayer.initialize();
    
    // Obtener metadatos iniciales
    fetchNowPlaying();

    // Actualizar metadatos cada 10 segundos
    const metadataInterval = setInterval(fetchNowPlaying, METADATA_REFRESH_INTERVAL);
    
    return () => {
      audioPlayer.stop();
      clearInterval(metadataInterval);
    };
  }, []);

  const fetchNowPlaying = async () => {
    const metadata = await apiService.getNowPlaying();
    setNowPlaying(metadata);
  };

  const handlePlayPress = async () => {
    try {
      if (isPlaying) {
        await audioPlayer.stop();
        setIsPlaying(false);
      } else {
        await audioPlayer.play(STREAM_URL);
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo reproducir la emisora');
      setIsPlaying(false);
    }
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NowPlaying 
          song={nowPlaying.song} 
          artist={nowPlaying.artist} 
        />
        
        <View style={styles.playButtonContainer}>
          <PlayButton onPress={handlePlayPress} isPlaying={isPlaying} />
        </View>
        
        <Schedule />
        
        <SocialLinks />
      </ScrollView>
      
      <Footer />

      <NotificationPanel 
        visible={showNotifications}
        onClose={handleCloseNotifications}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    gap: 24,
  },
  playButtonContainer: {
    alignItems: 'center',
  },
});
