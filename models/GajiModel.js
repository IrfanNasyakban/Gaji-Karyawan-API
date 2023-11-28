import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Gaji = db.define('gaji', {
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    gaji_pokok: DataTypes.STRING,
    tunjangan: DataTypes.STRING,
    bonus: DataTypes.STRING,
    potongan_lainnya: DataTypes.STRING,
    total_gaji: DataTypes.STRING,
}, {
    freezeTableName: true
})

export default Gaji;

(async()=> {
    await db.sync();
})();