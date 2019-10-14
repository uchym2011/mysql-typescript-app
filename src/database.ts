import { createPool } from 'promise-mysql';

// mysql2/promise

export async function connect() {
    const connection = await createPool({
         host: '78.11.155.22',
        user: 'mysql',
        password: '5WcK5uJ4TL2s93gy',
        database: 'node_mysql_ts',
        connectionLimit: 10 
        /*host: 'mysql-sh220297.super-host.pl',
        user: 'db100042222_user',
        password: 'Z3uyDunL',
        database: 'db100042222',
        connectionLimit: 10*/
    });
    console.log('Połaczenie z bazą poprawne!!');
    return connection;
}