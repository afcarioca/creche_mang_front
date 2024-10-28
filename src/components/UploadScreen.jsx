import { Button, Text } from "@rneui/themed";
import { View, FlatList, Dimensions, ScrollView, StyleSheet} from "react-native";
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import { useState, useEffect, } from "react";
import { BarChart, PieChart} from "react-native-chart-kit";
import { DataTable } from 'react-native-paper'; 

//import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

//#19bdee
//#03487a
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
       
      },

      image:{
        width: 150,
        height: 150,
      
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
      },

      cadastro:{
        color:"#fff",
        marginTop:30,
      }

})


//http://192.168.0.21:8000/api/upload/
//https://crechemangback.vercel.app/api/upload/
const UploadScreen = () =>{

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

    const uploadFile = async () =>{
        
         
            const pickedFile = await DocumentPicker.pickSingle({
                type:[DocumentPicker.types.xlsx],
                
            })
            const formData = new FormData();
                formData.append('xlsx', {
                uri: pickedFile.uri,
                type: pickedFile.type,
                name: pickedFile.name,
            });
            
            await axios.post("https://crechemangback.vercel.app/api/upload/", formData,{
                headers: {
                    'content-type': 'multipart/form-data',
                  },
                withCredentials: true,
            }).then(response => {
                let jsonString = response.data["data"].replace(/'/g, '"')   
                jsonData = JSON.parse(jsonString)
                const salasArray = Object.values(jsonData);
                setSalas(salasArray)
              })
              .catch(error => {
                console.log(error)
              
            });
        
    }

    useEffect(() => {
        console.log("Salas atualizadas:", salas); 
    }, [salas]);

    const renderPieChart = (title, data) => {
        const chartData = [
            {
                name: "Sim",
                population: data.alcool.sim,
                color: "rgba(0, 128, 0, 0.6)", 
                legendFontColor: "green",
                legendFontSize: 15
            },
            {
                name: "Não",
                population: data.alcool.nao,
                color: "rgba(255, 0, 0, 0.6)", 
                legendFontColor: "red",
                legendFontSize: 15
            }
        ];

        return (
            <View key={title + "-pie"}  style={{ width: screenWidth / 2.5, margin: 5 }}>
                
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
        );
    };
  

   
    useEffect(() => {
        console.log("Salas atualizadas:", salas.alcool);
    }, [salas]); 

    const click = (value) =>{
       const turmas = new Map();
       turmas.set("Total", 0);
       turmas.set("Berçário", 1);
       turmas.set("Maternal1", 2);
       turmas.set("Maternal2", 3);
       
       setCounter(turmas.get(value));
    }
    return(

        <View style={styles.container}>
          
            <Button title="Selectione Arquivo" onPress={async () =>{
                uploadFile();
            }} />
            <ScrollView>
                {Array.isArray(salas) && Array.isArray(salas) && salas.length > 0 ?(
                    <View>
                        <View>
                            <>
                                {salas.slice(counter, counter+1).map((sala) => (
                                        renderPieChart("Álcool", sala)
                                    

                                ))}                              
                            </>
                            
                        </View>
                        <DataTable style={styles.container}> 
                            <DataTable.Header style={styles.tableHeader}> 
                                <DataTable.Title>Turma</DataTable.Title>  
                            </DataTable.Header> 
                            <DataTable.Row> 
                                <DataTable.Cell onPress={() => click("Total")} >Total</DataTable.Cell> 
                            </DataTable.Row> 
                            <DataTable.Row> 
                                <DataTable.Cell onPress={() => click("Berçário")}>Berçário</DataTable.Cell> 
                            </DataTable.Row> 
                            <DataTable.Row> 
                                <DataTable.Cell onPress={() => click("Maternal1")}>Maternal 1</DataTable.Cell> 
                            </DataTable.Row> 
                            <DataTable.Row> 
                                <DataTable.Cell onPress={() => click("Maternal2")}>Maternal 2</DataTable.Cell> 
                            </DataTable.Row> 
                        </DataTable>
                          
                    </View>
                ) : (
                    <Text style={{ textAlign: 'center', marginVertical: 20 }}>Nenhum dado disponível</Text>
                
                )}
                
            </ScrollView>
            
            
        </View>
    );
}

export default UploadScreen;