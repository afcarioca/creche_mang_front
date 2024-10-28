import { useState, useEffect} from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ToastAndroid} from "react-native"
import { Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import axios from "axios";
import { useRoute } from '@react-navigation/native';





const schema = yup.object().shape({
    nome: yup.string().required('Campo nome obrigatório'),
  

});


const UpdateScreen = ({navigation}) =>{
    const route = useRoute();
    const { idAluno } = route.params;
    const {control, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(schema),
        
    });

    const [inf, setInf] = useState({
        id: "",
        nome:"",
        turma:"",
        sexo:"",
        bolsa:""
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
        axios.get(`http://192.168.0.19:8000/api/form/${idAluno}/`,{
            withCredentials: true
        })
        .then(response => {
            
            /*
            console.log(response.data.data[0])
            setInf({
                id:response.data.data[0].id,
                nome:response.data.data[0].nome,
                turma:response.data.data[0].turma,
                sexo:response.data.data[0].sexo,
                bolsa:response.data.data[0]["bolsa_familia"],

            });
           */ 
            const data = response.data.data[0];

            reset({
                nome: data.nome,
                turma: data.turma,
                sexo: data.sexo,
                bolsa_familia: data.bolsa_familia ? "1" : "0", 
            });

           
          })

          .catch(error => {
            console.log(error)
            setError(error.response.data.message)
        });
    }, []); 


   

    const onSubmit = async (dados) =>{
        dados["bolsa_familia"] = parseInt(dados.bolsa_familia);
        
        await axios.put(`http://192.168.0.19:8000/api/form/${idAluno}/`,dados,{
            withCredentials: true
        })
        .then(response => {
            ToastAndroid.show('Aluno atualizado com sucesso!', ToastAndroid.SHORT);
            navigation.navigate("CardScreen", {idAluno: idAluno});
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
            {errors.bolsa_familia && <Text style={styles.erros}>{errors.bolsa_familia.message}</Text>}

       
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text >Atualizar</Text>
        </TouchableOpacity>
        <Text style={[styles.erros]}>{error}</Text> 
    </KeyboardAvoidingView>
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