ReadMe and instruction for syncSourceWrapper module

## Base information:
*Use node.js in v10.x   
*Use  sync-mysql package to communication with DB ([sync-mysql pacakge](https://www.npmjs.com/package/sync-mysql))
*Provide only sync communication with MySQL DB
*Package will not provide any loger mechanism


### Wht is mySQLWrapper?
mySQLWrapper is a light  module to run sql query on MySQL database. Module provide two methods getter and setter. Methods getter should use for all SELECT type statement and return selected rows. Methods setter should use for all UPDATE or INSERT type statmenet and return id of upated or insert row.

### How to run SQL query

1. Add DB credential to .env (DB_SERVER, DB_NAME, DB_LOGIN, DB_PASSWORD, LOG_FILE_PATH, LOG_LEVEL, CONSOLE_LOG_PRINT)
2. Import package to your file `var dbConnect = require('syncsourcewrapper');`
3. Declare new class instance `const dbConnect = new dbConnect.dbConnection();`
4. Run your statement `let statment = dbConnect.getter(sqlQuery, [queryValues])` in query you can put ? char, in places where you want to inject queryValues  from array like this `let statment = dbConnect.getter('SELECT ?, ? FROM products', ['id', 'product_name'])`
5. Check your query status result `statment.status === 500 - whoops we have some error or statment.status === 200 - every thigns goes ok`
6. If you have error you can get error description like this `let queryError = statment.message` or go to log in LOG_FILE_PATH location
7. If everything's goes ok you can get your statement result

For getter

   `{status: 200, selectRows: [{selectedRowObject}...]}`

For setter

`{status: 200, insertRowId: insertRowId, affectedRowsNumber: affectedRowsNumber}`

If you want to close connection call void close method like this
`dbConnect.close();`


## Change log
Version | Description
--------|------------  
1.0.0   | Initial version
2.0.0   | Fix problem with auto close db connection, delete logger from package, add affected rows number in setter function, add close connection method
2.0.1   | Fix problem with log creating. Now log is not auto crete in case of DB error.