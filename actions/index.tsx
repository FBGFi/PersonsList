import Person from "../constants/classes/Person";
export const personsActions = {
    setPersons: (action: Array<Person>) => {
        return {type: "SET_PERSONS", action: action}
    },
    changePerson: (action: Person) => {
        return {type: "CHANGE_PERSON", action: action}
    },
    deletePerson: (action: Person) => {
        return {type: "DELETE_PERSON", action: action}
    },
}