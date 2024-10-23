import { View, Text} from "react-native"
import { useRoute } from '@react-navigation/native';



const CardScreen = ({navigation}) =>{
    const route = useRoute();
    const { idAluno } = route.params;
    return(
        <View>
            <Text>{idAluno}</Text>
        </View>
    )
}

export default CardScreen;