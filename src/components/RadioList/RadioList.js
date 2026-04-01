import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default function RadioList({ radios, selectedRadioId, onSelectRadio, currentCoverSource }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {radios.map((radio) => {
          const isSelected = selectedRadioId === radio.id;
          const imageSource = isSelected && currentCoverSource ? currentCoverSource : radio.logo;
          
          return (
            <TouchableOpacity
              key={radio.id}
              style={[
                styles.radioCard,
                isSelected && styles.radioCardActive,
              ]}
              onPress={() => onSelectRadio(radio)}
            >
              <Image
                source={imageSource}
                style={[
                  styles.radioLogo,
                  isSelected && currentCoverSource && styles.coverImage,
                ]}
                resizeMode={isSelected && currentCoverSource ? "cover" : "contain"}
              />
              <Text
                style={[
                  styles.radioName,
                  isSelected && styles.radioNameActive,
                ]}
                numberOfLines={2}
              >
                {radio.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  radioCard: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  radioCardActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: COLORS.primary,
  },
  radioLogo: {
    width: 50,
    height: 50,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  radioName: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  radioNameActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
