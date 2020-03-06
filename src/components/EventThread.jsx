import React, {Component} from 'react'
import * as d3 from 'd3'
import '../style/event.css'
const { min, max,floor } = Math;
const height = 9000,
      width = 800,
      rectH =28,
      rectPd = 10;

const _2020day = [31,31,29,31,30]
const margin = {top:20, left:30, bottom:20, right:50}

class EventThread extends Component{
    constructor(props){
        super(props)
        this.state={
            svg: null,
            visible:true

        }
    }
    date2Num = (d)=>{
        return parseInt(d.replace('-',''));
    }
    
    getMaxHot = (data)=>{
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
    
    getFormatDate = (i,ds)=>{
        // 获取初始月份
        // console.log(i,ds)
        let sm = floor(ds/100);
        // 获取初始日
        let sd = ds%100; //32
        if(sm === 12){
            sm = 0;
        }
        while(i+sd > _2020day[sm]){
            i = sd+i-_2020day[sm];
            sm++;
            sd = 0;
        }
        // console.log(sm,sd,i)
        sm = sm === 0 ? 12 : sm
        let str = `${sm}.${sd+i}`;
        // console.log(str)
        return str
    }
    
    getEven = (scale,d)=>{
        let arr = [];
        d.forEach(x=>{
            arr.push(scale(x))
        })
        let rg = arr.filter((x,i)=>{
            if(i%3 === 0){
                return true
            }
        })
        return { rg };
    }
    
    getDiff = (s,e)=>{
        // 获取结束月份
        let em = floor(e/100);
        let sm = floor(s/100);
        let ed = e%100;
        let diff = 0;
        while(em !== sm){
            diff += ed;
            em--;
            ed = _2020day[em-1]
        }
        diff += ed-s%100;
        return diff
    }
    
    drawChart = (data)=>{
        const { maxh, minh, cd } = this.getMaxHot(data)
        // 差的起始天数
        const dd = parseInt(data[data.length-1].diff)
        // 所有事件最长的天数
        const sd = this.date2Num(data[0].start)
        // let type = getTypes(data)
        // 定义横坐标比例尺
        const xScale = d3.scaleBand()
                        .domain(d3.range(cd))
                        .range([0,width-margin.left-margin.right])
        // console.log(xScale(2))
        const rb  = xScale.round(false).step()
    
        const xAxis = d3.axisBottom(xScale)
                        .ticks(cd)
                        .tickFormat((d,i)=>{
                            if(d%3 !== 0){
                                return ""
                            }else{
                                return this.getFormatDate(d,sd)  
                            }
                        })
                        .tickPadding(2)
                        .tickSizeInner(0)
                        .tickSizeOuter(0)
    
        
        var svg = d3.select("#thread-event")
                    .append("svg")
                    .attr("width",width)
                    .attr("height",height)
        
        svg.append("g")
            .attr("transform",`translate(${margin.left+80},${margin.top})`)
            .call(xAxis)
    
        // 画表格线的data，过滤掉奇数位
        const { rg } = this.getEven(xScale,d3.range(cd))
        // 添加网格线
        var grid = svg.append("g")
        .attr("transform",`translate(${margin.left+80},0)`)
        .selectAll(".grid").
        data(rg).enter().append("g").attr("class","grid")
    
        grid.append("line")
        .attr("y1",margin.top+30)
        .attr("y2",height)
        .attr("x1",(d,i)=>{
            return d+rb/2
        })
        .attr("x2",(d)=>{
            return d+rb/2
        })
    
        var defs = svg.append("defs");
        
        var color = d3.scaleLinear()
                    .domain([minh, (minh+maxh)/2, maxh])
                    .range(["green","yellow","red"]);
        // 给每个事件分段渲染颜色
        data.forEach((x,i1)=>{
            const { hot } = x;
            let ct = svg.append("g")
            .attr("transform",`translate(${margin.left},${margin.top+30})`) //外面那层容器。
    
            const text = ct.append("text")
                        .attr("class","myText")
                        .text(()=>{
                            let wl = 12;
                            if(i1 === 0){
                                wl = 8
                            }
                            
                            if(x.title.length > wl){
                                return `${x.title.slice(0,wl)}...`;
                            }else{
                                return x.title;
                            }
                        })
                        .attr("x",(parseInt(x.diff))*rb+rb/2+80)
                        .attr("y",i1*rectH+(rectH-rectPd)/2)
            let w = text.node().getComputedTextLength()
            text.attr("dx",-w-8)
                .attr("dy",8)
                        
            ct.append("g")
            .attr("transform",`translate(80,0)`)
            .selectAll("rect")
            .data(d3.range(hot.length-1))
            .enter()
            .append("rect")
            .attr("x",(d,i)=>{
                return (parseInt(x.diff)+i)*rb+rb/2
            })
            .attr("y",(d,i)=>{
                return i1*rectH
            })
            .attr("width",rb+1)
            .attr("height",rectH-rectPd)
            .style("fill",(d)=>{
                    let linearGradient = defs.append("linearGradient")
                            .attr("id",`linearColor-${i1}-${d}`)
                            .attr("x1","0%")
                            .attr("y1","0%")
                            .attr("x2","100%")
                            .attr("y2","0%");
                    linearGradient.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",color(parseInt(hot[d])));
    
                    linearGradient.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",color(parseInt(hot[d+1])));
                    return "url(#" + linearGradient.attr("id") + ")";
    
        })         
    })
    return svg;
    }

    componentDidUpdate = ()=>{
        const { events,visible } = this.props;
        const { svg } = this.state
        // 如果还没有画图
        if(!svg && events.length > 0 ){
            // console.log("draw")
            let chart = this.drawChart(events)
            this.setState({
                svg: chart
            })
        }
        
        // 画了图但是设置可见性
        if(svg){
            console.log(visible)
            if(visible){
                svg.style("display","block")
            }else{
                svg.style("display","none")
            }
        }
    }
    render(){
        return(
            <div className="container" id="thread-event"></div>
        )
    }
}
export default EventThread
// const EventThread = ({ events })=>{

//     if(events.length > 0){
//         drawChart(events)
//     }
//     return (
//     <div className="container" id="thread-event"></div>
//     )
// }
