import { useState, useEffect} from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ToastAndroid} from "react-native"
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import axios from "axios";


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
        borderColor: '#19bdee',
        borderBottomWidth:2,       
       
        paddingLeft: 10,
        marginTop: 30,
        backgroundColor: '#fff',
        color:"#19bdee"
    
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
        marginTop:40,
        marginRight:300,
        fontSize: 16,
       
      },

      bolsa:{
        marginRight:210,
        marginTop:30,
        
      },
      picker: {
        height: 50,
        width: '100%',
        marginTop:10,
        color:'#19bdee',
      
      },

})


const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
    turma: yup.string().required('Campo turma obrigatório'),
    sexo: yup.string().required('Campo sexo obrigatório'),
    bolsa_familia: yup.string().required('Campo bolsa família obrigatório'),

});

const SearchScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        
    });
    const[error, setError] = useState("")
   
    const onSubmit = (dados) =>{

      const formattedData = {
        ...dados,
        bolsa_familia: parseInt(dados.bolsa_familia, 10),
      };
        
        axios.post("http://192.168.42.77:8000/api/form/",formattedData,{
              withCredentials: true
          })
          .then(response => {
              ToastAndroid.show('Aluno Cadastrado com sucesso!', ToastAndroid.SHORT);
              navigation.navigate("CardScreen", {idAluno: response.data.id});
            })
            .catch(error => {
              setError(error.response.data.message)
              console.log(error)
             
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
                    placeholder="Nome da Criança"
                    placeholderTextColor="#888"
                />
            )}
            name="nome"
            rules={{required: true}}
            defaultValue=""
        />
        {errors.nome && <Text style={styles.erros}>{errors.nome.message}</Text>}
        <Text style={styles.label}>Turma:</Text>

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
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Berçário 1" value="B1" />
                    <Picker.Item label="Berçário 2" value="B2" />
                    <Picker.Item label="Maternal 1" value="M1" />
                    <Picker.Item label="Maternal 2" value="M2" />
                </Picker>
                )}
          />
            {errors.turma && <Text style={styles.erros}>{errors.turma.message}</Text>}
        
        <Text style={styles.label}>Sexo:</Text>
        <Controller
                control={control}
                name="sexo"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={(itemValue) => onChange(itemValue)}
                >
                    <Picker.Item label="Selecione" value="" />
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                  
                </Picker>
                )}
        />
        {errors.sexo && <Text style={styles.erros}>{errors.sexo.message}</Text>}

      <Text style={styles.bolsa}>Possui bolsa família?</Text>
      <Controller
        control={control}
        name="bolsa_familia"
        rules={{ required: true }} 
        render={({ field: { onChange, value } }) => (
          <View>
            <RadioButton.Group
              onValueChange={onChange} 
              value={value}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10  }}>
                  <RadioButton value="1" />
                  <Text>Sim</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="0" />
                  <Text>Não</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        )}
      />
      {errors.bolsa_familia && <Text style={styles.erros}>{errors.bolsa_familia.message}</Text>}



        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text >Cadastrar</Text>
        </TouchableOpacity>
        <Text style={[styles.erros, styles.erro]}>{error}</Text> 
        </KeyboardAvoidingView>
    );
}

export default SearchScreen;