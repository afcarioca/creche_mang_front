import { useState, useEffect} from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ToastAndroid, ScrollView} from "react-native"
import { Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import {API_URL} from '@env';
import { storeData, retrieveData } from '../utils/storage';




const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
  

});


const UpdateScreen = ({navigation}) =>{
    const route = useRoute();
    const { idAluno } = route.params;
    const {control, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(schema),
        
    });
    const [currentPage, setCurrentPage] = useState(1);

    const [inf, setInf] = useState({
        id: "",
        nome:"",
        turma:"",
        sexo:"",
        bolsa:"",

     })


    const aluno = new Map();
    
    aluno.set("B1", "Berçário 1");
    aluno.set("B2", "Berçário 2");
    aluno.set("M1", "Maternal 1");
    aluno.set("M2", "Maternal 2");
   

    const aluno1 = new Map();
    aluno1.set("F", "Feminino");
    aluno1.set("M", "Masculino");
    
     
    const aluno2 = new Map();
    aluno2.set(true, "1");
    aluno2.set(false, "0");
  
    const[error, setError] = useState("")
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = await retrieveData('token');
    
            const response = await axios.get(`${API_URL}/form/${idAluno}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
             
            });
    
            const data = response.data.data[0];
    
            reset({
              nome: data.nome,
              turma: data.turma,
              sexo: data.sexo,
              bolsa_familia: data.bolsa_familia ? "1" : "0",
              jogos: data.jogos ? "1" : "0",
              alcool: data.alcool ? "1" : "0",
            });
          } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar dados');
            if(error.response && error.response.status === 401)
                navigation.navigate('LoginScreen');
          }
        };
    
        fetchData();
      }, [idAluno, reset]);


   

    const onSubmit = async (dados) =>{
        const token = await retrieveData('token');

        dados["bolsa_familia"] = parseInt(dados.bolsa_familia);
        dados["alcool"] = parseInt(dados.alcool);
        dados["jogos"] = parseInt(dados.jogos);

        await axios.put(`${API_URL}/form/${idAluno}/`,dados,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        .then(response => {
            ToastAndroid.show('Aluno atualizado com sucesso!', ToastAndroid.SHORT);
            navigation.navigate("CardScreen", {idAluno: idAluno});
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
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={[styles.input]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Nome da Criança"
                    placeholderTextColor="#888"
                />
            )}
            name="nome"
            rules={{ required: true }}
        />
        {errors.nome && <Text style={styles.erros}>{errors.nome.message}</Text>}
        <Text style={styles.label}>Turma:</Text>
            <Controller
                control={control}
                name="turma"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Picker
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue) => onChange(itemValue)}
                    >
                        {[...aluno.entries()].map(([value, label]) => (
                            <Picker.Item key={value} label={label} value={value} />
                        ))}
                    </Picker>
                )}
            />
            {errors.turma && <Text style={styles.erros}>{errors.turma.message}</Text>}
        
        <Text style={styles.label}>Sexo:</Text>
            <Controller
                control={control}
                name="sexo"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Picker
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue) => onChange(itemValue)}
                    >
                        {[...aluno1.entries()].map(([value, label]) => (
                            <Picker.Item key={value} label={label} value={value} />
                        ))}
                    </Picker>
                )}
            />
            {errors.sexo && <Text style={styles.erros}>{errors.sexo.message}</Text>}
            </> )}
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
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
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

            </> )}
       
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text >Atualizar</Text>
        </TouchableOpacity>
        <Text style={[styles.erros]}>{error}</Text> 
    </KeyboardAvoidingView>
    </ScrollView>
    );
}

export default UpdateScreen;
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
        
        marginTop:30,
        
      },

      jogos:{
      
        marginTop:30,
      },

      alcool:{
        
        marginTop:30,
      },

      picker: {
        height: 50,
        width: '100%',
        marginTop:10,
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