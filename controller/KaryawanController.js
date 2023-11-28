import Karyawan from "../models/KaryawanModel.js";
import path from "path";
import fs from "fs";

export const getKaryawan = async (req, res) => {
  try {
    const response = await Karyawan.findAll();

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKaryawanById = async (req, res) => {
  try {
    const response = await Karyawan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveKaryawan = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const nama = req.body.nama;
  const nip = req.body.nip;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const jabatan = req.body.jabatan;
  const status = req.body.status;
  const tunjangan = req.body.tunjangan;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Karyawan.create({
        nama: nama,
        nip: nip,
        email: email,
        alamat: alamat,
        jabatan: jabatan,
        status: status,
        tunjangan: tunjangan,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Karyawan Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateKaryawan = async (req, res) => {
  const karyawan = await Karyawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!karyawan) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = karyawan.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${karyawan.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const nama = req.body.nama;
  const nip = req.body.nip;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const jabatan = req.body.jabatan;
  const status = req.body.status;
  const tunjangan = req.body.tunjangan;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Karyawan.update(
      { 
        nama: nama,
        nip: nip,
        email: email,
        alamat: alamat,
        jabatan: jabatan,
        status: status,
        tunjangan: tunjangan,
        image: fileName, 
        url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Karyawan Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKaryawan = async (req, res) => {
    const karyawan = await Karyawan.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!karyawan) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${karyawan.image}`;
        fs.unlinkSync(filepath);
        await Karyawan.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Karyawan Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
};
