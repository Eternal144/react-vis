import React from 'react'
import {connect} from 'react-redux'
import PeakChart from '../components/PeakChart'
import '../style/peak.css'

// 在这里获取过滤后的数据。
const PeakChartContainer = ( { events, visible } ) =>(
    <PeakChart 
        events={events}
        visible={visible}
    />
)

const mapStateToProps = state =>({
    events: state.events
})
export default connect(mapStateToProps)(PeakChartContainer)