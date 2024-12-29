# ZikhoVah Android Installation and Testing Guide

## Prerequisites
Before beginning, ensure you have the following installed:
- Node.js (version 16 or later)
- npm (version 8 or later)
- Android Studio
- Android SDK
- Java Development Kit (JDK 11)

## Step 1: Project Setup

### 1.1 Create a New React Native Project
Open your terminal and run:

```bash
# Install React Native CLI globally
npm install -g react-native-cli

# Create the ZikhoVah project
npx react-native@latest init ZikhoVah
cd ZikhoVah
```

### 1.2 Install Additional Dependencies
```bash
# Core dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-gesture-handler react-native-safe-area-context
npm install react-native-screens react-native-svg
npm install lucide-react-native

# WebRTC for video calls
npm install react-native-webrtc

# State management
npm install redux react-redux @reduxjs/toolkit

# Additional utilities
npm install axios socket.io-client
```

## Step 2: Project Structure

Create the following directory structure:

```
ZikhoVah/
│
├── src/
│   ├── components/
│   │   ├── ChatScreen.js
│   │   ├── ContactList.js
│   │   ├── MessageInput.js
│   │   └── VideoCallModal.js
│   │
│   ├── redux/
│   │   ├── store.js
│   │   ├── reducers/
│   │   │   ├── chatReducer.js
│   │   │   └── userReducer.js
│   │   └── actions/
│   │       ├── chatActions.js
│   │       └── userActions.js
│   │
│   ├── services/
│   │   ├── apiService.js
│   │   └── socketService.js
│   │
│   └── App.js
│
├── android/
├── ios/
└── package.json
```

## Step 3: Main App Component (src/App.js)
```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Import screens
import ContactListScreen from './components/ContactList';
import ChatScreen from './components/ChatScreen';
import VideoCallScreen from './components/VideoCallModal';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contacts">
          <Stack.Screen 
            name="Contacts" 
            component={ContactListScreen} 
            options={{ title: 'ZikhoVah Messenger' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={({ route }) => ({ title: route.params.contact.name })}
          />
          <Stack.Screen 
            name="VideoCall" 
            component={VideoCallScreen} 
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
```

## Step 4: Android Configuration

### 4.1 Android Permissions
Open `android/app/src/main/AndroidManifest.xml` and add:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 4.2 Gradle Configuration
Update `android/app/build.gradle`:
```gradle
dependencies {
    // Add WebRTC and other native modules
    implementation project(':react-native-webrtc')
    // ... other dependencies
}
```

## Step 5: Running the App

### 5.1 Start Metro Bundler
```bash
npx react-native start
```

### 5.2 Run on Android Device/Emulator
```bash
# Ensure you have a connected device or emulator running
npx react-native run-android
```

## Troubleshooting

### Common Issues
1. **Metro Bundler Error**
   - Stop the bundler
   - Clear Metro bundler cache: `npx react-native start --reset-cache`

2. **Android Build Errors**
   - Sync Gradle: Open Android Studio > File > Sync Project with Gradle Files
   - Clean Project: `cd android && ./gradlew clean`

3. **Permission Issues**
   - Ensure all required permissions are added to AndroidManifest.xml
   - Check runtime permissions in the app

## Testing Checklist

### Functional Testing
- [ ] Contact list loads
- [ ] Can select a contact
- [ ] Send text messages
- [ ] Receive messages
- [ ] Video call functionality
- [ ] Voice call placeholder
- [ ] Image upload

### Performance Testing
- [ ] App responsiveness
- [ ] Memory usage
- [ ] Battery consumption
- [ ] Network data usage

## Deployment Preparation

### Build APK
```bash
cd android
./gradlew assembleRelease
```

The APK will be located at:
`android/app/build/outputs/apk/release/app-release.apk`

## Security Considerations
- Implement proper authentication
- Use HTTPS for all network calls
- Encrypt sensitive data
- Implement proper WebRTC security

## Next Steps
1. Implement backend services
2. Add comprehensive error handling
3. Create unit and integration tests
4. Set up continuous integration

---

**Note**: This is a basic setup. A production-ready app would require more comprehensive implementation, backend services, and thorough testing.
