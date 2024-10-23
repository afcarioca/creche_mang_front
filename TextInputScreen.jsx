import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    meutextinput:{
        marginTop:100,
        height: 40,
        margin: 12,
        borderWidth: 1,
    }
})

const TextInputScreen = () =>{
    const [texto, setTexto] = useState(null)
    const [numero, setNumero] = useState(0)
    return(
        <SafeAreaView>
            <TextInput
                style ={styles.meutextinput}
                value = {texto}
            />
            <TextInput
                style ={styles.meutextinput}
                onChangeText = {setNumero}
                value={numero}
                keyboardType="numeric"
            />
        </SafeAreaView>
    );
}

export default TextInputScreen;