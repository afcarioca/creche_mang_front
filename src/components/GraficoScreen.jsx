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

const screenWidth = Dimensions.get("window").width;
const schema = yup.object().shape({
    turma: yup.string().required('Campo turma obrigatório'),
});

const GraficoScreen = () =>{
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

    const onSubmit = async (data) =>{
            await axios.post(`${API_URL}/grafico/`, data,{
                withCredentials: true,
            }).then(response => {
                let jsonString = response.data["data"].replace(/'/g, '"')  
                jsonData = JSON.parse(jsonString)
                const salasArray = Object.values(jsonData);
                setSalas(salasArray)
                console.log(salasArray)
              })
              .catch(error => {
                console.log(error)
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
        const chartData = tipo === "Sexo" ? sexoChartData : bolsaFamiliaChartData;

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
                            data={[{ key: "Sexo", data: salas[2] }, { key: "Bolsa Família", data: salas[3] }, ]}
                            horizontal
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <View style={{ width: screenWidth * 1.5, alignItems: 'center' }}>
                                    {renderPieChart(`Distribuição de ${item.key}`, item.data, item.key)}
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                        <DataTable style={styles.container}> 
                            <DataTable.Header style={styles.tableHeader}> 
                                <DataTable.Title>Total de Crianças: {salas[1]}</DataTable.Title>  
                            </DataTable.Header> 
                            
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