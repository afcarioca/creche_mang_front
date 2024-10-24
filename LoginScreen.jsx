import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Image, ToastAndroid } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState} from "react";
import axios from "axios";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#03487a",
       
      },

      image:{
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
      inputEmail:{
            marginTop: 50,
      },
      
      erros:{
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


const schema = yup.object().shape({
  usuario: yup.string().required('Campo usuário obrigatório'),                
  senha: yup.string().required('Campo senha obrigatório')
                     .min(8, 'A senha deve conter no mínimo 8 caracteres'),
});


const LoginScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const [erro, setErro] = useState("")
    
    const onSubmit = (dados) =>{
        axios.post("http://192.168.42.77:8000/api/login/",dados,{
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
    

   

    return(
        <View style={styles.container}>
            <Image source={require('./logo.png')} 
                    style={styles.image} />

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
            {errors.usuario && <Text style={styles.erros}>{errors.usuario.message}</Text>}
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) =>(
                    <TextInput style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Senha"
                        placeholderTextColor="#888"
                    />
                )}
                    name="senha"
                    rules={{required: true}}
                    defaultValue=""
                />
            {errors.senha && <Text style={styles.erros}>{errors.senha.message}</Text>}  
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text>Entrar</Text>
            </TouchableOpacity>
            
            <Text style={styles.cadastro} onPress={() =>   navigation.navigate("CadastroScreen")}>Cadastrar</Text>
            <Text style={[styles.erros, styles.erro]}>{erro}</Text>    
        </View>
    );
}

export default LoginScreen;