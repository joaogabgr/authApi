const mysql = require('mysql2/promise');

const changePassword = async () => {
  const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root'
  };

  try {
    const connection = await mysql.createConnection(connectionConfig);

    await connection.query(`drop database if exists authApi;`);
    await connection.query(`create database if not exists authApi;`);
    console.log(`Database created!`);

    await connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
};

changePassword();
