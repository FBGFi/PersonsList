import IListItem from "../interfaces/IListItem";

export default class Person implements IListItem{
    [key: string]: any;
    index: number;
    name: string;
    profession: string;
    age: number;

    constructor(index: number, name = "", profession = "", age = -1){
        this.name = name;
        this.profession = profession;
        this.age = age;
        this.index = index;
    }

}