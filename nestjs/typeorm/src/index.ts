import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { UserExtend } from "./entity/UserExtend"

AppDataSource.initialize().then(async () => {
    const user = new User()
    user.username = 'ada3'
    // const userExtend = new UserExtend()
    // userExtend.address = 'ada2';
    // userExtend.mobile = 'xxx'
    // userExtend.user = user;
    await AppDataSource.manager.save(user)
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)
    // await AppDataSource.manager.save(userExtend)
    // const extend = await AppDataSource.manager.find(UserExtend)
    // console.log("Loaded extend: ", extend)
}).catch(error => console.log(error))
