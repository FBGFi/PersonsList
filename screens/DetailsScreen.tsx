import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, Modal, Alert } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import Person from "../constants/classes/Person";

import Colors from "../constants/styles/Colors";

import { personsActions } from "../actions";

// made this so the fields dont swap places when saving
const keys = Object.keys(new Person(0));

interface ListItemFormProps {
    data: Person;
    close: Function;
    delete: Function;
}

const ListItemForm = (props: ListItemFormProps) => {
    const [data, setData] = useState(props.data);
    const dispatch = useDispatch();

    // we dont want unnecessary items
    const checkForInvalidFields = () => {
        for (let i = 0; i < keys.length; i++) {
            if (data[keys[i]] === "" || (typeof (data[keys[i]]) === 'number' && (data[keys[i]] < 0 || isNaN(data[keys[i]])))) {
                Alert.alert(
                    "Invalid fields!",
                    "Fill all the fields with correct values or delete entry.",
                    [{text: "OK"}]
                )
                return false;
            }
        }
        
        return true;
    }

    return (
        <View style={styles.formContainer}>
            {keys.map((key, index: number) => {
                if (key === 'index') return;
                // using this to check if number, since no NumberInput in react native
                let value = data[key];
                return (
                    <View style={styles.inputContainer} key={index}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>{key}: </Text>
                            <Text style={{ flex: 1 }}>{typeof (value)}</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={`${typeof (value) === 'number' && value < 0 ? "" : value}`}
                            onChangeText={(text) => {
                                if (!isNaN(value)) {
                                    value = parseFloat(text);
                                } else {
                                    value = text;
                                }
                            }}
                            onEndEditing={() => {
                                if(typeof(value) !== typeof(data[key])) return;
                                setData({ ...data, ...{ [key]: value } });
                            }} />
                    </View>);
            })}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button
                    onPress={() => {
                        if(!checkForInvalidFields()) return;
                        props.close();
                    }}
                    color={Colors.rejectColor}
                    title="Cancel" />
                <Button
                    onPress={() =>{ 
                        dispatch(personsActions.deletePerson(data));
                        props.delete();
                        props.close();
                    }}
                    color={Colors.rejectColor}
                    title="Delete" />
                <Button
                    onPress={() => {
                        if(!checkForInvalidFields()) return;
                        dispatch(personsActions.changePerson(data));
                        props.close();
                    }}
                    color={Colors.confirmColor}
                    title="Save and return" />
            </View>
        </View>
    );
}

interface DetailsScreenProps {
    index: number;
    close: Function;
    delete: Function;
}

const DetailsScreen = (props: DetailsScreenProps) => {
    // @ts-ignore
    const data = useSelector(state => state.persons.persons);
    const dispatch = useDispatch();

    // if the index is same as data length, it would be out of bounds, so create new one
    // at data.length, this might create unnecessary entry if user decides to delete it
    // right after creating it, but doing all the extra checking would be more hassle
    if (props.index === data.length) {
        dispatch(personsActions.changePerson(new Person(props.index)));
    }
    return (
        <Modal animationType="slide" style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>
                {data[props.index].name !== "" ? `Details of ${data[props.index].name}` : "Add new person"}
            </Text>
            <ScrollView>
                <ListItemForm close={props.close} data={data[props.index]} delete={props.delete} />
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 5
    },
    inputContainer: {
        marginBottom: 10
    },
    textInput: {
        backgroundColor: Colors.light,
        borderRadius: 5
    }
});

export default DetailsScreen;