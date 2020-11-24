import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { useSelector } from "react-redux";

import Person from "../constants/classes/Person";
import DetailsScreen from "../screens/DetailsScreen";

import Colors from "../constants/styles/Colors";

// made this so the fields dont swap places when saving
const keys = Object.keys(new Person(0));

interface TouchableListItemProps {
    onPress: Function;
    index: number;
}

const TouchableListItem = (props: TouchableListItemProps) => {
    // ts-lint doesn't work properly with redux I guess...
    // @ts-ignore
    const data = useSelector(state => state.persons.persons[props.index]);

    // sometimes FlatList might be called in weird order with store data, so if we have nothing to render, return null
    if (!data) return null;
    return (
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <TouchableOpacity onPress={() => props.onPress(props.index)}>
                <View style={styles.itemContainer}>
                    {keys.map(key => {
                        // dont print index here, this key should always exist
                        if (key === 'index') return;
                        return (
                            <View key={key} style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>{key}: </Text>
                                <Text style={{ flex: 1 }}>{data[key]}</Text>
                            </View>
                        );
                    })}
                    <Text style={{ right: 10, bottom: 10, position: 'absolute' }}>{props.index + 1}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

interface HomeScreenProps {
    setCurrentScreen: Function;
}

const HomeScreen = (props: HomeScreenProps) => {
    // @ts-ignore
    const data = useSelector(state => state.persons.persons);

    // this state is used purely for re-rendering purposes, without it the app was buggy
    const [dataLen, setDataLen] = useState(data.length);
    const [details, setDetails] = useState<any>(null);

    // again ts typing is incomplete in react...
    const renderItem = (item: any) => {
        return (
            <TouchableListItem
                index={item.index}
                onPress={(index: number) => {
                    setDetails(
                        <DetailsScreen
                            index={index}
                            close={() => setDetails(null)}
                            delete={() => setDataLen(dataLen - 1)} />
                    );
                }} />
        );
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>List of Persons</Text>
                {
                    data.length === 0 ? 
                    <View style={{margin: 40}}>
                        <Text style={{textAlign: 'center',  marginBottom: 10}}>No persons found!</Text>
                        <Button onPress={() => props.setCurrentScreen('loading')} title="Generate new list" />
                    </View>
                    : null
                }
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.index + ''}
                />
                <Button
                    color={Colors.confirmColor}
                    onPress={() => {
                        setDataLen(dataLen + 1);
                        setDetails(
                            <DetailsScreen
                                index={data.length}
                                close={() => setDetails(null)}
                                delete={() => setDataLen(dataLen - 1)} />
                        );
                    }}
                    title="Add new"
                />
            </View>
            {details}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        padding: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 5
    }
});

export default HomeScreen;