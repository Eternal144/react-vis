import React, { Component } from 'react'
import * as d3 from 'd3'
import '../style/peak.css'
import { sortByPeakX,getMaxHot,scaleLinear,scaleBand,beautifyEvent } from '../function/function';

const { min, max,floor } = Math;
const height = 1000,
      width = 900,
      rectH = 50; //折线最高点。
    //   rectPd = 10;

const margin = {top:20, left:30, bottom:20, right:50}
const g_w = width - margin.left - margin.right,
      g_h = width - margin.top - margin.bottom;

const color = [d3.schemeCategory10[0],d3.schemeCategory10[1]]

class PeakChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibel:true,
            svg:null
        }
    }
    //正式画这个峰值图
    drawChart = (data)=>{
        data = sortByPeakX(data,g_w)
        console.log(data)
        var svg = d3.select("#peak-chart")
          .append("svg")
          .attr("width",width)
          .attr("height",height)
        // return svg
        var g = svg.append("g")
                   .attr("transform","translate("+margin.left+","+margin.top+")");
 
        data.forEach((x,i1)=>{
            // if(i1 === 1){
                console.log(x)
                let events = beautifyEvent(x.hot)
                console.log(events)
                let xScale = scaleBand(events.length, g_w)
                let yScale = scaleLinear(events,80)
                // console.log(yScale(7))
                // if(i1 === 0s)
                let tg = g.append("g").attr("transform","translate(0,"+30*i1+")");
                let line_generator= d3.line()
                                      .x((d,i)=>{
                                          return xScale(i);
                                       })
                                      .y((d)=>{
                                          console.log(yScale(d))
                                        return yScale(d)
                                       })
                                      .curve(d3.curveMonotoneX)
                tg.append("path").attr("d",line_generator(events))
                let area_generator = d3.area()
                                       .x((d,i)=>{
                                           return xScale(i);
                                        })
                                        .y0(80)
                                        .y1((d)=> {
                                            return yScale(d);
                                        })
                                        .curve(d3.curveMonotoneX)
                                //画面积
                console.log()
                tg.append("path").attr("d",area_generator(events)).style("fill",color[i1%2])
                // }
            })
        return svg
    }
    componentDidUpdate = ()=>{
        // console.log("aaas")
        // console.log(this.props)
        const { events, visible} = this.props;
        const { svg } = this.state;
        if(!svg && events.length > 0 ){
            // console.log("draw")
            let chart = this.drawChart(events)
            this.setState({
                svg: chart
            })
        }
        
        // 画了图但是设置可见性
        if(svg){
            if(visible){
                svg.style("display","block")
            }else{
                d3.select("thread-event")
                svg.style("display","none")
            }
        }

    }
    render(){
        return(
            <div id="peak-chart"></div>
        )
    }
}

export default PeakChart