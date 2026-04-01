import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DynamicBackground, NowPlaying, PlayButton, Footer, Schedule, NotificationPanel } from '../components';
import LiveIndicator from '../components/LiveIndicator';
import RadioList from '../components/RadioList';
import SoundWaves from '../components/SoundWaves';
import { audioPlayer, apiService } from '../services';
import { getCoverSource } from '../utils/coverArtHelper';
import { RADIO_CONFIG } from '../config';
import { COLORS } from '../constants';

const METADATA_REFRESH_INTERVAL = 10000; // 10 segundos

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(RADIO_CONFIG.radios[0]);
  const [nowPlaying, setNowPlaying] = useState({ 
    song: selectedRadio.name, 
    artist: 'Tu música, tu radio' 
  });

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
    if (selectedRadio.metadataUrl) {
      const metadata = await apiService.getNowPlaying();
      setNowPlaying(metadata);
    }
  };

  const handleSelectRadio = async (radio) => {
    // Si está reproduciendo, detener el audio actual
    if (isPlaying) {
      await audioPlayer.stop();
      setIsPlaying(false);
    }

    // Cambiar a la nueva radio
    setSelectedRadio(radio);
    setNowPlaying({
      song: radio.name,
      artist: 'Tu música, tu radio',
    });
  };

  const handlePlayPress = async () => {
    try {
      if (isPlaying) {
        await audioPlayer.stop();
        setIsPlaying(false);
      } else {
        await audioPlayer.play(selectedRadio.streamUrl);
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

  const coverSource = getCoverSource(nowPlaying.coverUrl);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <DynamicBackground imageSource={coverSource}>
        {/* Animación de ondas de sonido */}
        <SoundWaves isPlaying={isPlaying} />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <NowPlaying 
            song={nowPlaying.song} 
            artist={nowPlaying.artist}
            coverUrl={nowPlaying.coverUrl}
          />
          
          <View style={styles.playButtonContainer}>
            <PlayButton onPress={handlePlayPress} isPlaying={isPlaying} />
            <LiveIndicator 
              isLive={isPlaying}
              viewerCount={RADIO_CONFIG.viewers.count}
              showViewers={RADIO_CONFIG.viewers.enabled}
            />
          </View>
          
          <Schedule />

          {/* Lista de radios */}
          <RadioList
            radios={RADIO_CONFIG.radios}
            selectedRadioId={selectedRadio.id}
            onSelectRadio={handleSelectRadio}
            currentCoverSource={coverSource}
          />
        </ScrollView>
        
        <Footer />

        <NotificationPanel 
          visible={showNotifications}
          onClose={handleCloseNotifications}
        />
      </DynamicBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    paddingVertical: 10,
    gap: 12,
    zIndex: 1,
  },
  playButtonContainer: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    paddingVertical: 16,
  },
});
