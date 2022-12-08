import bcryptjs from "bcryptjs";

export const encryterPassword = async(password) =>{
    try {
        const salt =  await bcryptjs.genSalt(10);
    
        let newPassword = await bcryptjs.hash(password, salt);
        
        return newPassword.toString();

    } catch (error) {
        throw new Error(error);
    }
};

