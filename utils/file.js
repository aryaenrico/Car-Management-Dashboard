const bcrypt = require('bcryptjs');
const salt =10;
const jwt = require('jsonwebtoken');

async function encryptPassword(password){
  try{
      const encryptedPassword = await bcrypt.hash(password, salt);
      return encryptedPassword
  } catch(e) {
      throw new Error(e)
  }
}

async function checkPassword(password, encryptedPassword){
  try{
      const isCorrect = bcrypt.compare(password, encryptedPassword)
      return isCorrect
  } catch(e){
      throw new Error(e)
  }
}

async function createToken(payload){
  return jwt.sign(payload,process.env.JWT_SIGNATURE_KEY || "arya enrico");
}

module.exports={encryptPassword,checkPassword,createToken};