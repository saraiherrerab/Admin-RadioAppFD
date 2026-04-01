// Helper functions para manejar la lógica de portadas

/**
 * Determina qué imagen mostrar basándose en la URL de la portada
 * @param {string} coverUrl - URL de la portada de iTunes o null
 * @returns {object} - Source de la imagen a mostrar
 */
export const getCoverSource = (coverUrl) => {
  // Para pruebas, usar discoportada.jpg
  return require('../../assets/icons/discoportada.jpg');
  
  // Para restaurar comportamiento original, descomentar:
  /*
  if (coverUrl) {
    return { uri: coverUrl };
  }
  
  // Fallback a portada por defecto o logo de la radio
  return require('../../assets/icons/discoportada.jpg');
  */
};

/**
 * Determina si mostrar el ícono del disco
 * @param {string} coverUrl - URL de la portada
 * @returns {boolean} - true si debe mostrar el ícono del disco
 */
export const shouldShowDiskIcon = (coverUrl) => {
  // Para pruebas, siempre mostrar la imagen
  return false;
  
  // Para restaurar comportamiento original, descomentar:
  /*
  return !coverUrl;
  */
};
