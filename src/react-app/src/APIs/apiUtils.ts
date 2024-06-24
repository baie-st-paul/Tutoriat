const address:string = "localhost";
const port:string = "8081";
const apiVersion:string = "api/v1";

export const getApiUrl = (endpoint:string):string => {
    return `http://${address}:${port}/${apiVersion}/${endpoint}`;
}

export const getHeaders = (token:string) => {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}