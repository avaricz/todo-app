import { defineStore } from "pinia";
import { methods, paths } from "@/data/db";

const { get } = methods
const { allProjects, allTasks } = paths

export const usePinia = defineStore('DataStore', {
    // Data
    state: () => ({
        projects: [],
        tasks: [],
    }),
    // Computed
    getters: {
        
    },
    // Methods
    actions: {
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