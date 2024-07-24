
// const url = "https://sdaapi.glabazna.eu/js6tasks?projectid=project.id"

const url = "https://sdaapi.glabazna.eu/"
const allProjects = "js6projects/"

export default {
    // GET method
    get() {
        fetch(url + allProjects)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response wasn\'t ok' + response.statusText)
            }
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log('GET error: ', error))
    },
    // POST method
    post() {
        fetch(url + allProjects, {
            method: 'POST',
            body: JSON.stringify({
                    project: 'AH - Project1', 
                    description: 'Adamuv pokus'
                })
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
        fetch(url + allProjects + recordNumber, { 
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
    delete(recordNumber) {
        fetch(url + allProjects + recordNumber, {
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