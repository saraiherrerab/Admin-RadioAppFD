// Configuración de API y servicios
// TODO: Cambiar esta URL por la de tu backend real
const API_BASE_URL = 'https://api.example.com';

export const apiService = {
  // ============ METADATOS ============
  // GET /metadata/now-playing
  // Respuesta: { song: string, artist: string, album?: string, coverUrl?: string }
  getNowPlaying: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/metadata/now-playing`);
      if (!response.ok) throw new Error('Error al obtener metadatos');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo now playing:', error);
      return { song: 'Estrella FM', artist: 'Tu música, tu radio' };
    }
  },

  // ============ PROGRAMACIÓN ============
  // GET /schedule
  // Respuesta: [{ id, name, day, schedule, host, description }]
  getSchedule: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule`);
      if (!response.ok) throw new Error('Error al obtener programación');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo programación:', error);
      throw error;
    }
  },

  // POST /schedule
  // Body: { name, day, startTime, endTime, host, description }
  createProgram: async (programData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
      });
      if (!response.ok) throw new Error('Error al crear programa');
      return await response.json();
    } catch (error) {
      console.error('Error creando programa:', error);
      throw error;
    }
  },

  // PUT /schedule/:id
  // Body: { name, day, startTime, endTime, host, description }
  updateProgram: async (id, programData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
      });
      if (!response.ok) throw new Error('Error al actualizar programa');
      return await response.json();
    } catch (error) {
      console.error('Error actualizando programa:', error);
      throw error;
    }
  },

  // DELETE /schedule/:id
  deleteProgram: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar programa');
      return await response.json();
    } catch (error) {
      console.error('Error eliminando programa:', error);
      throw error;
    }
  },

  // ============ NOTIFICACIONES ============
  // GET /notifications
  // Respuesta: [{ id, title, message, time, active }]
  getNotifications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`);
      if (!response.ok) throw new Error('Error al obtener notificaciones');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo notificaciones:', error);
      throw error;
    }
  },

  // POST /notifications
  // Body: { title, message }
  createNotification: async (notificationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData),
      });
      if (!response.ok) throw new Error('Error al crear notificación');
      return await response.json();
    } catch (error) {
      console.error('Error creando notificación:', error);
      throw error;
    }
  },

  // PUT /notifications/:id
  // Body: { title, message, active }
  updateNotification: async (id, notificationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData),
      });
      if (!response.ok) throw new Error('Error al actualizar notificación');
      return await response.json();
    } catch (error) {
      console.error('Error actualizando notificación:', error);
      throw error;
    }
  },

  // DELETE /notifications/:id
  deleteNotification: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar notificación');
      return await response.json();
    } catch (error) {
      console.error('Error eliminando notificación:', error);
      throw error;
    }
  },

  // ============ CONFIGURACIÓN ============
  // GET /config
  // Respuesta: { streamUrl, website, facebook, instagram, twitter }
  getConfig: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/config`);
      if (!response.ok) throw new Error('Error al obtener configuración');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo configuración:', error);
      throw error;
    }
  },

  // PUT /config
  // Body: { streamUrl, website, facebook, instagram, twitter }
  updateConfig: async (configData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData),
      });
      if (!response.ok) throw new Error('Error al actualizar configuración');
      return await response.json();
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      throw error;
    }
  },
};
