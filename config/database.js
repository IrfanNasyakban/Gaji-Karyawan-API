import { Sequelize } from "sequelize";

const db = new Sequelize('gaji_karyawan', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;