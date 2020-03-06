import React from 'react'
import EventThread from '../components/EventThread'
import { connect } from 'react-redux'

//负责进行数据交互，在这里对数据有操作吗？
const EventThreadContainer = ({ events, visible })=>(
    <EventThread 
        events={events}
        visible={visible}
    />
)

//渲染需要的数据，最大热度过滤，返回过滤后数据，100%进度条分布。比例尺
const mapStateToProps = state =>({
    events: state.events
})

export default connect(
    mapStateToProps,
)(EventThreadContainer)