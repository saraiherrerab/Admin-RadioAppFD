export const RADIO_CONFIG = {
  viewers: {
    enabled: true, // true para mostrar contador, false para ocultarlo
    count: 1, // Número de oyentes (puede ser dinámico)
  },
  radios: [
    {
      id: 1,
      name: 'Estrella FM',
      streamUrl: 'https://streamingned.com:7190/stream',
      metadataUrl: null,
      logo: require('../assets/icons/radiologo.png'),
    },
    {
      id: 2,
      name: 'Radio 2',
      streamUrl: 'https://example.com/radio2/stream',
      metadataUrl: null,
      logo: require('../assets/icons/radiologo.png'),
    },
    {
      id: 3,
      name: 'Radio 3',
      streamUrl: 'https://example.com/radio3/stream',
      metadataUrl: null,
      logo: require('../assets/icons/radiologo.png'),
    },
  ],
};
