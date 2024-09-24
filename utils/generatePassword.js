import bcrypt from 'bcryptjs';

export const generatePassword=async ()=> {
    const password = Math.random().toString(36).slice(-8); // simple alphanumeric password
    console.log(password);
    const saltround =await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltround);
};
