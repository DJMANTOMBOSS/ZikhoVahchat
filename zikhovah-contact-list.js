import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { Phone, Video } from 'lucide-react-native';

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    { 
      id: '1', 
      name: 'Alice Johnson', 
      status: 'Online', 
      avatar: require('../assets/avatar1.png') 
    },
    { 
      id: '2', 
      name: 'Bob Smith', 
      status: 'Offline', 
      avatar: require('../assets/avatar2.png') 
    },
    { 
      id: '3', 
      name: 'Charlie Brown', 
      status: 'Away', 
      avatar: require('../assets/avatar3.png') 
    }
  ]);

  const renderContactItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => navigation.navigate('Chat', { contact: item })}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactStatus}>{item.status}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('VideoCall', { contact: item })}
        >
          <Video color="#6B46C1" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Phone color="#6B46C1" size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ZikhoVah Messenger</Text>
      </View>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contactList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor