export class Pemain{
      static data=[];
      constructor(nama,gaji){
            this.nama = nama;
            this.gaji = gaji;
      }

      static create({nama,gaji}){
            const obj = new Pemain(nama,gaji);
            this.data.push(obj);
            
      }

      static findAll(){
            return this.data;
      }
}