// App.js
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

// Importações dos nossos novos arquivos separados
import { intervalOptions, volumeOptions } from './constants';
import WaterService from './WaterService';
import { styles } from './styles';

export default function App() {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [intervalIndex, setIntervalIndex] = useState(0);
  const [volumeIndex, setVolumeIndex] = useState(1);
  const [totalConsumed, setTotalConsumed] = useState(0);
  const [consumeVisible, setConsumeVisible] = useState(false);

  const notificationListener = useRef();
  // 1. Criamos a referência para o listener de clique (resposta)
  const responseListener = useRef();

  // Inicialização do App
  useEffect(() => {
    async function initialize() {
      await WaterService.requestPermissions();
      const savedData = await WaterService.loadSavedState();
      
      if (savedData) {
        setAlarmEnabled(savedData.alarmEnabled || false);
        setIntervalIndex(savedData.intervalIndex || 0);
        setVolumeIndex(savedData.volumeIndex || 1);
        setTotalConsumed(savedData.totalConsumed || 0);
      }

      // Verifica se o app foi aberto ORIGINALMENTE por um clique em notificação que já aconteceu
      const lastResponse = await Notifications.getLastNotificationResponseAsync();
      if (lastResponse) {
        setConsumeVisible(true);
      }
    }

    initialize();

    // Listener para quando a notificação chega com o APP ABERTO
    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      setConsumeVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });

    // 2. Listener para quando o usuário CLICA na notificação (App em segundo plano ou fechado)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      setConsumeVisible(true);
    });

    // Limpeza dos listeners
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Sincronização automática com armazenamento local
  useEffect(() => {
    WaterService.saveState({ alarmEnabled, intervalIndex, volumeIndex, totalConsumed });
  }, [alarmEnabled, intervalIndex, volumeIndex, totalConsumed]);

  // Ações de Interação
  async function handleToggleAlarm(value) {
    setAlarmEnabled(value);
    if (value) {
      await WaterService.scheduleNotification(intervalIndex, volumeIndex);
      Alert.alert('Alarme ativado!');
    } else {
      await WaterService.cancelAllNotifications();
      Alert.alert('Alarme desativado!');
    }
  }

  function handleRegisterConsumption() {
    const volume = volumeOptions[volumeIndex];
    setTotalConsumed(prev => prev + volume);
    setConsumeVisible(false);
    Alert.alert('Consumo registrado', `${volume} ml registrados!`);
  }

  function handleResetConsumption() {
    setTotalConsumed(0);
    Alert.alert('Contagem diária zerada!');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lembrete de Hidratação</Text>

      <View style={styles.card}>
        <Text style={styles.totalText}>
          Total Consumido Hoje: {totalConsumed} ml
        </Text>
      </View>

      {/* Seção de Intervalo */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sectionTitle}>Intervalo</Text>
        <View style={styles.optionRow}>
          {intervalOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, intervalIndex === index && styles.optionSelected]}
              onPress={() => setIntervalIndex(index)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Seção de Volume */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sectionTitle}>Volume</Text>
        <View style={styles.optionRow}>
          {volumeOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, volumeIndex === index && styles.optionSelected]}
              onPress={() => setVolumeIndex(index)}
            >
              <Text>{item} ml</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          {alarmEnabled
            ? `Status: Alarme ATIVO (${intervalOptions[intervalIndex].label})`
            : 'Status: Alarme Inativo'}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Ativar Lembrete</Text>
        <Switch value={alarmEnabled} onValueChange={handleToggleAlarm} />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetConsumption}>
        <Text style={styles.resetButtonText}>Zerar Consumo Diário</Text>
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal visible={consumeVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lembrete de Hidratação</Text>
            <Text style={styles.modalVolume}>
              Volume Padrão: {volumeOptions[volumeIndex]} ml
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.skipButton} onPress={() => setConsumeVisible(false)}>
                <Text>PULAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={handleRegisterConsumption}>
                <Text style={{ color: '#fff' }}>BEBI!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}