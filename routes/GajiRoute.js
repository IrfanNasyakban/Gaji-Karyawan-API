import express from "express";
import { getGaji, getGajiById, createGaji, updateGaji, deleteGaji } from "../controller/GajiController.js";

const router = express.Router()

router.get('/gaji', getGaji)
router.get('/gaji/:id', getGajiById)
router.post('/gaji', createGaji)
router.patch('/gaji/:id', updateGaji)
router.delete('/gaji/:id', deleteGaji)

export default router