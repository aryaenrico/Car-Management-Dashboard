
const express =require("express");
const uploadDisk = require("./middleware/uploadDisk");
const uploadMemory = require("./middleware/uploadMemory");
const cloudinary = require("./config/cloudinary");



const server  =express();
const PORT  =process.env.PORT || 8000;

server.set('view engine', 'ejs')
server.use( express.static( "img" ))
server.use( express.static( "style_tampilan" ))
server.use( express.static( "middleware" ))
server.use(express.urlencoded())
server.use(express.json())


server.get("/",(req,res)=>{
      res.render("index",{});
});

server.get("/car",(req,res)=>{
      res.render("add_car",{});
})

server.post("/data",(req,res)=>{
      console.info(req.body);
      
      res.send("sukses");
      
})

server.get("/cek",(req,res)=>{
      console.info(Pemain.findAll())
})

server.post('/car', uploadDisk.single("picture"), (req, res) => {
      //const url = `/upload/${req.file.filename}`;
      //const file = req.file.filename;
      console.log(req.body.picture);
      console.info(req.body.nama);
      res
        .status(200)
        .json({ message: "Foto berhasil di-upload, silahkan cek URL" });
  })

  server.post('/car/cloud', uploadMemory.single("picture"), (req, res) => {
      const fileBase64 = req.file.buffer.toString("base64")
    const file = `data:${req.file.mimetype};base64,${fileBase64}`
   
    
    cloudinary.uploader.upload(file, (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: "Gagal upload file"
            })
        }

        res.status(201).json({
            message: "Upload file berhasil",
            url: result.url
        })
    })
  })

server.get("/api/v1/data/:angka",(req,res)=>{
      res.send(req.params.angka);
})

server.get("/api/v1/param",(req,res)=>{
      res.send(`${req.query.data1}  ${req.query.data2}`);
})
server.listen(PORT,()=>{
      console.log(`Server Berjalan di http://localhost:${PORT}`);
});


server.post("/tambah",(req,res)=>{
      console.log(req.body)
      res.send(`sukses ${req.body}`);
})

