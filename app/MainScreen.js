import { View, Text, Modal, TextInput, useWindowDimensions, Pressable, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import { styles } from '../components/styles';
import { Break } from '../components/break';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

export default function MainScreen({ navigation }) {
    const strcstURL = 'https://starcast.vercel.app/';
    const { height, width } = useWindowDimensions();
    const [url, setURL] = useState(strcstURL);
    const [showIFrame, setShowIFrame] = useState(false);

    const handleNavigation = () => {
        navigation.navigate('Screen', {
            url: url
        })
    }

    return (
        <View style={styles.container}>

            <TextInput style={[styles.textInput, styles.centerTextAlign]} value={url} onChangeText={setURL} />
            <Pressable
                style={styles.textInput}
                onPress={() => setURL(strcstURL)}
            >
                <Text>Show Starcast QR</Text>
            </Pressable>

            <Break value={15}/>
            <View style={styles.checkboxContainer}>
                <Checkbox value={showIFrame} onValueChange={setShowIFrame}/>
                <Text>  Show inner frame</Text>
            </View>
            {showIFrame && (
                <Pressable
                    style={styles.textInput}
                    onPress={handleNavigation}
                >
                    <Text
                        style={styles.centerTextAlign}
                    >  Go Full Screen  </Text>
                </Pressable>
            )}

            <Break value={35}/>
            {url && (<QRCode 
                value={url}
                size={200}
            />)}
            {showIFrame && (
                <iframe
                    src={url}
                    width={width}
                >
                </iframe>
            )}
        </View>
    )
}