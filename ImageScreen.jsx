import { StyleSheet, View, Image } from "react-native";

const styles = StyleSheet.create({
    imagem:{
        width:50,
        height:50,
        alignSelf: "center"
    }
})


const ImageScreen = () =>{
    return(
        <View>
            <Image 
                style ={styles.imagem}
                source = {{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
        </View>
    );
}

export default ImageScreen;