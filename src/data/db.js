
const baseURL = "https://sdaapi.glabazna.eu/"

export const paths = {
    allProjects: "js6projects",
    allTasks: "js6tasks",
    allPersons: "js6persons",
    allPositions: "js6positions",
    allPersonstasks: "js6personstasks",
    allPersonstasksById: "js6personstasks?taskid=12",
}

export const methods = {
    // GET method
     get(path) {
        return fetch(baseURL + path)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' + response.statusText)
            }
            return response.json()
        })
        .then(data => {
            return data.data
        })
        .catch(error => console.log('GET error: ', error))
    },
    // POST method
    post(path, body) {
        return fetch(baseURL + path, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' + response.statusText)
            }
            return response.json()
        })
        .then(data => console.log('POST:', data))
        .catch(error => console.log('POST Error', error))
    },
    // PUT method
    put(path, recordNumber, body) {
        return fetch(baseURL + path + "/" + recordNumber, { 
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' , + response.statusText)
            }
            return response.json()
        })
        .then(data => console.log('PUT:', data))
        .catch(error => console.log('PUT Error: ', error))
    },
    // DELETE method
    async delete(path, recordNumber) {
        return await fetch(baseURL + path + "/" + recordNumber, {
            method: 'DELETE',
        })
        .then(response => {
            console.log(response)
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' , + response.statusText)
            }
            if(response.status === 204) {
                console.log("204: smazano")
                return "item " + recordNumber + " deleted"
            }
            return response.json()
        })
        .then(data => console.log('DELETE:', data))
        .catch(error => console.log('DELETE Error: ', error))
    }
} 