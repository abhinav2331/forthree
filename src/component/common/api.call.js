import axios from "axios";
import { API_URI, API_URI_TOKEN } from "./api.uri";
var token = sessionStorage.currentUserToken;
var userId = sessionStorage.currentUserId;

console.log("==@Action data==");
console.log(token);

//Use for get the API
export const forGet = (api_path) => axios({   
    method: 'get',
    url: `${API_URI}/` +api_path,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + sessionStorage.currentUserToken,
    }
});

// Use for post the API
export const forPost = (api_path, postData) => axios({
    method: 'post',
    url: `${API_URI}/` + api_path,
    data: JSON.stringify(postData),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + sessionStorage.currentUserToken,
    }
});

// Use for normal post the API
export const forRegPost = (api_path, postData) => axios({
    method: 'post',
    url: `${API_URI}/` + api_path,
    data: JSON.stringify(postData),
    headers: {
        'Content-Type': 'application/json'        
    }
});

export const forPostNormal = (api_path, postData) => axios({
    method: 'post',
    url: `${API_URI_TOKEN}/` + api_path,
    data: postData   
});


// Use for put the API
export const forPut = (api_path, postData) => axios({
    method: 'put',
    url: `${API_URI}/` + api_path,
    data: JSON.stringify(postData),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + sessionStorage.currentUserToken,
    }
});

// Use for delete the API
export const forDelete = (api_path) => axios({
    method: 'delete',
    url: `${API_URI}/` + api_path,    
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "bearer " + sessionStorage.currentUserToken,
    }
});