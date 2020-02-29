import { createPool } from 'promise-mysql';

// mysql2/promise

export async function connect() {
    const connection = await createPool({
        /* host: '46.242.232.152',
        //host: 'hosting1940837.online.pro',
        user: '00286230_mysql',
        password: '5WcK5uJ4TL2s93gy',
        database: '00286230_mysql',
        connectionLimit: 1000000,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        port: 3306 */

        /*  host: '192.168.1.167',
        user: 'mysql',
        password: '5WcK5uJ4TL2s93gy',
        database: 'node_mysql_ts',
        connectionLimit: 100000000  */

        host: '51.178.2.80',
        user: 'mysql',
        password: 'vps2020mysql',
        database: 'node_mysql_ts',
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        connectionLimit: 100000000 

        /*host: '78.11.155.22',
        user: 'mysql',
        password: '5WcK5uJ4TL2s93gy',
        database: 'node_mysql_ts',
        connectionLimit: 10 */
        /*host: 'mysql-sh220297.super-host.pl',
        user: 'db100042222_user',
        password: 'Z3uyDunL',
        database: 'db100042222',
        connectionLimit: 10*/
    });
    console.log('Połaczenie z bazą poprawne!!');
    return connection;
}