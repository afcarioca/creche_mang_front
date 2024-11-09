import { View, Text, TextInput, StyleSheet,TouchableOpacity, KeyboardAvoidingView, ToastAndroid, Image   } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import { useState } from "react";
import {aberto, oculto} from "../img/";
import {API_URL} from '@env';


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
    const {control, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const [viPassword1, setViPassword1] = useState(false)
    const [viPassword2, setViPassword2] = useState(false)
    const [etapa, setEtapa] = useState(1);
    const totalEtapas = 2;
    const[erro, setErro] = useState("")

    const onSubmit = (dados) =>{
        axios.post(`${API_URL}/register/`,dados,{
            withCredentials: true
        })
        .then(response => {
            ToastAndroid.show('Cadastrado com sucesso!', ToastAndroid.SHORT);
            navigation.navigate("LoginScreen");
            reset();
          })
          .catch(error => {
            setErro(error.response.data.message)
        });
        
        setTimeout(() => {
            setErro('');
    }, 5000);
       
     
    }

    const handleProxima = () =>  setEtapa(anterior => Math.min(etapa + 1, totalEtapas));
    const handleAnterior = () => setEtapa(anterior => Math.max(etapa - 1, 1));

   

    const isViPassword1 = () =>{
        setViPassword1(!viPassword1)
    }
    const isViPassword2 = () =>{
        setViPassword2(!viPassword2)
    }

    const backToLogin = () =>{
        navigation.navigate("LoginScreen");
        reset();
    }

    return(
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           
        >   
              

             
              
                {etapa === 1 && ( <>
                
                <View  style={styles.inputContainer}>
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
                {errors.username && <Text style={styles.erro}>{errors.username.message}</Text>}
    
           
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
                {errors.email && <Text style={styles.erro}>{errors.email.message}</Text>}
                </View>
                </>
                )}
                {etapa === 2 && ( <>
            <View style={styles.inputContainer}>

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
                            secureTextEntry={!viPassword1}

                        />
                    )}
                        name="password1"
                        rules={{required: true}}
                        defaultValue=""
                    />
                <TouchableOpacity onPress={isViPassword1} style={styles.icon}>
                        <Image
                        source={viPassword1 ? aberto : oculto} 
                        style={styles.iconImage}
                    />
                    </TouchableOpacity>
            
                {errors.password1 && <Text style={styles.erro}>{errors.password1.message}</Text>}  
            </View> 
            <View style={styles.inputContainer}>
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
                            secureTextEntry={!viPassword2}

                        />
                    )}
                        name="password2"
                        rules={{required: true}}
                        defaultValue=""
                    />
                    <TouchableOpacity onPress={isViPassword2} style={styles.icon}>
                        <Image
                        source={viPassword2 ? aberto : oculto} 
                        style={styles.iconImage}
                    />
                    </TouchableOpacity>
            
                {errors.password2 && <Text style={styles.erro}>{errors.password2.message}</Text>}
            </View> 


            <Text style={[styles.erro, styles.erro]}>{erro}</Text>
         
                </>)}
            
                
                <View style={styles.buttonContainer}>
                    {etapa > 1 && (
                    <TouchableOpacity onPress={handleAnterior} style={[styles.buttonBackNext, styles.backButton]}>
                        <Text style={styles.backButtonText}>Retornar</Text>
                    </TouchableOpacity>
                    )}
                    {etapa < totalEtapas ? (
                    <TouchableOpacity onPress={handleProxima} style={[styles.buttonBackNext, styles.nextButton]}>
                        <Text style={styles.nextButtonText}>Avançar</Text>
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[styles.buttonBackNext, styles.nextButton]}>
                        <Text style={styles.nextButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.login} onPress={backToLogin}>Login</Text>

             
         

        </KeyboardAvoidingView>
    );
}

export default CadastroScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#03487a",
        
       
      },

      inputContainer: {
        alignItems: 'center',
        position: 'relative',
        width: '80%',
      },

      input: {
        width: '100%',
        height: 50,
        borderColor: '#19bdee',
        borderBottomWidth:2,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: '#03487a',
        color:"#fff",

      },
     
      erro:{
        color:"red",
        fontWeight: "bold"
      },
      

      buttonContainer: {
        flexDirection: 'row',
        
      },

      buttonBackNext:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,

      },

      backButton: {
        backgroundColor: '#19bdee',
        marginRight: 10,
      },

      nextButton: {
        backgroundColor: '#19bdee',
        marginRight: 10,
      },

      login:{
        color:"#fff",
        marginTop:50,
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

      stepContainer:{
        flexDirection: 'row',
        alignItems: 'center',
      },

      stepIndicator:{
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E7E7E7',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },

      activeStep: {
        borderColor: 'pink',
        backgroundColor: 'pink',
      },

      line: {
        width: 20,
        height: 2,
        backgroundColor: '#E7E7E7',
        marginHorizontal: 10,
      },

      activeLine: {
        backgroundColor: 'pink',
      },

     

})