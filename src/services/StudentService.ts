import {students} from "../db"

export const greeting = ()=>{
    return "Hello from Student Service";
}

export const getStudents = ()=>{
    console.log(students);
    return students.list();
}

export const getStudent = ({id}:any)=>{
    console.log("ID", id);
    return students.get(id);
}

export const createStudent = ({collegeId, firstName, lastName}:any)=>{
    return students.create({
        collegeId,
        firstName,
        lastName
    })
}

export const updateStudent = async({id, collegeId, firstName, lastName}:any)=>{
    const entity:any = {id};
    if(collegeId) entity["collegeId"] = collegeId;
    if(firstName) entity["firstName"] = firstName;
    if(lastName) entity["lastName"] = lastName;
    console.log("Entity:", entity);
    await students.update(entity);
    return students.get(id);
}

export const signUp = async({email, password, firstName, lastName}:any)=>{
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
    const isValidEmail =  emailExpression.test(String(email).toLowerCase())
    if(!isValidEmail)
    throw new Error(`email ${email} not in proper format`)

    if(firstName.length > 15)
    throw new Error("firstName should be less than 15 characters")

    if(password.length < 8 )
    throw new Error("password should be minimum 8 characters")
    
    let id= students.create({
        email,
        password,
        firstName,
        lastName
    });
    return students.get(id);
}