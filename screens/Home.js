import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function Home({navigation}) {
  const [key, setKey] = useState('');
  const [val, setVal] = useState('');
  const [result, setResult] = useState();
  const [validate, setValidate] = useState();
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);
  const [secureText, setSecureText] = useState(true);
//   const [errorTextUser, setErrorTextUser] = useState(false);
//   const [errorTextPass, setErrorTextPass] = useState(false);
  const [errorCriteria, setErrorCriteria] = useState(false);

  async function saveData(key, value){
    if(key!='' && val !=''){ 
        setErrorCriteria(false)
        await SecureStore.setItemAsync(key, value);
        setLogin(true);
        setRegister(false);
        setKey('')
        setVal('')
    } else {  
        setErrorCriteria(true)
    }
    
  }

  async function getValueFor(key){
    let result = await SecureStore.getItemAsync(key);
    if(result){
      setResult(result)
      navigation.navigate('Details')
    } else {
      alert('Invalid-key')
    }
  }

  const changeHandler=(e)=>{
    setValidate(e.nativeEvent.text);
  }

  const passwordHandler=()=>{
    setSecureText(prev=>!prev)
  }
   
  return (
    <View style={styles.container}>
      {register ? 
      <View>
      <Text style={styles.content}>Register your Identity</Text>
        <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Username"
            placeholder="enter username"
            onChangeText={text=>{
                setKey(text)
            }}
            value={key}
        />
        <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Private-Key"
            placeholder='enter private-key'
            onChangeText={text=>setVal(text)}
            value={val}
            secureTextEntry={secureText}
            right={<TextInput.Icon icon="eye" onPress={passwordHandler}/>}
        />
        {errorCriteria ? <Text>
        <FlatList
        data={[
          {key: 'Username is mandatory'},
          {key: 'Passcode is mandatory'},
        ]}
        renderItem={({item}) => <Text style={styles.red}>{item.key}</Text>}
      />
        </Text> : null}
        <Button
            style={styles.button}
            mode="contained"
            onPress={()=>{
                saveData(key,val)
            }}>
            Save
        </Button>
      </View> : null}

      {login ? 
       <View>
        <Text style={styles.content}>Log-In</Text>
        <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Username"
            placeholder="enter valid username"
            value={validate}
            onChange={changeHandler}
        />
        <Text variant="titleSmall" style={styles.textSmall}>
            Key will detected based on user
        </Text>
        <Button
            style={styles.buttonNew}
            mode="contained"
            title='Save'
            onPress={()=>getValueFor(validate)}
        >
            Login 
        </Button>
        <Button
        onPress={()=>{
            setLogin(false);
            setRegister(true);
        }}
        >Back</Button>
      </View> : null }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    fontSize:20,
    marginBottom:5,
    fontWeight:'bold'
  },
  textInput:{
    width:250,
    marginBottom:10
  },
  textSmall:{
    width:250,
    color:'gray'
  },
  button: {
    margin: 30,
  },
  buttonNew: {
    margin: 30,
    marginBottom: 0
  },
  red:{
    color:'red'
  }
});
