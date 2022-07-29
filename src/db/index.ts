import { DataStore } from 'notarealdb';
import {join} from "path";

const store = new DataStore(join(__dirname, '../data'));

const students = store.collection('students');

const colleges = store.collection('colleges');

export {
   students,
   colleges
};