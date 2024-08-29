# ToDo aplikace - admin rozhraní

## FUNKCIONALITY
- [x] zobrazit seznam tasks v každém projektu
- [x] přidat / editovat projekt
- [x] přidat /editovat task
- [x] zobrazit seznam lidí
- [x] přidat a editovat lidi
- [x] v seznamech tasks - graficky odlišit hotové / nehotové / nehotové over due
- [x] vymyslet nějak způsob přidávání positions
- [x] mazání záznamů
- [x] zobrazit detail člověka s přidělenými úkoly
- [x] graficky odlišit tasks, které nemají přiřazené lidi
- [x] přidávat a odebírat lidi z jednotlivých tasks
- [ ] zobrazit seznam tasks (všech, s filtrem - nedokončené, s prioritou ... atd.)
- [ ] statistika - kolik má úkolů, kolik z toho splněných, kolik po termínu, kolik před termínem
- [ ] nelze smazat projekt, pokud obsahuje tasks
- [ ] když mažeme task, automaticky smažeme i k němu přidělené lidi (personstasks tabulka)
- [ ] když smažeme člověka, auutomaticky smžeme záznamy v personstasks, které se ho týkají - nemůžeme mazat position, pokud se k ní vážou lidi

## issues
- [x] Upravit form pro Project, aby se textarea roytahovala automaticky s pribyvajicim textem
- [ ] Opravit, pri smazani ukolu v projektu znovu nacist tasky (aktualne vsechny zmizi)
- [ ] Doresit problem s ikonami. V nekterych pripadech se po refreshi nenactou obrazky
- [ ] Duplicita pridelenych lidi na task. V pripade, ze clovek jiz na ukolu pracuje, tak nesmi byt v Select k vyberu

# todo-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

