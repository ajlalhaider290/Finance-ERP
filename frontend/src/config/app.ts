import { ILanguage } from "@/interface/common";

const appConfig = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    FILE_PATH: import.meta.env.VITE_BASE_URL + '/public',
    ENVIRONMENT : 'development',
    PERSIST_STORE_NAME : 'boilerplate',
	CACHE_TOKEN: '7dbad5bc-99d2-47dd-81c2-cedd4b8c94f4'

}

export const AVAILABLE_LANGUAGES : ILanguage [] = [
	{
		 "code": "en",
		 "dir" : "ltr"
	}
]

export const {ENVIRONMENT, PERSIST_STORE_NAME,BASE_URL, FILE_PATH, CACHE_TOKEN} = appConfig;
export default appConfig;