# 💧 Lembrete de Hidratação

Um aplicativo móvel desenvolvido em **React Native** com **Expo** projetado para ajudar os usuários a manterem hábitos saudáveis de consumo de água, enviando notificações personalizadas em intervalos de tempo configurados.

---

## ✨ Funcionalidades

* ⏰ **Agendamento Inteligente:** Configure alertas periódicos para lembrar de beber água.
* 📊 **Contador Diário:** Acompanhe o volume total de água consumido ao longo do dia.
* ⚙️ **Customização:** Escolha entre diferentes intervalos de tempo e volumes de água padronizados.
* 🔔 **Sistema de Resposta Rápida:** Notificações integradas via `expo-notifications` que funcionam mesmo com o aplicativo fechado ou em segundo plano, abrindo um modal de confirmação ao clicar no alerta.
* 📳 **Feedback Háptico:** Vibrações sutis ao receber alertas para melhorar a experiência do usuário.
* 💾 **Persistência de Dados:** O progresso diário e as configurações do alarme são salvos localmente no dispositivo via `AsyncStorage`.

---

## 🛠️ Tecnologias Utilizadas

* [React Native](https://reactnative.dev/)
* [Expo Go](https://expo.dev/)
* [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
* [Async Storage](https://react-native-async-storage.github.io/async-storage/)
* [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina o [Node.js](https://nodejs.org/) e o gerenciador de pacotes (npm ou yarn), além do aplicativo **Expo Go** instalado no seu celular (Android ou iOS).

### Passo a Passo

1. **Clonar o repositório:**
```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
