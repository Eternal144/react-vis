import * as d3 from 'd3'

const { min, max,floor } = Math;

export const scaleBand = (x,y)=>(
    d3.scaleBand()
      .domain(d3.range(x))
      .range([0,y])
)

export const scaleLinear = (x,rg)=>(
    d3.scaleLinear()
      .domain([d3.min(x),d3.max(x)])
      .range([rg,0])
)

const getX = (obj,y)=>{
    return scaleBand(obj.hot.length,y)(obj.hot.indexOf(d3.max(obj.hot)))
}

// 按峰值出现的x坐标排序，对给定事件进行返回。
export const sortByPeakX = (events, w)=>{
    events.sort((x,y)=>{
        return getX(x,x.hot.length,w) - getX(y,y.hot.length,w)
    })
    return events
}

export const getMaxHot = (data)=>{
    let maxh = 0,
        minh = 99,
        cd = 0;
    data.forEach((x)=>{
        maxh = max(d3.max(x.hot),maxh)
        minh = min(d3.min(x.hot),minh)
        cd = max(x.hot.length+parseInt(x.diff),cd)
    })
    // console.log(cd)
    return { maxh, minh, cd};
} 

export const beautifyEvent = (arr)=>{
    let rd;
    let sm = d3.min(arr)
    for (let i in d3.range(5)){
        rd = sm + Math.random()*sm;
        arr = [rd].concat(arr)
    }
    for(let i in d3.range(5)){
        rd = sm + Math.random()*sm;
        arr.push(rd)
    }
    return arr;
}