import {getApiUrl} from "./apiUtils.ts";
import {User} from "../models/User.ts";

const controllerName:string = "auth/";

export async function login(email:string, password:string):Promise<User> {
    console.log(getApiUrl(`${controllerName}login`))
    await fetch(
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
    }).then(async (response:Response) => {
        if (response.status === 404){
            return Promise.reject("User not found");
        }
        const data = await response.json();
        return new User(data.firstName, data.lastName, data.email, data.token);
    });
}