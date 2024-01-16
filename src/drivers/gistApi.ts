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

    getPublicGists = async (timeStemp?:any) => {
        const response = await baseApi.get(
            `${this.baseUrl}/gists/public?=${timeStemp}`
        )
        return response 
    }

    createNewGist = async (files: any, token: string, gistTime?: any, isPublic?: boolean) => {
        const response = await baseApi.post(
            `${this.baseUrl}/gists`,
            `Bearer ${token}`,
            await this.buildNewGistBody(files, gistTime, isPublic), 
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

    buildNewGistBody = async (files?: any, gistTime?: any, isPublic?: boolean | false) => {
        let body = `{"description": "Exmple of test gist ${gistTime}",
                    "public": ${isPublic},
                    "files": {
                        ${files}
                    }}`
        return body
    }

    getGistsIds = async (gists: any) => {
        let ids = []
        for (var key in gists){
          ids.push(gists[`${key}`].id)
        }
        return ids
    }
}