import { View, Text, TextInput, StyleSheet,TouchableOpacity, Image, ToastAndroid, ActivityIndicator} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState} from "react";
import axios from "axios";
import {API_URL} from '@env';
import {aberto, oculto, logo} from "../img/";




const schema = yup.object().shape({
  usuario: yup.string().required('Campo usuário obrigatório'),                
  senha: yup.string().required('Campo senha obrigatório')
                     .min(8, 'A senha deve conter no mínimo 8 caracteres'),
});


const LoginScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const [visibilidade, setVisibilidade] = useState(false)
    const [erro, setErro] = useState("")
    
    const onSubmit = (dados) =>{
        axios.post(`${API_URL}/login/`,dados,{
            withCredentials: true
        })
        .then(response => {
            ToastAndroid.show('Bem-vindo!', ToastAndroid.SHORT);
            navigation.navigate("Home");
          })
          .catch(error => {
            setErro("Login Inválido");
        });
        
        setTimeout(() => {
                setErro('');
        }, 5000);
    }

    const isVisivel = () =>{
        setVisibilidade(!visibilidade);
    }
   

    return(
        <View style={styles.container}>
            <Image source={logo} 
                    style={styles.imagem} />

            <Controller 
                control = {control}
                render ={({field: {onChange, onBlur, value}}) =>(
                    <TextInput  style={[styles.input, styles.inputEmail]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Usuário"
                        placeholderTextColor="#888"
                        
                    />
                )}
                name="usuario"
                rules={{required: true}}
                defaultValue=""
            />
            {errors.usuario && <Text style={styles.erro}>{errors.usuario.message}</Text>}
            <View style={styles.inputContainer}>

            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) =>(
                    <TextInput style={[styles.input, styles.senha]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Senha"
                        placeholderTextColor="#888"
                        secureTextEntry={!visibilidade}
                    />
                )}
                    name="senha"
                    rules={{required: true}}
                    defaultValue=""
                />
            <TouchableOpacity onPress={isVisivel} style={styles.icon}>
                <Image
                source={visibilidade ? aberto : oculto} 
                style={styles.iconImage}
              />
            </TouchableOpacity>
            </View>

            {errors.senha && <Text style={styles.erro}>{errors.senha.message}</Text>}  
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text>Entrar</Text>
            </TouchableOpacity>
            
            <Text style={styles.cadastro} onPress={() => navigation.navigate("CadastroScreen")}>Cadastrar</Text>
            <Text style={[styles.erro, styles.erro]}>{erro}</Text>    
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#03487a",
       
      },

      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      },

      imagem:{
        width: 150,
        height: 150,
      
      },
    
      input: {
        width: '80%',
        height: 50,
        borderColor: '#19bdee',
        borderBottomWidth:2,       
       
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: '#03487a',
        color:"#fff"
    
      },
   

      icon:{
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 5,
      },

      iconImage: {
        width: 25,
        height: 25,
      },
      erro:{
        color:"red",
        fontWeight: "bold"
      },
      
      button: {
        width: '85%',
        height: 50,
        backgroundColor: '#19bdee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },

      cadastro:{
        color:"#fff",
        marginTop:30,
      }

})
