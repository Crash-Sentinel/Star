import { View } from 'react-native';

/*

Used for making customized breaks in a component than just using the <br /> tag 

*/

export const Break = ({value}) => {
    return (
        <View style={{height: value}}></View>
    )
}