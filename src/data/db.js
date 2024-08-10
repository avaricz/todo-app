
const baseURL = "https://sdaapi.glabazna.eu/"

export const paths = {
    allProjects: "js6projects/",
    allTasks: "js6tasks/",
    allPersons: "js6persons/",
    allPositions: "js6positions/"

}

export const methods = {
    // GET method
     get(path) {
        const data = fetch(baseURL + path)
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

        return data
    },
    // POST method
    post(path, body) {
        fetch(baseURL + path, {
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
    put(recordNumber) {
        fetch(baseURL + allProjects + recordNumber, { 
            method: 'PUT',
            body: JSON.stringify({
                project: 'AH - Project1',
                description: 'Adamuv pokus a jeho update 2'
            })
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
    delete(path, recordNumber) {
        fetch(baseURL + path + recordNumber, {
            method: 'DELETE',
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' , + response.statusText)
            }
            return response.json()
        })
        .then(data => console.log('DELETE:', data))
        .catch(error => console.log('DELETE Error: ', error))
    }
} 