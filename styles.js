// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E1F5FE',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1',
    marginTop: 40,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#009688',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  optionSelected: {
    backgroundColor: '#80DEEA',
  },
  statusBox: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  switchLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 12,
  },
  resetButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#00BCD4',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalVolume: {
    fontSize: 18,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    padding: 14,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    padding: 14,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
});