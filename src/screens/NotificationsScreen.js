import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiService } from '../services';
import { COLORS } from '../constants';

export default function NotificationsScreen() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [editingNotification, setEditingNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getNotifications();
      setNotifications(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar las notificaciones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNotification = () => {
    setEditingNotification(null);
    setTitle('');
    setMessage('');
    setShowModal(true);
  };

  const handleEditNotification = (notification) => {
    setEditingNotification(notification);
    setTitle(notification.title);
    setMessage(notification.message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNotification(null);
    setTitle('');
    setMessage('');
  };

  const handleSaveNotification = async () => {
    if (!title || !message) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      if (editingNotification) {
        // Actualizar notificación existente
        await apiService.updateNotification(editingNotification.id, {
          title,
          message,
          active: editingNotification.active
        });
      } else {
        // Crear nueva notificación
        await apiService.createNotification({ title, message });
      }

      await loadNotifications();
      handleCloseModal();
      Alert.alert('Éxito', editingNotification ? 'Notificación actualizada' : 'Notificación creada');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la notificación');
    }
  };

  const handleDeleteNotification = async (id) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar esta notificación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.deleteNotification(id);
              await loadNotifications();
              Alert.alert('Éxito', 'Notificación eliminada');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la notificación');
            }
          }
        }
      ]
    );
  };

  const handleToggleActive = async (id) => {
    try {
      const notification = notifications.find(n => n.id === id);
      await apiService.updateNotification(id, {
        ...notification,
        active: !notification.active
      });
      await loadNotifications();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <Text style={styles.sectionSubtitle}>
            Administra las notificaciones que ven los usuarios
          </Text>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddNotification}>
            <Text style={styles.addButtonText}>+ Agregar notificación</Text>
          </TouchableOpacity>

          {/* Notification Cards */}
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <View key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationInfo}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  <View style={styles.notificationActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleToggleActive(notification.id)}
                    >
                      <View style={[
                        styles.toggleSwitch,
                        notification.active && styles.toggleSwitchActive
                      ]}>
                        <View style={[
                          styles.toggleThumb,
                          notification.active && styles.toggleThumbActive
                        ]} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={styles.notificationMessage}>{notification.message}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditNotification(notification)}
                  >
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteNotification(notification.id)}
                  >
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No hay notificaciones configuradas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal para agregar/editar notificación */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>
                  {editingNotification ? 'Editar notificación' : 'Nueva notificación'}
                </Text>
                <Text style={styles.modalSubtitle}>
                  {editingNotification ? 'Actualiza la información' : 'Completa la información'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                {/* Título */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Título</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Ej: Nuevo programa"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Mensaje */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Mensaje</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Escribe el mensaje de la notificación..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Botón guardar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveNotification}>
                  <Text style={styles.saveButtonText}>
                    {editingNotification ? 'Actualizar' : 'Guardar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  addButton: {
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationActions: {
    marginLeft: 12,
  },
  actionButton: {
    padding: 4,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1D5DB',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#9333EA',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#9333EA',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#9333EA',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: '70%',
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalHeaderText: {
    flex: 1,
    paddingRight: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 24,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
    lineHeight: 18,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  modalScroll: {
    flex: 1,
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1F2937',
  },
  textArea: {
    minHeight: 100,
    maxHeight: 150,
    paddingTop: 14,
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
