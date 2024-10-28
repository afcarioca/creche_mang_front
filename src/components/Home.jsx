import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import pesquisa from "../img/pesquisa.png";
import usuarios from "../img/usuarios.png";



const Home = ({navigation}) =>{
    return(
        <View  style={styles.container}>
            <View>

                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                    <Image
                        source={pesquisa} 
                        style={styles.pesquisa}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ClasseScreen')}>
                    <Image
                        source={usuarios} 
                        style={styles.pesquisa}
                    />
                </TouchableOpacity>
               
              
            </View>
        </View>
    );
}

export default Home;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#fff"
    },
    pesquisa:{
        width:135,
        height:135,
        marginTop:50
        
    }
})