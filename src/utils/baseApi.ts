const fetch = require('node-fetch');



export async function post (url: string, authHeader?: string, body?: any, extraHeaders?: any) {    
    const response = await fetch(
        url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'node-fetch',
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': authHeader,
            extraHeaders
            },
        body
    })
    return response
};

export async function get (url: string, authHeader?: any, body?: any, extraHeaders?: any){
    const response = await fetch(
        url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': authHeader,
            extraHeaders
        },
        body
    })

    return response
}

export async function del (url: string, authHeader?: string, body?: any, extraHeaders?: any) {    
    const response = await fetch(
        url, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'node-fetch',
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': authHeader,
            extraHeaders
            },
        body
    })

    return response
};