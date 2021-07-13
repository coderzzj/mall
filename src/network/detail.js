/**
 *  详情页网络请求函数的封装
 * 
*/
import {request} from "./request"

export function getDetailData(iid){
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}
export function recommendData(){
    return request({
        url: "/recommend"
    })
}