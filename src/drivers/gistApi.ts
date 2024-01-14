import * as baseApi from '../utils/baseApi';



export class GistApi {
    private baseUrl: string

    constructor(){
        this.baseUrl = 'https://api.github.com';
    }

    getGistAnonumosly = async (gistId: string) => {
        const response = await baseApi.get(
            `${this.baseUrl}/gists/${gistId}`
        )
        return response
        }

    getGsitsByUser = async (userName: string) => {
        const response = await baseApi.get(
            `${this.baseUrl}/users/${userName}/gists`
        )
        return response
    }

    createNewGist = async (files: any, token: string, gistTime?: any) => {
        const response = await baseApi.post(
            `${this.baseUrl}/gists`,
            `Bearer ${token}`,
            await this.buildNewGistBody(files, gistTime), 
        )
        return response
    }

    deleteGist = async (gistId: string, token: string) => {
        let body = {
            gist_id: gistId
        }
        const response = await baseApi.del(
            `${this.baseUrl}/gists/${gistId}`,
            `Bearer ${token}`,
            JSON.stringify(body)
        )
        return response
    }

    buildNewGistBody = async (files?: any, gistTime?: any) => {
        let body = `{"description": "Exmple of test gist ${gistTime}",
                    "public": false,
                    "files": {
                        ${files}
                    }}`
        return body
    }
}