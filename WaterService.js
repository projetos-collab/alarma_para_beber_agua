// WaterService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { intervalOptions, volumeOptions } from './constants';

// Configuração padrão das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class WaterService {
  async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Permita notificações para o app funcionar.'
      );
    }

    await Notifications.setNotificationChannelAsync('water_alarm_channel', {
      name: 'Lembrete de Água',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 1000, 500],
      sound: true,
    });
  }

  async loadSavedState() {
    try {
      const stored = await AsyncStorage.getItem('alarmData');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Erro ao carregar dados", e);
      return null;
    }
  }

  async saveState(stateData) {
    try {
      await AsyncStorage.setItem('alarmData', JSON.stringify(stateData));
    } catch (e) {
      console.error("Erro ao salvar dados", e);
    }
  }

 async scheduleNotification(intervalIndex, volumeIndex) {
  const intervalMs = intervalOptions[intervalIndex].value;
  const volumeMl = volumeOptions[volumeIndex];

  await Notifications.cancelAllScheduledNotificationsAsync();

  const id = await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Hora de beber água 💧',
    body: `Beba ${volumeMl} ml agora!`,
    sound: true,
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: intervalMs / 1000,
    repeats: true,
  },
});

  console.log("ID:", id);

  const scheduled =
    await Notifications.getAllScheduledNotificationsAsync();

  console.log("NOTIFICAÇÕES AGENDADAS:", scheduled);
}

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}

// Exporta uma instância única do serviço (Padrão Singleton)
export default new WaterService();