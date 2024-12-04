import commonapi from "./CommonApis"

import axios from 'axios';

// export const userRegister=(data)=>{
    
//     return commonapi("POST",data,"http://127.0.0.1:8000/register/","")
// }
// export const userLogin=(data)=>{
    
//     return commonapi("POST",data,"http://127.0.0.1:8000/token","")
// }



export const listTask=(header)=>{
    
    return commonapi("GET","","http://127.0.0.1:8000/tasks/",header)
}

export const taskDetail=(id)=>{
    
    return commonapi("GET","",`http://127.0.0.1:8000/tasks/${id}/`)
}


export const addTask=(data,header)=>{
    return commonapi("POST",data,"http://127.0.0.1:8000/tasks/",header)
}
export const taskDelete=(id)=>{
    
    return commonapi("DELETE","",`http://127.0.0.1:8000/tasks/${id}/`)
}
export const taskUpdate=(id,data)=>{
    return commonapi("PUT",data,`http://127.0.0.1:8000/tasks/${id}/`)
}