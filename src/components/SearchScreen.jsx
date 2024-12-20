import { useState, useEffect} from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ToastAndroid} from "react-native"
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import {API_URL} from '@env';
import { storeData, retrieveData } from '../utils/storage';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';



const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
    turma: yup.string().required('Campo turma obrigatório'),
    sexo: yup.string().required('Campo sexo obrigatório'),
    bolsa_familia: yup.string().required('Campo bolsa-família obrigatório'),
    jogos: yup.string().required('Campo jogo obrigatório'),
    alcool: yup.string().required('Campo álcool obrigatório'),

});

const SearchScreen = ({navigation}) =>{
    const {control, handleSubmit, reset, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        
    });
    const[error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    
    useFocusEffect(
      useCallback(() => {
        const verificaToken = async () => {
          try {
            const token = await retrieveData('token');
            if (!token) 
              navigation.navigate("LoginScreen")
            
          } catch (error) {
            console.error('Erro ao verificar o token:', error);
          }
        };
        verificaToken();
          
        
        return () => {
        };
      }, [navigation])
    );
   
   
    const onSubmit = async (dados) =>{
      const token = await retrieveData('token');
     
      const formattedData = {
        ...dados,
        bolsa_familia: parseInt(dados.bolsa_familia, 10),
      };
      
        axios.post(`${API_URL}/form/`,formattedData,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
              ToastAndroid.show('Aluno Cadastrado com sucesso!', ToastAndroid.SHORT);
             
              navigation.navigate("CardScreen", {idAluno: response.data.id});
              reset();
            })
            .catch(error => {
              setError(error.response.data.message)
              if(error.response && error.response.status === 401)
                navigation.navigate('LoginScreen');
             
          });
          
          setTimeout(() => {
              setError('');
      }, 5000);
   
    }

    return(
      <ScrollView>
        <View style={styles.navContainer}>
                  <TouchableOpacity onPress={() => setCurrentPage(1)} style={styles.navButton}>
                      <Text style={styles.navText}>Página 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCurrentPage(2)} style={styles.navButton}>
                      <Text style={styles.navText}>Página 2</Text>
                  </TouchableOpacity>
        </View>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
         {currentPage === 1 && (
              <>
          
                  <Controller
                      control={control}
                      name="nome"
                      render={({ field: { onChange, value } }) => (
                          <TextInput
                              style={styles.input}
                              onChangeText={onChange}
                              value={value}
                              placeholder="Nome da Criança"
                              placeholderTextColor="#888"
                          />
                      )}
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
                  </>
            )}
          {currentPage === 2 && (
              <>
                 <Text style={styles.bolsa}>Possui bolsa-família?</Text>
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
                  <RadioButton color="gray" value="1" />
                  <Text style={styles.text}>Sim</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton color="gray" value="0" />
                  <Text  style={styles.text}>Não</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        )}
      />
      {errors.bolsa_familia && <Text style={styles.erros}>{errors.bolsa_familia.message}</Text>}
      
      
      <Text style={styles.jogos}>Algum familiar aposta em jogos azar?</Text>

      <Controller
        control={control}
        name="jogos"
        rules={{ required: true }} 
        render={({ field: { onChange, value } }) => (
          <View>
            <RadioButton.Group
              onValueChange={onChange} 
              value={value}
              
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10  }}>
                  <RadioButton color="gray" value="1" />
                  <Text style={styles.text}>Sim</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton color="gray" value="0" />
                  <Text  style={styles.text}>Não</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        )}
      />
      {errors.jogos && <Text style={styles.erros}>{errors.jogos.message}</Text>}
      <Text style={styles.alcool}>Algum familiar consome álcool?</Text>

<Controller
  control={control}
  name="alcool"
  rules={{ required: true }} 
  render={({ field: { onChange, value } }) => (
    <View>
      <RadioButton.Group
        onValueChange={onChange} 
        value={value}
        
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10  }}>
            <RadioButton color="gray" value="1" />
            <Text style={styles.text}>Sim</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton color="gray" value="0" />
            <Text  style={styles.text}>Não</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  )}
/>
{errors.alcool && <Text style={styles.erros}>{errors.alcool.message}</Text>}
                
            </> 
               
            )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                      <Text >Cadastrar</Text>
      </TouchableOpacity>
      <Text style={[styles.erros, styles.erro]}>{error}</Text> 
  
      </KeyboardAvoidingView>
      </ScrollView>
    );
}

export default SearchScreen;

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
      color:"gray",
    },

    bolsa:{
      marginTop:30,
      color:"gray"
      
    },

    jogos:{
      marginTop:30,
      color:"gray"
      
    },

    alcool:{
      

      marginTop:30,
      color:"gray"
      
    },

    picker: {
      height: 50,
      width: '100%',
      marginTop:10,
      color:'#19bdee',
    
    },

    text:{
      color:'#19bdee',

    },

    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
   
       backgroundColor:"#19bdee"
  },
  navButton: { 
      padding: 8,
      flexDirection: 'row', 
      backgroundColor:"#19bdee"

  },
  navText: { 
      color: '#fff' 
  },

})
