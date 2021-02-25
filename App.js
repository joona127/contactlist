import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      if (data.length > 0) {
        setContacts(data)
        console.log(contacts)
    }
    }
  }
  

  return (
    <View style={styles.container}>
      <FlatList
      data={contacts} 
        renderItem={({ item }) =>
          <Text>{`${item.name} (${item.phoneNumbers ? item.phoneNumbers[0].number : ''})`}</Text>
          
        }
          />
      <Button title="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
