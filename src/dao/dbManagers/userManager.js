import userModel from "../models/userModel";

export default class UsersDBManager {
    constructor(){
        console.log('working users with DB')
    }

    getByEmail = async(email)=>{
        const user = await userModel.findOne({email}).lean();
        return user
    }

    save =  async(user)=>{
        const result = await userModel.create(user)
        return result
    }

}