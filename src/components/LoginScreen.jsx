import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet,TouchableOpacity, Image, ToastAndroid, ActivityIndicator} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState} from "react";
import axios from "axios";
import {API_URL} from '@env';
import {aberto, oculto, logo} from "../img/";
import { storeData, retrieveData, removeData } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const schema = yup.object().shape({
  usuario: yup.string().required('Campo usuário obrigatório'),                
  senha: yup.string().required('Campo senha obrigatório')
                     .min(8, 'A senha deve conter no mínimo 8 caracteres'),
});


const LoginScreen = ({navigation}) =>{
    const {control, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const [visibilidade, setVisibilidade] = useState(false)
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("")

    useFocusEffect(
      useCallback(() => {
          const fetch = async () => {
              try {
                  await removeData('token');
                  await removeData('username');

             
              } catch (error) {
                  if(error.response && error.response.status === 401)
                      navigation.navigate('LoginScreen');
              }
          };

          fetch();
      }, [])
  );
    
    const onSubmit = async (dados) =>{
        dados["usuario"] = dados["usuario"].trim(); 
        dados["senha"] = dados["senha"].trim(); 
        setLoading(true);
        try {
          const response = await axios.post(`${API_URL}/login/`, dados, {
            withCredentials: true,
          });
          const token = response.data["Token"];
          const username = response.data["username"];
          await storeData('token', token); 
          await storeData('username', username); 
      
          ToastAndroid.show('Bem-vindo!', ToastAndroid.SHORT);
          navigation.navigate("HomeScreen");
          reset();
        }
        catch (error) {
          setErro("Login Inválido");
          reset()
          setTimeout(() => setErro(''), 5000);
        } finally {
          setLoading(false);
        }
      };

    const isVisivel = () =>{
        setVisibilidade(!visibilidade);
    }
    
    const gotoCadastro = () =>{
        reset();
        navigation.navigate("CadastroScreen")
       
    }

    if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        );
      }

    return(
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
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
                source={visibilidade ? oculto : aberto} 
                style={styles.iconImage}
              />
            </TouchableOpacity>
            </View>

            {errors.senha && <Text style={styles.erro}>{errors.senha.message}</Text>}  
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text>Entrar</Text>
            </TouchableOpacity>
            
            <Text style={styles.cadastro} onPress={gotoCadastro}>Cadastrar</Text>
            <Text style={[styles.erro]}>{erro}</Text>    
        </KeyboardAvoidingView>
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
        width: 130,
        height: 130,
      
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
