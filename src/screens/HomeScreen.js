import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import AdminHomeScreen from './AdminHomeScreen';
import NotificationsScreen from './NotificationsScreen';
import ConfigScreen from './ConfigScreen';
import PlayerScreen from './PlayerScreen';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, icon: require('../../assets/icons/calendar.png'), label: 'Programación' },
    { id: 1, icon: require('../../assets/icons/notification-bell.png'), label: 'Notificaciones' },
    { id: 2, icon: require('../../assets/icons/settings.png'), label: 'Configuración' },
    { id: 3, icon: require('../../assets/icons/play.png'), label: 'Reproducción' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <AdminHomeScreen />;
      case 1:
        return <NotificationsScreen />;
      case 2:
        return <ConfigScreen />;
      case 3:
        return <PlayerScreen />;
      default:
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Sección en desarrollo
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9333EA', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image 
                source={require('../../assets/icons/radiologo.png')} 
                style={styles.radioLogo}
              />
              <View>
                <Text style={styles.headerTitle}>Estrella FM</Text>
                <Text style={styles.headerSubtitle}>Tu música, tu radio</Text>
              </View>
            </View>
          </View>

          {/* Tab Bar */}
          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Image 
                  source={tab.icon} 
                  style={[
                    styles.tabIcon,
                    activeTab === tab.id && styles.activeTabIcon
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  tabIcon: {
    width: 18,
    height: 18,
    tintColor: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabIcon: {
    tintColor: '#9333EA',
  },
  content: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
