import React from 'react'
import ToggleButton from '../components/ToggleButton'
import { toggleChart } from '../actions/index'
import { connect } from 'react-redux'
// 默认是ture。修改这上面的字。
const ToolsContainer = ({ chartFlag,toggleChart })=>{
    // console.log(chartFlag)
    return(
        <div className="container" id="tools">
            <ToggleButton 
                onToggle = {()=>toggleChart()}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    chartFlag: state.chartFlag
})

export default connect(
    mapStateToProps,
    { toggleChart }
)(ToolsContainer);