import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const [text, setText] = useState('안녕하세요');

    useEffect(() => {
        console.log('프로그램 로드 됨');
        loadData();
    }, []);

    const saveData = async (value) => {
        try {
            await AsyncStorage.setItem('memo', value);
            console.log('저장됨 : ', value);
        } catch (e) {
            // saving error
        }
    }

    const loadData = async () => {
        try {
            const value = await AsyncStorage.getItem('memo')
            if(value !== null) {
                console.log('불러오기 완료');
                setText(value);
                // value previously stored
            }
        } catch(e) {
            // error reading value
        }
    }

  return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="auto"/>

          <View style={styles.headerContainer}>
              <Button title={'저장'} onPress={() => saveData(text)}></Button>
              <Text style={styles.headerText}>메모장</Text>
              <Button title={'불러오기'} onPress={() => loadData()}></Button>
          </View>

          <View style={styles.contentContainer}>
              <TextInput value={text} onChangeText={(txt) => setText(txt)} multiline/>
          </View>

        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fc0',
    },
    safeArea:{
        flex:1
    },
    headerContainer:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText:{
        textAlign: 'center',
        fontSize: 18,
    },
    contentContainer:{
        backgroundColor: '#eeeeee',
        flex:1,
        padding:10
    }
});

