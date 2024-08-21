import { defineStore } from "pinia";
import { methods, paths } from "@/data/db";

const { get, put, delete:del} = methods
const { allProjects, allTasks, allPersons, allPositions } = paths
export const usePinia = defineStore('DataStore', {
    // Data
    state: () => ({
            projects: [],
            tasks: [],
            persons: [],
            singleTask: null,
            positions: [],
    }),
    // Computed
    getters: {
    },
    // Methods
    actions: {
        deleteTask (taskid) {
            return del(`${allTasks}/${taskid}`).then(() => {
                Promise.all([this.fetchTasks(),this.fetchProjects()])
            })
        },
        deletePosition(positionid) {
            return del(`${allPositions}/${positionid}`).then(()=> {
                this.fetchPositions()
            })
        },
        getPositionById(positionid) {
            return get(`${allPositions}/${positionid}`)
        },
        changeCompleted (taskid, done) {
            const isDone = + done === 0 ? 1 : 0
            return put(allTasks, taskid, {completed: isDone})
            .then(() => {
                
                get(`${allTasks}/${taskid}`)
                .then(data => {
                    const index = this.tasks.findIndex(task => task.id === taskid)
                    this.tasks[index] = data
                })
            })
        },
        fetchProjects(){
            return  get(allProjects).then(data => {
                this.projects = data
            })
        },
        fetchTasks(){
            return get(allTasks).then(data => {
                this.tasks = data
            })
        },
        fetchPersons () {
            return get(allPersons).then(data => {
                this.persons = data
            })
        },
        fetchPositions() {
            return get(allPositions).then(data => {
                this.positions = data
            })
        },
        getTaskById(taskid){
            return get(`${allTasks}/${taskid}`).then((data) => {
                this.singleTask = data
                 return data
            })
        },
        fetchTasksByProjects(projectid){
            const areProjectsFetched = this.projects.length 
            ? Promise.resolve()
            : this.fetchProjects()

            return areProjectsFetched.then(() => {
                get(`${allTasks}?projectid=${projectid}`).then((data) => {
                    const index = this.projects.findIndex(project => {
                        return project.id === projectid
                    })
                    this.projects[index].tasks = data
                })
            })
             
        }
    }
})