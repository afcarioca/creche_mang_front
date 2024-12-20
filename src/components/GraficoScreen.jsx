import { Button, Text } from "@rneui/themed";
import { View, FlatList, Dimensions, ScrollView, StyleSheet} from "react-native";
import axios from "axios";
import { useState, useEffect, } from "react";
import { BarChart, PieChart} from "react-native-chart-kit";
import { DataTable } from 'react-native-paper'; 
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import {API_URL} from '@env';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { storeData, retrieveData } from '../utils/storage';

const screenWidth = Dimensions.get("window").width;
const schema = yup.object().shape({
    turma: yup.string().required('Campo turma obrigatório'),
});

const GraficoScreen = ({navigation}) =>{
    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
        
    });
    const [salas, setSalas] = useState([])
    const [counter, setCounter] = useState(0)


    const chartConfig = {
        backgroundGradientFrom: "#f7f7f7",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0, 
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
    };


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



    const onSubmit = async (data) =>{
            const token = await retrieveData('token');

            await axios.post(`${API_URL}/grafico/`, data,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                let jsonString = response.data["data"].replace(/'/g, '"')  
                jsonData = JSON.parse(jsonString)
                const salasArray = Object.values(jsonData);
                setSalas(salasArray)
                console.log(salasArray)
              })
              .catch(error => {
                if(error.response && error.response.status === 401)
                    navigation.navigate('LoginScreen');
            });
        
    }

 
    const renderPieChart = (title, data, tipo) => {
      
        const sexoChartData  = [
              
            {
                name: "% F",
                population: data["Feminino"],
                color: "rgba(3, 72, 122, 1)", 
                legendFontColor: "rgba(3, 72, 122, 1)",
                legendFontSize: 13
            },
            {
                name: "% M",
                population: data["Masculino"],
                color: "rgba(25, 189, 238, 1)", 
                legendFontColor: "rgba(25, 189, 238, 1)",
                legendFontSize: 13
            },
          
                 
        ];

        const bolsaFamiliaChartData  = [
              
            {
                name: "% Não",
                population: data["Não"],
                color: "rgba(3, 72, 122, 1)", 
                legendFontColor: "rgba(3, 72, 122, 1)",
                legendFontSize: 13
            },
            {
                name: "% Sim",
                population: data["Sim"],
                color: "rgba(25, 189, 238, 1)", 
                legendFontColor: "rgba(25, 189, 238, 1)",
                legendFontSize: 13
            },
          
                 
        ];

        const jogosChartData  = [
              
            {
                name: "% Não",
                population: data["Não"],
                color: "rgba(3, 72, 122, 1)", 
                legendFontColor: "rgba(3, 72, 122, 1)",
                legendFontSize: 13
            },
            {
                name: "% Sim",
                population: data["Sim"],
                color: "rgba(25, 189, 238, 1)", 
                legendFontColor: "rgba(25, 189, 238, 1)",
                legendFontSize: 13
            },
          
                 
        ];

        const alcoolChartData  = [
              
            {
                name: "% Não",
                population: data["Não"],
                color: "rgba(3, 72, 122, 1)", 
                legendFontColor: "rgba(3, 72, 122, 1)",
                legendFontSize: 13
            },
            {
                name: "% Sim",
                population: data["Sim"],
                color: "rgba(25, 189, 238, 1)", 
                legendFontColor: "rgba(25, 189, 238, 1)",
                legendFontSize: 13
            },
          
                 
        ];
        const formChart = new Map();
    
        formChart.set("Sexo", sexoChartData);
        formChart.set("Bolsa Família", bolsaFamiliaChartData);
        formChart.set("Jogos", jogosChartData);
        formChart.set("Alcool", alcoolChartData);
        const chartData = formChart.get(tipo);

        return (
            <View key={title + "-pie"}  style={{ width: screenWidth / 2.5, margin: 5 }}>
                <View>
                    <Text style={{ textAlign: 'center', marginVertical: 10, fontWeight: 'bold' }}>{title}</Text>
                    <PieChart
                        data={chartData}
                        width={250} 
                        height={150} 
                        chartConfig={chartConfig}
                        accessor="population" 
                        backgroundColor="transparent"
                        paddingLeft="15" 
                        absolute 
                    />
                        <Text>{data.nome}</Text>
                </View>
            </View>
        );
    };
  
   
    return(

        <View style={styles.container}>
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
            <ScrollView>
                {Array.isArray(salas) && Array.isArray(salas) && salas.length > 0 ?(
                    <View>
                          <FlatList
                            data={[{ key: "Sexo", data: salas[2] }, { key: "Bolsa Família", data: salas[3] },  { key: "Jogos", data: salas[4] },  { key: "Alcool", data: salas[5] }]}
                            horizontal
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <View style={{ width: screenWidth * 1.5, alignItems: 'center' }}>
                                    {renderPieChart(`${item.key}`, item.data, item.key)}
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                        <DataTable style={styles.container}> 
                            <DataTable.Header style={styles.tableHeader}> 
                                <DataTable.Title>Total de Crianças: {salas[1]}</DataTable.Title>  
                            </DataTable.Header> 
                        </DataTable>
                        <DataTable style={styles.container}> 
                            <DataTable.Header style={styles.tableHeader}> 
                                <DataTable.Title>Distribuição</DataTable.Title>  

                                <DataTable.Title>Sim</DataTable.Title>  
                                <DataTable.Title>Não</DataTable.Title>  
                            </DataTable.Header> 
                            <DataTable.Row>
                                <DataTable.Cell>Bolsa-Família</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[3]["Sim"]/100)*salas[1])}</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[3]["Não"]/100)*salas[1])}</DataTable.Cell>

                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Jogos de Azar</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[4]["Sim"]/100)*salas[1])}</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[4]["Não"]/100)*salas[1])}</DataTable.Cell>

                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Álcool</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[5]["Sim"]/100)*salas[1])}</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[5]["Não"]/100)*salas[1])}</DataTable.Cell>

                            </DataTable.Row>
                        </DataTable>
                        <DataTable style={styles.container}> 
                            <DataTable.Header style={styles.tableHeader}> 

                                <DataTable.Title>Distribuição</DataTable.Title>  
                                <DataTable.Title>Masculino</DataTable.Title>  
                                <DataTable.Title>Feminino</DataTable.Title>  
                            </DataTable.Header> 
                            <DataTable.Row>
                                <DataTable.Cell>Sexo</DataTable.Cell>

                                <DataTable.Cell>{Math.round((salas[2]["Masculino"]/100)*salas[1])}</DataTable.Cell>
                                <DataTable.Cell>{Math.round((salas[2]["Feminino"]/100)*salas[1])}</DataTable.Cell>

                            </DataTable.Row>

                        </DataTable>

                    </View>
                ) : (
                    <Text style={styles.text}>Nenhum dado disponível</Text>
                
                )}
                
            </ScrollView>
            
            
        </View>
    );
}

export default GraficoScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
       
      },
    
      label: {
        fontSize: 16,
        marginBottom: 10,
        marginTop:40,
        marginRight:300,
        fontSize: 16,
        color:"gray",
      },

      picker: {
        height: 50,
        width: '100%',
        marginTop:10,
        color:'#19bdee',
      
      },

      text:{
        textAlign: 'center',
        marginVertical: 20, 
        color:"#19bdee"
      }

})