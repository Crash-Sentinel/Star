import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  FlatList, 
  Text, 
  TextInput, 
  Image,
  useWindowDimensions,
  Pressable,
  Modal,
  ScrollView
} from 'react-native'
import { useState, useEffect } from 'react';
import { Break } from './../components/break';
import { styles } from './../components/styles';

function SlidesScreen() {
  const divider = 0.6;
  const { height, width } = useWindowDimensions();

  const [url, setURL] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/%27Tutoke%27_-_geograph.org.uk_-_2532332.jpg/1200px-%27Tutoke%27_-_geograph.org.uk_-_2532332.jpg');
  const [text, setText] = useState('Click the Button Left to Update Me!');
  const imgDefWidth = 220;
  const imgDefHeight = 240;
  const [imgWidth, setImgWidth] = useState(imgDefWidth);
  const [imgHeight, setImgHeight] = useState(imgDefHeight);

  const [savedMusicRecent, setMusicSavedRecent] = useState(false);
  const [loadMusicRecent, setMusicLoadRecent] = useState(false);

  const [savedMiscRecent, setMiscSavedRecent] = useState(false);
  const [loadMiscRecent, setMiscLoadRecent] = useState(false);

  const [visible, setVisible] = useState(false);

  const [musicOrder, setMusicOrder] = useState([
    {id: 0, title: "Test Item 1"},
    {id: 1, title: "Test Item 2"}
  ]);

  const handleMusicOrderUpdate = (itemId, text) => {
    setMusicOrder(prevItems => 
      prevItems.map(item => item.id === itemId ? {...item, title: text} : item)  
    )
  };

  const storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log("Error Storing Data: ", e);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log("Error Getting Data: ", e);
    }
  };

  const [misc, setMisc] = useState([
    {id: 0, title: "Test Item 1"},
    {id: 1, title: "Test Item 2"}
  ]);

  const handleMiscUpdate = (itemId, text) => {
    setMusicOrder(prevItems => 
      prevItems.map(item => item.id === itemId ? {...item, title: text} : item)  
    )
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMusicSavedRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [savedMusicRecent])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMusicLoadRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadMusicRecent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMiscSavedRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [savedMiscRecent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMiscLoadRecent(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadMiscRecent]);

  return (
    <ScrollView>
      <View
      style={{
        flexDirection: 'row'
      }}
    >
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
      >
        <View
          style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <View
            style={{
              width: (0.8*width),
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center'
            }}
          >
            <Text
              style={styles.textBold}
            >Update URL for Image:</Text>
            <Break value={15}/>
            <TextInput style={[styles.centerTextAlign, styles.textInput]} value={url} onChangeText={setURL}/>
            <Break value={15}/>
            <Text
              style={styles.textBold}
            >
              Update Text under Image:
            </Text>
            <Break value={15}/>
            <TextInput style={[styles.centerTextAlign, styles.textInput]} value={text} onChangeText={setText}/>
            <Break value={15}/>
            <Text
              style={styles.textBold}
            >
              Update Image Height:
            </Text>
            <Break value={15}/>
            <TextInput style={[styles.centerTextAlign, styles.textInput]} value={imgHeight} onChangeText={(value) => setImgHeight(parseFloat(value))}/>
            <Break value={15}/>
            <Text
              style={styles.textBold}
            >
              Update Image width:
            </Text>
            <Break value={15}/>
            <TextInput style={[styles.centerTextAlign, styles.textInput]} value={imgWidth} onChangeText={(value) => setImgWidth(parseFloat(value))}/>
            <Break value={15}/>
            <Pressable
              style={styles.textInput}
              onPress={() => {
                setImgHeight(imgDefHeight);
                setImgWidth(imgDefWidth);
              }}
            >
              <Text
                style={styles.centerTextAlign}
              >  Reset Height and Width Values  </Text>
            </Pressable>
            <Break value={15}/>
            <Pressable
              style={styles.textInput}
              onPress={
                () => { setVisible(!visible) }
              }
            >
              <Text
                style={styles.centerTextAlign}
              >  Close Modal  </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: (width*divider)
        }}
      >
        <View
          style={{
            paddingTop: 5,
            paddingLeft: 5,
          }}
        >
          <Text
            style={[styles.textBold, {fontSize: 20}]}
          >{new Date().toDateString().substring(0, (new Date().toDateString()).length-5)}</Text>
          <Break value={10}/>
          <Text>Music Order: </Text>
          { /* Include something that hides the many buttons that we got */ }
          {musicOrder && (
            <FlatList 
              data={musicOrder}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{flexDirection: 'row'}}
                  >
                    <Text>{`\u2022  `}</Text>
                    <TextInput value={item.title} onChangeText={text => handleMusicOrderUpdate(item.id, text)}/>
                  </View>
                )
              }}
            />
          )}
          <Break value={25}/>
          {(musicOrder.length > 0) && (
            <View>
              {savedMusicRecent && (
                <Text>Saved Data!</Text>
              )}
              <Pressable
                style={[styles.textInput, {width: width*(1-divider)*0.25}]}
                onPress={
                  async () => {
                    await storeData({...musicOrder}, "music-order");
                    setMusicSavedRecent(true);
                    console.log("Saved Data");
                  }
                }
              >
                <Text
                  style={styles.centerTextAlign}
                >  Save Data  </Text>
              </Pressable>
              <Break value={10}/>
              {loadMusicRecent && (
                <Text>Loaded Saved Data!</Text>
              )}
              <Pressable
                style={[styles.textInput, {width: width*(1-divider)*0.25}]}
                onPress={
                  async () => {
                    const res = await getData("music-order");
                    var final = [];
                    for (var i = 0; i < Object.values(res).length; i++) {
                      final.push(Object.values(res)[i]);
                    }
                    setMusicOrder(final);
                    setMusicLoadRecent(true);
                  }
                }
              >
                <Text
                  style={styles.centerTextAlign}
                >  Load Saved Data  </Text>
              </Pressable>
            </View>
          )}
          <Break value={10}/>
          <Pressable
            style={[styles.textInput, {width: width*(1-divider)*0.25}]} 
            onPress={
              () => {setMusicOrder(prevItems => [...prevItems, {id: musicOrder.length, title: "Click me to edit!"}])}
            }
          >
            <Text
              style={styles.centerTextAlign}
            >  Add Item  </Text>
          </Pressable>
          <Break value={10}/>
          <Pressable
            style={[styles.textInput, {width: width*(1-divider)*0.25}]} 
            onPress={
              () => {setMusicOrder(prevItems => prevItems.slice(0, -1))}
            }
          >
            <Text
              style={styles.centerTextAlign}
            >  Remove Last Item  </Text>
          </Pressable>

          <Break value={30}/>
          
          <Text
          >Miscellaneous:</Text>
          {misc && (
            <FlatList 
              data={misc}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{flexDirection: 'row'}}
                  >
                    <Text>{`\u2022  `}</Text>
                    <TextInput value={item.title} onChangeText={text => handleMiscUpdate(item.id, text)}/>
                  </View>
                )
              }}
            />
          )}
          <Break value={25}/>
          {(misc.length > 0) && (
            <View>
              {savedMiscRecent && (
                <Text>Saved Misc Data!</Text>
              )}
              <Pressable
                style={[styles.textInput, {width: width*(1-divider)*0.25}]}
                onPress={
                  async () => {
                    await storeData({...misc}, "misc");
                    setMiscSavedRecent(true);
                    console.log("Saved Data");
                  }
                }
              >
                <Text
                  style={styles.centerTextAlign}
                >  Save Data  </Text>
              </Pressable>
              <Break value={10}/>
              {loadMiscRecent && (
                <Text>Loaded Saved Misc Data!</Text>
              )}
              <Pressable
                style={[styles.textInput, {width: width*(1-divider)*0.25}]}
                onPress={
                  async () => {
                    const res = await getData("misc");
                    var final = [];
                    for (var i = 0; i < Object.values(res).length; i++) {
                      final.push(Object.values(res)[i]);
                    }
                    setMisc(final);
                    setMiscLoadRecent(true);
                  }
                }
              >
                <Text
                  style={styles.centerTextAlign}
                >  Load Saved Data  </Text>
              </Pressable>
            </View>
          )}
          <Break value={10}/>
          <Pressable
            style={[styles.textInput, {width: width*(1-divider)*0.25}]}
            onPress={
              () => {setMisc(prevItems => [...prevItems, {id: misc.length, title: "Click me to edit!"}])}
            }
          >
            <Text
              style={styles.centerTextAlign}
            >  Add Item  </Text>
          </Pressable>

          <Break value={10}/>

          <Pressable
            style={[styles.textInput, {width: width*(1-divider)*0.25}]}
            onPress={
              () => {setMisc(prevItems => prevItems.slice(0, -1))}
            }
          >
            <Text
              style={styles.centerTextAlign}
            >  Remove Last Item  </Text>
          </Pressable>

          <Break value={10}/>

          <Pressable
            style={[styles.textInput, {width: width*(1-divider)*0.25}]}
            onPress={
              () => { 
                setVisible(!visible);
                console.log("Clicked Modal");
              }
            }
          >
            <Text
              style={styles.centerTextAlign}
            > Update Right Image and Text </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: (width*parseFloat(1-divider)),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image 
            source={{
              uri: url
            }}
            style={{
              width: imgWidth,
              height: imgHeight,
            }}
          />
          <Text
            style={{textAlign: 'center'}}
          >{text}</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

export default SlidesScreen;