import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Image  } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#03487a"
       
      },

    
      input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    
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
      },

      cadastro:{
        color:"#fff",
        marginTop:30,
      }

})

const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
             
    email: yup.string().required('Campo e-mail Obrigatório')
                       .email('E-mail inválido'),
    senha: yup.string().required('Insira a senha')
                       .min(8, 'A senha deve conter no mínimo 8 caracteres'),
    confirmaSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não coincidem')
    .required('Campo obrigatório'),
  
                       
  
    });
const CadastroScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (dados) =>{
        console.log(dados);
        navigation.navigate("LoginScreen");
    }

    return(
        <View style={styles.container}>
             <Controller 
                control = {control}
                render ={({field: {onChange, onBlur, value}}) =>(
                    <TextInput  style={[styles.input, styles.inputNome]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Insira o seu Nome"
                    />
                )}
                name="nome"
                rules={{required: true}}
                defaultValue=""
            />
            {errors.nome && <Text style={styles.erros}>{errors.nome.message}</Text>}

       
            <Controller 
                control = {control}
                render ={({field: {onChange, onBlur, value}}) =>(
                    <TextInput  style={[styles.input, styles.inputEmail]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Insira o seu e-mail"
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
                    />
                )}
                    name="senha"
                    rules={{required: true}}
                    defaultValue=""
                />
            {errors.senha && <Text style={styles.erros}>{errors.senha.message}</Text>}  
            
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) =>(
                    <TextInput style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Insira a senha Novamente"
                    />
                )}
                    name="confirmaSenha"
                    rules={{required: true}}
                    defaultValue=""
                />
            {errors.confirmaSenha && <Text style={styles.erros}>{errors.confirmaSenha.message}</Text>}

            
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text >Cadastrar</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default CadastroScreen;