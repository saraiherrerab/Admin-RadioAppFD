import { View, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const DynamicBackground = ({ imageSource, children }) => {
  if (!imageSource) {
    // Fallback a gradiente oscuro cuando no hay imagen
    return (
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fondo con imagen desenfocada */}
      <ImageBackground
        source={imageSource}
        style={styles.background}
        blurRadius={15}
        resizeMode="cover"
      >
        {/* Overlay semi-transparente para mantener contraste */}
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Contenido de la aplicación */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    flex: 1,
  },
});
