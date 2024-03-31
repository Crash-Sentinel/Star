import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { styles } from '../components/styles';
import { Break } from '../components/break';

/*

Create a FlatList component that loads a list component that shows a person / thing / whatever and a reason why

*/

export default function CreditScreen() {
    const list = [
        {title: "Mr. Lockstead", reason: "Allowing me to make this for him"},
        {title: "ChatGPT", reason: "Cleaning up some of the code and giving me ideas for what to program"},
        {title: "AsyncStorage API", reason: "Saving and Getting Data for screens"},
        {title: "Expo / React Native", reason: "Making a framework other than html that is easy to learn and to make this with"},
        {title: "The Obvious (Friends, Family, God, etc.)", reason: "being there for the laughs, lessons, and fun overall, to many more in the future"}
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.textBold, styles.centerTextAlign]}>Credits to the following People and API's:</Text>
                <Break value={10}/>
                <FlatList 
                    data={list}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text>{item.title} - For {item.reason}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}