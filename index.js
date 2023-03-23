
const express =require("express");
const uploadDisk = require("./middleware/uploadDisk");
const uploadMemory = require("./middleware/uploadMemory");
const cloudinary = require("./config/cloudinary");
const Mobil = require("./mobil");
const { json } = require("express");



const server  =express();
const PORT  =process.env.PORT || 8000;

server.set('view engine', 'ejs')
server.use( express.static( "img" ))
server.use( express.static( "style_tampilan" ))
server.use( express.static( "middleware" ))
server.use(express.urlencoded())
server.use(express.json())


server.get("/", async (req,res)=>{
      let listCar=[];
      let car;
     try{
      car =req.query.size == undefined ? await Mobil.findAll() : await Mobil.findbySize(req.query.size);
      listCar =car;
     }catch(err){
           res.send(err.message).status(500); 
     }
     res.render("index",{
      data:listCar
     });
});

server.delete("/car/:id",async(req,res)=>{
      try{
            const deleteMobil = await Mobil.findById(req.params.id);
            if (deleteMobil == undefined){
                  res.status(404).json({message:"data tidak ada"})
            }else{
                  res.status(200).json({message:"berhasil dihapus"})
            }
         }catch(err){
            res.send(err.message);
         }
      

})

server.get("/car/:id",async(req,res)=>{
      try{
            const detailMobil = await Mobil.findById(req.params.id);
            if (detailMobil != undefined){
                  res.status(200).json({
                        message:"sukses",
                        data:detailMobil
                  });
            }else{
                  res.status(404).json({message:"sukses",data:null});
            }
            
            
         }catch(err){
            res.status(500).send(err.message);
         }
      
   })



server.post("/data",(req,res)=>{
      console.info(req.body);
      
      res.send("sukses");
      
})

server.get("/cek",(req,res)=>{
      console.info(Pemain.findAll())
})

server.get("/add_car",(req,res)=>{
      res.render("add_car",{});
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

  server.post('/car/cloud', uploadMemory.single("foto"),  (req, res) => {
   const fileBase64 = req.file.buffer.toString("base64")
   const file = `data:${req.file.mimetype};base64,${fileBase64}`
   
   
    
    cloudinary.uploader.upload(file, async (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: "Gagal upload file"
            })
        }
        req.body.foto = result.url;
        console.info(req.body.foto);
        console.info(req.body);

        try{
            const mobil = await Mobil.create(req.body);
            res.redirect("/");
      }catch(err){
            res.status(400).json({
                  message : err.message
            })
        }

      //   res.status(201).json({
      //       message: "Upload file berhasil",
      //       url: result.url
      //   })
      
        

        
       

        
    })
  })

  server.get

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

