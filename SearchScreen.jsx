import { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native"
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#fff",
       
      },

      image:{
        width: 150,
        height: 150,
      
      },
    
      input: {
        width: '100%',
        height: 50,
        borderColor: '#03487a',
        borderBottomWidth:3,       
       
        paddingLeft: 10,
        marginTop: 30,
        backgroundColor: '#fff',
        color:"#19bdee"
    
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
        marginTop:30,

      },

      cadastro:{
        color:"#fff",
        marginTop:30,
      },

      label: {
        fontSize: 16,
        marginBottom: 10,
       
      },
      picker: {
        height: 50,
        width: '100%',
        marginTop:30,
        color:'#19bdee',
        
      },

})


const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
    turma: yup.string().required('Campo turma obrigatório'),
});

const SearchScreen = () =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const[error, setError] = useState("")

    const onSubmit = (dados) =>{
        
      console.log(dados);
      
     
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
                    placeholder="Nome da Criança"
                    placeholderTextColor="#888"
                />
            )}
            name="nome"
            rules={{required: true}}
            defaultValue=""
        />
        {errors.nome && <Text style={styles.erros}>{errors.nome.message}</Text>}
        <Controller
                control={control}
                name="turma"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={(itemValue) => onChange(itemValue)}
                >
                    <Picker.Item label="Escolha a turma" value="" />
                    <Picker.Item label="Berçário 1" value="b1" />
                    <Picker.Item label="Berçário 2" value="b2" />
                    <Picker.Item label="Maternal 1" value="m1" />
                    <Picker.Item label="Maternal 2" value="m2" />
                </Picker>
                )}
      />
            {errors.turma && <Text style={styles.erros}>{errors.turma.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text >Cadastrar</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default SearchScreen;