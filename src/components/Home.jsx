import { View, Image, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import pesquisa from "../img/pesquisa.png";
import usuarios from "../img/usuarios.png";
import graficos from "../img/graficos.png";


const Home = ({navigation}) =>{
    return(
        <View  style={styles.container}>
            <View>

                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image
                        source={pesquisa} 
                        style={styles.pesquisa}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Classe')}>
                    <Image
                        source={usuarios} 
                        style={styles.pesquisa}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Grafico')}>
                    <Image
                        source={graficos} 
                        style={styles.grafico}
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
        
    },
    grafico:{
        width:150,
        height:135,
        marginTop:50
        
    }
})