const {Client} = require("pg");

const dbName = "toDoListAppDB";
const tableName = "tasks";

const config = {
    user: 'postgres',
    host: 'db',
    password: 'test123',
    port: 5432,
    database: dbName,
    ssl: false
};

module.exports = {
    createDatabase: async function(){
        try{
            const client = new Client(config);
            await client.connect()
            await client.query(`DROP DATABASE IF EXISTS ${dbName};`)
            await client.query(`CREATE DATABASE ${dbName};`)
            await client.end()
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    },
    createTable: async function(){
        try{
            const client = new Client(config);
            await client.connect();
            await client.query(`DROP TABLE IF EXISTS ${tableName};`);
            await client.query(`CREATE TABLE ${tableName} (ID INT PRIMARY KEY     NOT NULL,
                                                        NAME  CHAR(50)    NOT NULL,
                                                        DESCRIPTION  TEXT,
                                                        IS_COMPLETE  BOOLEAN  DEFAULT FALSE);`);
            await client.end();
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    },
    createOrUpdateRow: async function(task){
        try{
            const client = new Client(config);
            await client.connect();
            let query = `INSERT INTO ${tableName} (ID, NAME, DESCRIPTION,IS_COMPLETE)
                        VALUES (${task.id}, '${task.name}', '${task.description}', ${task.isComplete})
                        ON CONFLICT (id) DO UPDATE 
                        SET ID = ${task.id}, 
                            NAME = '${task.name}',
                            DESCRIPTION = '${task.description}',
                            IS_COMPLETE = ${task.isComplete};`;
            await client.query(query);
            await client.end();
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    },
    updateRowToMarkComplete: async function(task){
        try{
            const client = new Client(config);
            await client.connect();
            await client.query(`UPDATE ${tableName}
                                SET IS_COMPLETE = TRUE
                                WHERE ID = ${task.id};`);
            await client.end();
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    },
    deleteRow: async function(task){
        try{
            const client = new Client(config);
            await client.connect();
            await client.query(`DELETE FROM ${tableName}
                                WHERE ID=${task.id};`);
            await client.end();
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
    },
    getRows: async function(){
        try{
            const client = new Client(config);
            await client.connect();
            return await client.query(`SELECT * FROM ${tableName};`).finally(() => {
                client.end();
            });
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
};