import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

export default function AdminHomeScreen() {
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
          <TouchableOpacity style={styles.addButton}>
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
});
