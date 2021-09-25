/*
Class dbConnection provide connection to sqlite database
Method getter - run get command (arg "query":string - single select sql query eg. 'select * from productList where id = 1')
Method setter - run insert command (args "query":string - single insert sql query eg. 'insert into productList (products, quantity) values (?,?', )
Methods return object with status (500 - error, 200 - OK) and specific dbConnection:
in case of error: {status: 500, message: e}
in case of select(getter function): {status: 200, selectRows: [{}]:array of selected  row objects  };
in case of change(setter function) row: {status: 200, insertRowId: X:int insert row id, affectedRowsNumber: X:num number of changed or insert row}
 */

class dbConnection {
    constructor() {
        this.db = require('sync-mysql');
        this.connection = new this.db({
            host: process.env.DB_SERVER,
            user: process.env.DB_LOGIN,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }

    getter(query, values){
        try{
            var stmt = this.connection.query(query, values);
            var result = {status: 200, selectRows: stmt};
        }catch (e) {
            var result  = {status: 500, message: e};
        }

        return result;
    }

    setter(query, values){
        try{
            var stmt = this.connection.query(query, values);
            var result = {status: 200, insertRowId: stmt.insertId, affectedRowsNumber: stmt.affectedRows};
        }catch (e) {
            var result = {status: 500, message: e};
        }

        return result;
    }

    close(){
        this.connection.dispose();
    }
}

module.exports.dbConnection = dbConnection;