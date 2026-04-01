import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const AlbumArt = ({ imageSource, showDiskIcon = false, size = 'medium' }) => {
  const sizeStyles = {
    small: { width: width * 0.3, height: width * 0.3 },
    medium: { width: Math.min(width * 0.45, 200), height: Math.min(width * 0.45, 200) },
    large: { width: width * 0.6, height: width * 0.6 },
  };

  const containerSize = sizeStyles[size];

  return (
    <View style={[styles.container, containerSize]}>
      {/* Capa de fondo borrosa */}
      <Image
        source={imageSource}
        style={styles.backgroundImage}
        blurRadius={20}
      />
      
      {/* Overlay para suavizar el fondo */}
      <View style={styles.backgroundOverlay} />

      {/* Imagen principal nítida o ícono de disco */}
      {showDiskIcon ? (
        <View style={styles.diskIconContainer}>
          <Ionicons name="disc" size={containerSize.width * 0.5} color="#9333EA" />
        </View>
      ) : (
        <Image
          source={imageSource}
          style={styles.mainImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  backgroundOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  diskIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
