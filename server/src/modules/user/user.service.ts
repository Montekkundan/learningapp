import { User, UserModel } from "./user.model";

export async function CreateUser(user: Omit<User, 'comparePassword'>){
    return UserModel.create(user);
}

export async function FindUserByEmail(email: User['email']){
    return UserModel.findOne({email});
}

export async function deleteUser(userId: string) {
    await UserModel.deleteOne({_id: userId});
}

export async function findAllUsers() {
    return UserModel.find({});
}

