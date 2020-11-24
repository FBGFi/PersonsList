import Person from '../constants/classes/Person';

const personsReducer = (state = {
    persons: Array<Person>()
}, action: any) => {
    switch (action.type) {      
        case 'SET_PERSONS':
            state.persons = action.action;
            return state;
        case 'CHANGE_PERSON':
            state.persons[action.action.index] = action.action;
            return state;
        case 'DELETE_PERSON':
            // splice doesn't work somehow for the last item
            if(state.persons.length === 1){
                state.persons = [];
            } else {
                state.persons.splice(action.action.index, 1);

                // change indices to correct values
                for (let i = action.action.index; i < state.persons.length; i++) {
                    state.persons[i].index = i;                    
                }
            }          
            return state;
        default:
            return state;
    }
}

export default personsReducer;