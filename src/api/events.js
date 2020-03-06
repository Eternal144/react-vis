import * as d3 from "d3";

export default {
    getEvents:(cb)=>{
        d3.json("./data/log.json")
        .then(data=>{
            cb(data)
        })
    }
}