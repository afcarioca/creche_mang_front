import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity,KeyboardAvoidingView, ToastAndroid   } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import { useState } from "react";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#03487a",
        
       
      },

    
      input: {
        width: '80%',
        height: 50,
        borderColor: '#19bdee',
        borderBottomWidth:2,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: '#03487a',
        color:"#fff",

    
      },
      inputNome:{
            marginTop: 0,
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
        marginTop:35
      },

      login:{
        color:"#fff",
        marginTop:30,
      }

})

const schema = yup.object().shape({
    username: yup.string().required('Campo nome obrigatório'),
             
    email: yup.string().required('Campo e-mail obrigatório')
                       .email('E-mail inválido'),
    password1: yup.string().required('Insira a senha')
                       .min(8, 'A senha deve conter no mínimo 8 caracteres'),
    password2: yup.string().oneOf([yup.ref('password1'), null], 'As senhas não coincidem')
    .required('Campo obrigatório'),
  
    });

const CadastroScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const[error, setError] = useState("")

    const onSubmit = (dados) =>{
        axios.post("http://192.168.42.77:8000/api/register/",dados,{
            withCredentials: true
        })
        .then(response => {
            ToastAndroid.show('Cadastrado com sucesso!', ToastAndroid.SHORT);
            navigation.navigate("LoginScreen");
          })
          .catch(error => {
            
            setError(error.response.data.message)
        });
        
        setTimeout(() => {
            setError('');
    }, 5000);
       
     
    }


    return(
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
             <Controller 
                control = {control}
                render ={({field: {onChange, onBlur, value}}) =>(
                    <TextInput  style={[styles.input, styles.inputNome]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Insira o nome"
                        placeholderTextColor="#888"
                    />
                )}
                name="username"
                rules={{required: true}}
                defaultValue=""
            />
            {errors.username && <Text style={styles.erros}>{errors.username.message}</Text>}

       
            <Controller 
                control = {control}
                render ={({field: {onChange, onBlur, value}}) =>(
                    <TextInput  style={[styles.input, styles.inputEmail]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Insira o e-mail"
                        placeholderTextColor="#888"
                    />
                )}
                name="email"
                rules={{required: true}}
                defaultValue=""
            />
            {errors.email && <Text style={styles.erros}>{errors.email.message}</Text>}
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) =>(
                    <TextInput style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Insira a senha"
                        placeholderTextColor="#888"
                    />
                )}
                    name="password1"
                    rules={{required: true}}
                    defaultValue=""
                />
            {errors.password1 && <Text style={styles.erros}>{errors.password1.message}</Text>}  
            
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) =>(
                    <TextInput style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Insira a senha novamente"
                        placeholderTextColor="#888"
                    />
                )}
                    name="password2"
                    rules={{required: true}}
                    defaultValue=""
                />
            {errors.password2 && <Text style={styles.erros}>{errors.password2.message}</Text>}

            
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text >Cadastrar</Text>
            </TouchableOpacity>
            <Text style={styles.login} onPress={() =>   navigation.navigate("LoginScreen")}>Login</Text>

            <Text style={[styles.erros, styles.erro]}>{error}</Text> 
        </KeyboardAvoidingView>
    );
}

export default CadastroScreen;