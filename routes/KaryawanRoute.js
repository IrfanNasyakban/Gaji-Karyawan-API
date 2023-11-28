import express from "express";
import { getKaryawan, getKaryawanById, saveKaryawan, updateKaryawan, deleteKaryawan } from "../controller/KaryawanController.js";

const router = express.Router()

router.get('/karyawan', getKaryawan)
router.get('/karyawan/:id', getKaryawanById)
router.post('/karyawan', saveKaryawan)
router.patch('/karyawan/:id', updateKaryawan)
router.delete('/karyawan/:id', deleteKaryawan)

export default router