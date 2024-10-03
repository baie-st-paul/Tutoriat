import {getApiUrl} from "./apiUtils.ts";
import {User} from "../models/User.ts";

const controllerName:string = "auth/";

export async function login(email:string, password:string):Promise<User> {
    return await fetch(
        getApiUrl(`${controllerName}login`),
    {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({email, password})
     }
    ).catch((error) => {
        console.error("Error:", error);
    }).then(async (response: Response) => {
        if (response.status === 404) {
            return Promise.reject("User not found");
        }
        const data = await response.json();
        return new User(data.firstName, data.lastName, data.email, data.token);
    });
}

export async function registerStudent(firstname:string, lastname:string, email:string, password:string):Promise<User> {
    return await fetch(
        getApiUrl(`${controllerName}registerStudent`),
    {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:password
        })
     }
    ).catch((error) => {
        console.error("Error:", error);
    }).then(async (response: Response) => {
        if (response.status === 400) {
            return Promise.reject("Erreur lors de l'inscription");
        }
        const data = await response.json();
        return new User(data.firstName, data.lastName, data.email, data.token);
    });
}

export async function registerTeacher(firstname:string, lastname:string, email:string, password:string, subjects:Array<string>):Promise<User> {
    let subjectsList = "";
    for (let i = 0; i < subjects.length; i++) {
        subjectsList += "subjects=".concat(subjects[i]);
        if (i !== subjects.length - 1) {
            subjectsList += "&";
        }
    }

    return await fetch(
        getApiUrl(`${controllerName}registerTeacher?${subjectsList}`),
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                firstName:firstname,
                lastName:lastname,
                email:email,
                password:password
            })
        }
    ).catch((error) => {
        console.error("Error:", error);
    }).then(async (response: Response) => {
        if (response.status === 400) {
            return Promise.reject("Erreur lors de l'inscription");
        }
        const data = await response.json();
        return new User(data.firstName, data.lastName, data.email, data.token);
    });
}

export async function existByEmail(email:string):Promise<boolean> {
    return await fetch(
        getApiUrl(`${controllerName}exists/${email}`),
    {
        method: "GET",
     }
    ).catch((error) => {
        console.error("Error:", error);
    }).then(async (response: Response) => {
        return response.status !== 404;
    });
}