// Funciones auxiliares reutilizables

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES');
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
