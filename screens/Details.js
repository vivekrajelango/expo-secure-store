import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
// import Moralis from 'moralis';
// import { EvmChain } from "@moralisweb3/common-evm-utils";


export default function Details() {
    const [res, setRes] = useState('');
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'X-API-Key': 'gva7KYuijP2VKapPDjB2D4MBI6dAMYyozHdpN745pjhE2dK1d6wEktmDAgYDRkYV' },
          };
          fetch('https://deep-index.moralis.io/api/v2/block/1000?chain=eth', options)
            .then((response) => response.json())
            .then((res) => setRes(res))
            .catch((err) => console.error(err))
        // getData()
    },[])

    // async function getData(){
    //     await Moralis.start({
    //         apiKey: gva7KYuijP2VKapPDjB2D4MBI6dAMYyozHdpN745pjhE2dK1d6wEktmDAgYDRkYV,
    //       });
    //       const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
  
    //       const chain = EvmChain.ETHEREUM;
        
    //       const response = await Moralis.EvmApi.balance.getNativeBalance({
    //         address,
    //         chain,
    //       });
    //     alert(response.toJSON());
    // }

  return (
    <View>
       <Text>Time: {JSON.stringify(res.timestamp)}</Text>
       <Text>Count: {JSON.stringify(res.transaction_count)}</Text>
       <Text>Limit: {JSON.stringify(res.gas_limit)}</Text>
       <Text>Count: {JSON.stringify(res.gas_used)}</Text>
    </View>
  )
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
      width:100,
      marginBottom:10,
      display:'flex',
      alignItems:'center',
    },
  });
