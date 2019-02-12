const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE //environment variables - used for security and flexibility
    });
}

function sendQuery(query, params) {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query(query, params, function(error, results, fields) {
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


function getTasks(){
    const query = "SELECT * FROM tasks";
    return sendQuery(query);
}

function saveTask(description, done, status, dueDate, userId) {
        const data  =  { 
        description: description, 	
        done: done,
        status: status,
        dueDate: dueDate,
        userId: userId
        };

        const query = "INSERT INTO tasks SET ?"
        const params = data
        return sendQuery(query, params);
}

function deleteTask(taskId) {
    const query = 'DELETE FROM tasks WHERE taskId = ?'
    const params = [taskId]

    return sendQuery(query, params);
}

function updateTaskDescription (taskId, description) {
    const query = 'UPDATE tasks SET description = ? WHERE taskId = ? '
    const params = [[description], [taskId]]

    return sendQuery(query, params);
}


function updateTaskDue (taskId, dueDate) {
    const query = 'UPDATE tasks SET dueDate = ? WHERE taskId = ? '
    const params = [[dueDate], [taskId]]

    return sendQuery(query, params);
}



module.exports = {
    getTasks,
    saveTask,
    deleteTask,
    updateTaskDescription,
    updateTaskDue
}