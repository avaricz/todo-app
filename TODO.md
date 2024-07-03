 # JS6 - final project
 ##### ToDo aplikace - admin rozhraní
## FUNKCIONALITY
- [ ] zobrazit seznam projektů
- [ ] zobrazit seznam tasks v každém projektu
- [ ] přidat / editovat projekt
- [ ] přidat /editovat task
- [ ] zobrazit seznam tasks (všech, s filtrem - nedokončené, s prioritou ... atd.)
- [ ] zobrazit seznam lidí
- [ ] zobrazit detail člověka s přidělenými úkoly
- [ ] statistika - kolik má úkolů, kolik z toho splněných, kolik po termínu, kolik před termínem
- [ ] v seznamech tasks - graficky odlišit hotové / nehotové / nehotové over due
- [ ] graficky odlišit tasks, které nemají přiřazené lidi
- [ ] přidat a editovat lidi
- [ ] přidávat a odebírat lidi z jednotlivých tasks
- [ ] vymyslet nějak způsob přidávání positions
- [ ] mazání záznamů
- [ ] nelze smazat projekt, pokud obsahuje tasks
- [ ] když mažeme task, automaticky smažeme i k němu přidělené lidi (personstasks tabulka)
- [ ] když smažeme člověka, auutomaticky smžeme záznamy v personstasks, které se ho týkají - nemůžeme mazat position, pokud se k ní vážou lidi
## DATABÁZE A TABULKY
### PROJECTS
- id (number) (NOT NULL)
- project (string 255) (NOT NULL) 
- description (text)
{id, project, description}
1 - zahrada - práce na zahrádce mojí malé
### TASKS (RELACE 1:N K PROJECTS)
- id (number) (NOT NULL)
- task (string 255) (NOT NULL)
- date (date) (NOT NULL) - ‘YYYY-MM-DD’ 
- completed (number [0, 1]) (NOT NULL)
- priority (number [1, 2, 3]) (NOT NULL)
- projectid (number) (NOT NULL)
- file (string - cesta k souboru - 255)
{id, task, date, completed, priotity, projectid, projects.project, file(path)}
1 - zahrada - hrabat listí - datum - priority low
### PERSONS (RELACE 1:N K POSITIONS)
- id (number) (NOT NULL)
- first (string 255) (NOT NULL)

 - last (string 255) (NOT NULL)
- positionid (number) (NOT NULL)
{id, first, last, positionid, positions.position}
1 - Karel Houska, hrabač
### POSITIONS
- id (number) (NOT NULL)
- position (string 255) (NOT NULL)
{id, position}
### PERSONSTASKS (RELACE M:N)
- id (number) (NOT NULL)
- personid (number) (NOT NULL) - taskid (number) (NOT NULL)
{id, personid, taskid, persons.first, persons.last, persons.positionid, positions.position, tasks.task, tasks.date, tasks.completed, tasks.priority, tasks.projectid, projects.project}
11 1
‘tablename’ - vrátí všechny záznamy z table
‘tablename?column=value’ - vrátí vyfiltrované záznamy nebo [] ‘tablename?column1=value1&column2=value2’ - vrátí vyfiltrované záznamy nebo [] ‘tablename/id’ - vrátí jeden záznam z table, který má id
vypsat všechny tasks, na kterých pracuje Karel Houska: ‘personstasks?personid=1’
vypsat všechny lidi, kteří pracují na hrabání listí: ‘personstasks?taskid=1’
vypsat všechny lidi, kteří pracují na nějakém úkolu z projektu zahrada: ‘personstasks?projectid=1’
vypsat všechny úkoly z projektu zahrada: ‘tasks?projectid=1’
vypsat všechny úkoly z projektu zahrada, které jsou nesplněné a mají prioritu 3: ‘tasks?projectid=1&completed=0&priority=3’
  