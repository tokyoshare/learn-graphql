import {colleges} from "../db"

export const getCollege =async ({id}:any) => {
    return colleges.get(id);
}