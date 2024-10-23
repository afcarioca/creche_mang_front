import { useState } from "react";
import { Text, View} from "react-native";
const TextScreen = () =>{
    const [titulo, setTtitulo] = useState("TextScreen")
    const mudaTitulo = () =>{
        setTtitulo("TextScreen Modificado")
    }
    return (
        <View>
            <Text onPress={mudaTitulo}>{titulo}</Text>
        </View>
    );
}

export default TextScreen;