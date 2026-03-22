import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NowPlaying, PlayButton, SocialLinks, Footer, Schedule, NotificationPanel } from '../components';
import { audioPlayer } from '../services';
import { COLORS } from '../constants';

const STREAM_URL = 'https://streamingned.com:7190/stream';

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    audioPlayer.initialize();
    
    return () => {
      audioPlayer.stop();
    };
  }, []);

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
          song="Blinding Lights" 
          artist="The Weeknd" 
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
