import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Pressable, FlatList, Text, useWindowDimensions, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Break } from '../components/break';
import { styles } from '../components/styles';

export default function ToDoScreen() {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
      console.log("Error Storing Data: ", e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log("Error Getting Data: ", e);
    }
  };

  const handleCheckboxPress = (itemId) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? {...item, value: !item.value} : item
      )
    );
  }

  const handleCheckboxTitleChange = (itemId, text) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, title: text } : item))
    );
  };

  const [savedRecent, setSavedRecent] = useState(false);
  const [loadRecent, setLoadRecent] = useState(false);
  const { height, width } = useWindowDimensions();

  const [items, setItems] = useState([
    {id: 0, title: 'Click Us to Change our Text!', value: false},
    {id: 1, title: 'Click Save and Load Data to save and load your To-Do List!', value: false}
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [savedRecent])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadRecent])

  return (
    <ScrollView contentContainerStyle={{ 
      flexGrow: 1,
      justifyContent: 'center', 
      alignItems:'center', 
      backgroundColor:'white' }}
    >
      <View
        style={{
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >To-Do List:</Text>
        {(items.length > 0) ? (
          <FlatList
            data={items}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection:'row'
                  }}
                >
                  <Checkbox
                    color={"black"} 
                    value={item.value}
                    onValueChange={() => handleCheckboxPress(item.id)}
                  />
                  <Text>  </Text>
                  <TextInput
                    style={[(item.value) ? {
                      textDecorationLine: 'line-through', 
                      textDecorationStyle: 'solid',
                      color: "gray",
                      borderWidth: 0,
                    } : {
                      color:"black",
                      borderWidth: 2,
                      borderRadius:5,
                      borderColor:"black",
                    }, {width: (width*0.6)}]} 
                    value={item.title} 
                    onChangeText={text => handleCheckboxTitleChange(item.id, text)}
                  />
                </View>
              )
            }}
          />
        ) : (
          <Text>No To-Do Items to Render!</Text>
        )}
        <Break value={25}/>
        <Pressable
          style={[styles.centerTextAlign, styles.textInput]}
          onPress={
            () => setItems([...items, {id: items.length, title: "Click me to edit!", value: false}])
          }
        >
          <Text>  Add New Element  </Text>
        </Pressable>
        <Break value={10}/>
        <Pressable
          style={[styles.centerTextAlign, styles.textInput]}
          onPress={
            () => setItems(prevItems => prevItems.slice(0, -1))
          }
        >
          <Text>  Remove Last Element in List  </Text>
        </Pressable>
        <Break value={10}/>
        {savedRecent && (
          <Text>Saved Data!</Text>
        )}
        <Pressable
          style={[styles.centerTextAlign, styles.textInput]}
          onPress={
            async () => { 
              await storeData({...items});
              setSavedRecent(true);
              console.log("Saved Data");
            }
          }
        >
          <Text>  Save Items  </Text>
        </Pressable>
        <Break value={10}/>
        {loadRecent && (
          <Text>Loaded Saved Data!</Text>
        )}
        <Pressable
          style={[styles.centerTextAlign, styles.textInput]}
          onPress={
            async () => {
              const res = await getData();
              var final = [];
              for (var i = 0; i < Object.values(res).length; i++) {
                final.push(Object.values(res)[i]);
              }
              setItems(final);
              setLoadRecent(true);
            }
          }
        >
          <Text>  Load Saved Items  </Text>
        </Pressable>
        <Break value={30}/>
      </View>
    </ScrollView>
  )
}