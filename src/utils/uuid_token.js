import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串，每次执行不发生改变
export const getUUID = ()=>{
    //先看本地有没有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //没有在创建并存储
    if(!uuid_token){
        let uuid_token = uuidv4();
        //存储
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    //返回uuid
    return uuid_token;
}