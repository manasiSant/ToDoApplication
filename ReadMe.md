Server is hosted on localhost:3000

Routes defined are - 
1. /getTasks - Lists all tasks
2. /createTask - creates new task
    Request Body - 
    {
        "id": 123,
        "name": "Do todo app project",
        "description": "Deadline - wednesday",
        "isComplete": false
    }
3. /updateTask - upsert behavior is implemented. If task not found it will be added otherwise will be updated.
    Request Body - 
    {
        "id": 123,
        "name": "Do todo app project",
        "description": "Deadline - thursday (revised)",
        "isComplete": false
    }

4. /deleteTask - deletes a task
    Request Body - 
    {
        "id": 123
    }

5. /markComplete - marks task as completed
    Request Body - 
    {
        "id": 123
    }