import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiService } from '../services';
import { COLORS } from '../constants';

export default function AdminHomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [filterDay, setFilterDay] = useState('Todos');
  const [programName, setProgramName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [host, setHost] = useState('');
  const [description, setDescription] = useState('');
  const [editingProgram, setEditingProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar programación desde el backend
  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getSchedule();
      setPrograms(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la programación');
    } finally {
      setIsLoading(false);
    }
  };

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const filterDays = ['Todos', ...days];

  const filteredPrograms = filterDay === 'Todos' 
    ? programs 
    : programs.filter(program => program.day === filterDay);

  const handleAddProgram = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDayPicker(false);
    // Limpiar campos
    setSelectedDay('');
    setProgramName('');
    setStartTime('');
    setEndTime('');
    setHost('');
    setDescription('');
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setShowDayPicker(false);
  };

  const handleSaveProgram = async () => {
    if (!selectedDay || !programName || !startTime || !endTime || !host) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const programData = {
        name: programName,
        day: selectedDay,
        startTime,
        endTime,
        host,
        description
      };

      await apiService.createProgram(programData);
      await loadPrograms(); // Recargar la lista
      handleCloseModal();
      Alert.alert('Éxito', 'Programa creado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el programa');
    }
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setSelectedDay(program.day);
    setProgramName(program.name);
    const [start, end] = program.schedule.split(' - ');
    setStartTime(start);
    setEndTime(end);
    setHost(program.host);
    setDescription(program.description);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setShowDayPicker(false);
    setEditingProgram(null);
    // Limpiar campos
    setSelectedDay('');
    setProgramName('');
    setStartTime('');
    setEndTime('');
    setHost('');
    setDescription('');
  };

  const handleUpdateProgram = async () => {
    if (!selectedDay || !programName || !startTime || !endTime || !host) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const programData = {
        name: programName,
        day: selectedDay,
        startTime,
        endTime,
        host,
        description
      };

      await apiService.updateProgram(editingProgram.id, programData);
      await loadPrograms(); // Recargar la lista
      handleCloseEditModal();
      Alert.alert('Éxito', 'Programa actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el programa');
    }
  };

  const handleDeleteProgram = async (id) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar este programa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.deleteProgram(id);
              await loadPrograms();
              Alert.alert('Éxito', 'Programa eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el programa');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bloques de programación</Text>
          <Text style={styles.sectionSubtitle}>
            Administra la programación semanal de tu emisora
          </Text>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProgram}>
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>

          {/* Day Filter */}
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              {filterDays.slice(0, 4).map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.filterChip,
                    filterDay === day && styles.filterChipActive
                  ]}
                  onPress={() => setFilterDay(day)}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterDay === day && styles.filterChipTextActive
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterRow}>
              {filterDays.slice(4).map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.filterChip,
                    filterDay === day && styles.filterChipActive
                  ]}
                  onPress={() => setFilterDay(day)}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterDay === day && styles.filterChipTextActive
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Program Cards */}
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <View key={program.id} style={styles.programCard}>
                <View style={styles.programHeader}>
                  <View>
                    <Text style={styles.programName}>{program.name}</Text>
                    <Text style={styles.programDay}>{program.day}</Text>
                  </View>
                  <View style={styles.programActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleEditProgram(program)}
                    >
                      <Image 
                        source={require('../../assets/icons/edit.png')} 
                        style={styles.actionIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleDeleteProgram(program.id)}
                    >
                      <Image 
                        source={require('../../assets/icons/delete.png')} 
                        style={styles.actionIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text style={styles.programInfo}>Horario: {program.schedule}</Text>
                <Text style={styles.programInfo}>Conductor: {program.host}</Text>
                <Text style={styles.programInfo}>Descripción: {program.description}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No hay programas para {filterDay}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal para agregar programa */}
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
                <Text style={styles.modalTitle}>Nuevo bloque de programación</Text>
                <Text style={styles.modalSubtitle}>Completa la información del programa</Text>
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                {/* Fila 1: Día y Nombre del programa */}
                <View style={styles.formRow}>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Día</Text>
                    <TouchableOpacity 
                      style={styles.picker}
                      onPress={() => setShowDayPicker(!showDayPicker)}
                    >
                      <Text style={[styles.pickerText, !selectedDay && styles.placeholderText]}>
                        {selectedDay || 'Seleccionar'}
                      </Text>
                      <Text style={styles.pickerArrow}>▼</Text>
                    </TouchableOpacity>
                    {/* Opciones de día */}
                    {showDayPicker && (
                      <View style={styles.dayOptions}>
                        <ScrollView style={styles.dayOptionsScroll} nestedScrollEnabled>
                          {days.map((day) => (
                            <TouchableOpacity
                              key={day}
                              style={styles.dayOption}
                              onPress={() => handleSelectDay(day)}
                            >
                              <Text style={styles.dayOptionText}>{day}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.input}
                      value={programName}
                      onChangeText={setProgramName}
                      placeholder="Ej: La Mañanera"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                {/* Fila 2: Horarios */}
                <View style={styles.formRow}>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Hora de inicio</Text>
                    <TextInput
                      style={styles.input}
                      value={startTime}
                      onChangeText={setStartTime}
                      placeholder="--:-- --"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Hora de fin</Text>
                    <TextInput
                      style={styles.input}
                      value={endTime}
                      onChangeText={setEndTime}
                      placeholder="--:-- --"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                {/* Conductor */}
                <View style={styles.formGroupFull}>
                  <Text style={styles.label}>Conductor/a</Text>
                  <TextInput
                    style={styles.input}
                    value={host}
                    onChangeText={setHost}
                    placeholder="Nombre del conductor"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Descripción */}
                <View style={styles.formGroupFull}>
                  <Text style={styles.label}>Descripción</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe el contenido del programa..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Botón guardar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProgram}>
                  <Text style={styles.saveButtonText}>Guardar bloque</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal para editar programa */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>Editar bloque de programación</Text>
                <Text style={styles.modalSubtitle}>Actualiza la información del programa</Text>
              </View>
              <TouchableOpacity onPress={handleCloseEditModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                {/* Fila 1: Día y Nombre del programa */}
                <View style={styles.formRow}>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Día</Text>
                    <TouchableOpacity 
                      style={styles.picker}
                      onPress={() => setShowDayPicker(!showDayPicker)}
                    >
                      <Text style={[styles.pickerText, !selectedDay && styles.placeholderText]}>
                        {selectedDay || 'Seleccionar'}
                      </Text>
                      <Text style={styles.pickerArrow}>▼</Text>
                    </TouchableOpacity>
                    {/* Opciones de día */}
                    {showDayPicker && (
                      <View style={styles.dayOptions}>
                        <ScrollView style={styles.dayOptionsScroll} nestedScrollEnabled>
                          {days.map((day) => (
                            <TouchableOpacity
                              key={day}
                              style={styles.dayOption}
                              onPress={() => handleSelectDay(day)}
                            >
                              <Text style={styles.dayOptionText}>{day}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.input}
                      value={programName}
                      onChangeText={setProgramName}
                      placeholder="Ej: La Mañanera"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                {/* Fila 2: Horarios */}
                <View style={styles.formRow}>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Hora de inicio</Text>
                    <TextInput
                      style={styles.input}
                      value={startTime}
                      onChangeText={setStartTime}
                      placeholder="--:-- --"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View style={styles.formGroupHalf}>
                    <Text style={styles.label}>Hora de fin</Text>
                    <TextInput
                      style={styles.input}
                      value={endTime}
                      onChangeText={setEndTime}
                      placeholder="--:-- --"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>

                {/* Conductor */}
                <View style={styles.formGroupFull}>
                  <Text style={styles.label}>Conductor/a</Text>
                  <TextInput
                    style={styles.input}
                    value={host}
                    onChangeText={setHost}
                    placeholder="Nombre del conductor"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Descripción */}
                <View style={styles.formGroupFull}>
                  <Text style={styles.label}>Descripción</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe el contenido del programa..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                {/* Botón actualizar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProgram}>
                  <Text style={styles.saveButtonText}>Actualizar bloque</Text>
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
  programCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  programName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  programDay: {
    fontSize: 14,
    color: '#9333EA',
    fontWeight: '600',
    marginTop: 4,
  },
  programActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  actionIcon: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
  },
  programInfo: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  // Filter styles
  filterContainer: {
    gap: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  filterChipText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
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
    maxHeight: '85%',
    height: '85%',
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
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  formGroupHalf: {
    flex: 1,
    gap: 8,
    position: 'relative',
  },
  formGroupFull: {
    gap: 8,
    marginBottom: 8,
  },
  formGroup: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  pickerContainer: {
    position: 'relative',
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerText: {
    fontSize: 14,
    color: '#1F2937',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  pickerArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  dayOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginTop: 4,
    maxHeight: 180,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayOptionsScroll: {
    maxHeight: 180,
  },
  dayOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayOptionText: {
    fontSize: 14,
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
