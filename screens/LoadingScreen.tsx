import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from "react-redux";

import Person from "../constants/classes/Person";

import { personsActions } from "../actions";

// some dummy values we can use to simulate real life persons
const dataLength = 5;
const firstNames = ['Jorma', 'Pekka', 'Santeri', 'Teemu', 'Orvokki', 'Pentti', 'Aatu', 'Tuli-Kukka', 'Petteri', 'Olli', 'Rami', 'Maija', 'Minna'];
const lastNames = ['Koskinen', 'Perä', 'Salminen', 'Von Hertzen', 'Joki', 'Mäki', 'Niinistö', 'Viskilä', 'Kolli', 'Käki'];
const professions = ['Koodari', 'Muurari', 'Taksikuski', 'Tasavallan Presidentti', 'Palomies', 'Strippari'];
const minAge = 20;
const maxAge = 60;

interface LoadingScreenProps{
    switchScreen: Function
}

const data = Array<Person>();

const LoadingScreen = (props: LoadingScreenProps) => {
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();

    // generate a random person to a global variable (workaround to prevent bugs with useState)
    const getDataItem = async(i: number) => {
        // await a bit so we can actually see the loading screen (in real life, we wouldnt use this)
        await new Promise(res => setTimeout(res, 20));   
        data[i] = new Person(           
            i,
            `${firstNames[Math.floor(Math.random() * Math.floor(firstNames.length))]} ${lastNames[Math.floor(Math.random() * Math.floor(lastNames.length))]}`,
            `${professions[Math.floor(Math.random() * Math.floor(professions.length))]}`,
            minAge + Math.floor(Math.random() * (maxAge - minAge + 1))
        );       
        setCounter(i+1);
    }

    // 1 input parameter, which watches the changes in counter, every time
    // counter changes, run this
    useEffect(() => {
        if(data.length < dataLength){
            getDataItem(counter);
        } else {
            dispatch(personsActions.setPersons(data));
            props.switchScreen('home');
        }
    }, [counter]);

    return(
        <View style={styles.container}>
            <Text style={{textAlign: 'center'}}>Loading...</Text>
            <Text style={{textAlign: 'center'}}>{counter}/{dataLength}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default LoadingScreen;