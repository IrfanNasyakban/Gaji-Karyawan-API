import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Karyawan = db.define('karyawan', {
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    status: DataTypes.STRING,
    tunjangan: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Karyawan;

(async()=> {
    await db.sync();
})();