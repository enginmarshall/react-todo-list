# TODO list
## Uppgift

En TODO-applikation har byggts, men har tyvärr en del buggar.

Applikationen ska:
* Läsa in todo-data från API vid start av applikationen
  * Dessutom ska todo-listan synkas var 15e minut
* Uppdatera todo-data via API vid:
  * Ny todo läggs till
  * En todo bockas av
  * En todo tas bort



## API endpoints

Hämta alla todos

```
GET: http://localhost:3001/todos
```

Skapa en ny todo

```
POST: http://localhost:3001/todos

CreateTodoRequest: 

{
  "task": string;
  "isDone": boolean;
}
```

Uppdatera en befintlig todo (endast isDone-flaggan kan uppdateras)

```
PATCH: http://localhost:3001/todos/{id}

UpdateTodoRequest: 

{
  "isDone": boolean;
}
```

Ta bort en befintlig todo

```
DELETE: http://localhost:3001/todos/{id}

```