import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { COLORS } from '../constants';

export default function AdminHomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [programName, setProgramName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [host, setHost] = useState('');
  const [description, setDescription] = useState('');
  
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: 'Buenos Días',
      day: 'Lunes',
      schedule: '06:00 - 10:00',
      host: 'Juan Pérez',
      description: 'Programa matutino con las mejores noticias y música'
    },
    {
      id: 2,
      name: 'Tarde Musical',
      day: 'Lunes',
      schedule: '14:00 - 18:00',
      host: 'María González',
      description: 'Los mejores éxitos de la música latina'
    }
  ]);

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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

  const handleSaveProgram = () => {
    if (!selectedDay || !programName || !startTime || !endTime || !host) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const newProgram = {
      id: programs.length + 1,
      name: programName,
      day: selectedDay,
      schedule: `${startTime} - ${endTime}`,
      host: host,
      description: description
    };

    setPrograms([...programs, newProgram]);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
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

          {/* Program Cards */}
          {programs.map((program) => (
            <View key={program.id} style={styles.programCard}>
              <View style={styles.programHeader}>
                <View>
                  <Text style={styles.programName}>{program.name}</Text>
                  <Text style={styles.programDay}>{program.day}</Text>
                </View>
                <View style={styles.programActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text style={styles.programInfo}>Horario: {program.schedule}</Text>
              <Text style={styles.programInfo}>Conductor: {program.host}</Text>
              <Text style={styles.programInfo}>Descripción: {program.description}</Text>
            </View>
          ))}
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
    padding: 4,
  },
  actionIcon: {
    fontSize: 20,
  },
  programInfo: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
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
