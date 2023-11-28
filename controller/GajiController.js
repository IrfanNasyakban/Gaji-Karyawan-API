import Gaji from "../models/GajiModel.js";

export const getGaji = async (req, res) => {
    try {
        const response = await Gaji.findAll()

        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const getGajiById = async (req, res) => {
    try {
        const response = await Gaji.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const createGaji = async (req, res) => {
    try {
        await Gaji.create(req.body)
        res.status(201).json({msg: "Gaji Created"})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateGaji = async (req, res) => {
    try {
        await Gaji.update(req.body, {
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Gaji Updated"})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteGaji = async (req, res) => {
    try {
        await Gaji.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Gaji Deleted"})
    } catch (error) {
        console.log(error.message);
    }
}