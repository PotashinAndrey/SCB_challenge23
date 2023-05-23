const host = "http://localhost";
const port = "8080";

const api = async (method: string, data: any): Promise<any> => {
    try {
        return await fetch(`${host}:${port}/api/${method}`, {
            // mode: "opaque",
            // mode: 'cors',
            // credentials: 'include',
            method: "post",
            // withCredentials: true,
            // crossorigin: true,
            body: JSON.stringify(data),
            // headers: {
            //     "Content-Type": "application/json",
            //     // "Access-Control-Allow-Origin": "*"
            // },
        }).then(r => r.json())
    } catch (e) {
        console.error(e)
    }
}

export default api;