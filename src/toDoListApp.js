const databaseOperations = require("./databaseOperations");

module.exports = {
    getListOfTasks: async function (){
        return await databaseOperations.getRows();
    },
    createOrUpdateTask: async function (reqBody){
        let task = {
            id: reqBody.id,
            name: reqBody.name,
            description: reqBody.description,
            isComplete: reqBody.isComplete,
        };
        let result = await databaseOperations.createOrUpdateRow(task);
        return result;
    },
    deleteTask: async function (reqBody){
        let task = {
            id: reqBody.id
        };
        let result = await databaseOperations.deleteRow(task);
        return result;
    },
    markCompleteTask: async function (reqBody){
        let task = {
            id: reqBody.id
        };
        let result = await databaseOperations.updateRowToMarkComplete(task);
        return result;
    }
};