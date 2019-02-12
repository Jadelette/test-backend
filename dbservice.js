const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE //environment variables - used for security and flexibility
    });
}

function getTasks(){
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM tasks", function(error,results, fields){ //select * from [view name] to run the query stored in the view
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}

function saveTask(description, done, status, dueDate, userId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        const data  =  { 
        description: description, 	
        done: done,
        status: status,
        dueDate: dueDate,
        userId: userId
        };
        connection.query('INSERT INTO tasks SET ?', data, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });

}

function deleteTask(taskId) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject){
        
        connection.query('DELETE FROM tasks WHERE taskId = ?', [taskId], function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });

    });
}

function updateTaskDescription (taskId, description) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query('UPDATE tasks SET description = ? WHERE taskId = ? ', [[description], [taskId]], function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}


function updateTaskDue (taskId, dueDate) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query('UPDATE tasks SET dueDate = ? WHERE taskId = ? ', [[dueDate], [taskId]], function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}

module.exports = {
    getTasks,
    saveTask,
    deleteTask,
    updateTaskDescription,
    updateTaskDue
}