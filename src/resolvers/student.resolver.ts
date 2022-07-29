import { resolver } from "../helpers/resolver";
import { getCollege } from "../services/CollegeService";
import { greeting, getStudents, getStudent, createStudent, updateStudent, signUp } from "../services/StudentService";

//override or custom field for Student type defined in the schema.graqhl
export const Student = {
    password: resolver(() =>'***'),
    fullName: resolver(({firstName, lastName}:any) => `${firstName} ${lastName}`),
    college: resolver(({collegeId}:any)=>getCollege({id:collegeId})),
}

//implements for the Query type defined in the schema.graphql
export const Query = {
    test:()=>"Other test",
    greeting,
    sayHello:resolver(({name}:any)=> `Hello ${name}`),
    students: resolver(getStudents),
    student:resolver(getStudent),
    setFavouriteColor: resolver(({color}:any)=> `Your fav color is ${color}`),
}

//implement for the Mutation type defined in the schema.graphql
export const Mutation = {
    student: resolver(createStudent),
    updateStudent: resolver(updateStudent),
    signUp:resolver(({data}:any)=>signUp({...data}))
}

