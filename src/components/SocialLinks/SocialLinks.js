import { View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions, Image } from 'react-native';
import { COLORS } from '../../constants';

const { height } = Dimensions.get('window');

const socialLinks = [
  { name: 'Web', icon: require('../../../assets/icons/browser.png'), url: 'https://example.com' },
  { name: 'Facebook', icon: require('../../../assets/icons/facebook.png'), url: 'https://facebook.com' },
  { name: 'Instagram', icon: require('../../../assets/icons/instagram.png'), url: 'https://instagram.com' },
  { name: 'X', icon: require('../../../assets/icons/x.png'), url: 'https://x.com' },
];

export default function SocialLinks() {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SÍGUENOS</Text>
      <View style={styles.linksContainer}>
        {socialLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkButton}
            onPress={() => handlePress(link.url)}
          >
            <Image source={link.icon} style={styles.icon} />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.02,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 10,
    color: COLORS.textLight,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  linkButton: {
    alignItems: 'center',
    minWidth: 60,
    marginHorizontal: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
