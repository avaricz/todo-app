export const projects = [
    {
        project: "Project 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque! Culpa consequuntur debitis accusamus vero dolor laboriosam, iste repellat optio dignissimos perspiciatis?",
        people: ["Adam", "Někdo", "Nikdo", "Ten Taky", "Tamten Též"],
        deadline: "31.12.2024",
        todos: [
            "todo11",
            "todo12",
            "todo13"
        ]
    },
    {
        project: "Project 2",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque! Culpa consequuntur debitis accusamus vero dolor laboriosam, iste repellat optio dignissimos perspiciatis?",
        people: ["Adam", "Někdo", "Nikdo", "Ten Taky", "Tamten Též"],
        deadline: "31.12.2024",
        todos: [
            "todo21",
            "todo22",
            "todo23"
        ]
    },
    {
        project: "Project 3",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque! Culpa consequuntur debitis accusamus vero dolor laboriosam, iste repellat optio dignissimos perspiciatis?",
        people: ["Adam", "Někdo", "Nikdo", "Ten Taky", "Tamten Též"],
        deadline: "31.12.2024",
        todos: [
            "todo31",
            "todo32",
            "todo33"
        ]
    }
]

export const tasks = [
    {
        id:1,
        title: "first task",
        deadline: "2024-07-13",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque!",
        done: false,
        priority: 1,
        projectId: "",
        personId: "",
    },
    {
        id:2,
        title: "second task",
        deadline: "2024-07-13",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque!",
        done: false,
        priority: 2,
        projectId: "",
        personId: "",
    },
    {
        id:3,
        title: "thirth task",
        deadline: "2024-07-13",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque!",
        done: false,
        priority: 3,
        projectId: "",
        personId: "",
    },
    {
        id:4,
        title: "fourth task",
        deadline: "2024-07-13",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque!",
        done: false,
        priority: 1,
        projectId: "",
        personId: "",
    }
]

export const persons = [
    {
        firstName: "Adam",
        lastName:  "Hádl",
        position:  "worker",

    },
    {
        firstName: "Pepa",
        lastName:  "Náhodný",
        position:  "driver",

    },
    {
        firstName: "David",
        lastName:  "Nedavid",
        position:  "manager",

    }
]

export const positions = ["manager", "worker", "driver"]