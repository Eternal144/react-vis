import React from 'react';
import '../style/app.css'
import EventThreadContainer from './EventThreadContainer'
import PeakChartContainer from './PeakChartContainer'
import ToolContainer from './ToolsContainer'
import { connect } from 'react-redux';
const App = ({ chartFlag })=>(
  <div className="App" id="app">
    <EventThreadContainer visible={chartFlag}/>
    <PeakChartContainer visible={!chartFlag}/>
    {/* { chartFlag ? <EventThreadContainer/> :  <PeakChartContainer />} */}
    <ToolContainer/>
    </div>
)

const mapStateToProps = state =>({
  chartFlag: state.chartFlag
})

export default connect(
  mapStateToProps
)(App);
