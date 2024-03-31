import { View, Text, useWindowDimensions, Button, Pressable, ScrollView } from 'react-native';
import { styles } from '../components/styles';

export default function FullScreen({ navigation, route }) {
    const { url } = route.params;

    const { height, width } = useWindowDimensions();

    const handleNavigation = () => {
        navigation.navigate('Loader');
    }

    return (
        <ScrollView>
            <View>
                <Pressable
                    style={styles.textInput}
                    onPress={handleNavigation}
                >
                    <Text
                        style={styles.centerTextAlign}
                    >  Go Back to Main Screen  </Text>
                </Pressable>
                <iframe
                src={url}
                height={height}
                width={width}
                >
                </iframe>
            </View>
        </ScrollView>
    );
}