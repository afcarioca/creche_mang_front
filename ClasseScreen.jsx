import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { useState } from "react";
import { DataTable } from 'react-native-paper'; 


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
    turma: yup.string().required('Campo turma obrigatório'),
});
const ClasseScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const [alunos, setalunos] = useState([])

    const onSubmit = (dados) => {
        console.log(dados)
        axios.post("http://192.168.42.77:8000/api/form/",dados,{
            withCredentials: true
        })
        .then(response => {
            setalunos(response.data.data); 
          })
          .catch(error => {
            console.log(error);
           
        });
        
    }


    return (
        <View>
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
                            onValueChange={(itemValue) => {
                                onChange(itemValue);
                                handleSubmit(onSubmit)();  
                            }}
                        >
                            <Picker.Item label="Selecione" value="" />
                            <Picker.Item  label="Todas" value="TODAS" />
                            <Picker.Item  label="Berçário 1" value="B1" />
                            <Picker.Item label="Berçário 2" value="B2" />
                            <Picker.Item label="Maternal 1" value="M1" />
                            <Picker.Item label="Maternal 2" value="M2" />
                        </Picker>
                        )}
                />
         
            <DataTable>
                    <DataTable.Header style={styles.tableHeader}> 
                                <DataTable.Title>Alunos</DataTable.Title>  
                    </DataTable.Header>
           
            <FlatList
                data={alunos} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (
                    
                    <DataTable.Row> 
                            <DataTable.Cell onPress={() => navigation.navigate("CardScreen", {idAluno: item.id})}>{item.nome}</DataTable.Cell> 
                    </DataTable.Row> 
                )}
            />

            </DataTable>
        </View>
    );
}

export default ClasseScreen;