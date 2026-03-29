import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { apiService } from '../services';
import { COLORS } from '../constants';

export default function ConfigScreen() {
  const [streamUrl, setStreamUrl] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const config = await apiService.getConfig();
      setStreamUrl(config.streamUrl || '');
      setWebsite(config.website || '');
      setFacebook(config.facebook || '');
      setInstagram(config.instagram || '');
      setTwitter(config.twitter || '');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const configData = {
        streamUrl,
        website,
        facebook,
        instagram,
        twitter
      };
      
      await apiService.updateConfig(configData);
      Alert.alert('Éxito', 'Configuración actualizada correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la configuración');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración de transmisión</Text>
          <Text style={styles.sectionSubtitle}>
            Configura los detalles técnicos de tu emisora
          </Text>

          {/* URL de transmisión */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL de transmisión</Text>
            <TextInput
              style={styles.input}
              value={streamUrl}
              onChangeText={setStreamUrl}
              placeholder="https://stream.miradio.com/live"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          {/* Sitio web */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sitio web</Text>
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              placeholder="https://www.miradio.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          {/* Facebook */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Facebook</Text>
            <TextInput
              style={styles.input}
              value={facebook}
              onChangeText={setFacebook}
              placeholder="@miradio"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          {/* Instagram */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={instagram}
              onChangeText={setInstagram}
              placeholder="@miradio"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          {/* Twitter/X */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Twitter/X</Text>
            <TextInput
              style={styles.input}
              value={twitter}
              onChangeText={setTwitter}
              placeholder="@miradio"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          {/* Botón de guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Actualizar configuración</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    padding: 20,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: -8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
