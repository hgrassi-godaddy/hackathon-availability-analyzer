import React, { useContext } from 'react'
import '../styles/VisualDiagram.css'
import { ThemeContext } from './ChatApp'

const VisualDiagram: React.FC = () => {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div className={`visual-diagram-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="diagram-title">System Architecture</div>

      <div className="diagram-content horizontal">
        {/* AI Assistant Box */}
        <div className="diagram-box assistant-box">
          <div className="box-title">AI Assistant Agent + MCP Tools</div>
        </div>

        {/* Arrow */}
        <div className="diagram-arrow horizontal">
          <div className="arrow-line"></div>
          <div className="arrow-head"></div>
        </div>

        {/* SPAQ Availability Cluster Box */}
        <div className="diagram-box cluster-box">
          <div className="box-title">SPAQ Availability Cluster (Elastic Search MCP Server)</div>
        </div>

        {/* Arrow */}
        <div className="diagram-arrow horizontal">
          <div className="arrow-line"></div>
          <div className="arrow-head"></div>
        </div>

        {/* Dependencies Log Systems Box */}
        <div className="diagram-box dependencies-box">
          <div className="box-title">Dependencies Log Systems (Custom MCP Server)</div>

          {/* Nested boxes for dependencies */}
          <div className="dependency-boxes">
            <div className="dependency-box">APM Logs</div>
            <div className="dependency-box">Product Graph Logs</div>
            <div className="dependency-box">MWP API Logs</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="diagram-arrow horizontal">
          <div className="arrow-line"></div>
          <div className="arrow-head"></div>
        </div>

        {/* Log Analyzer Box */}
        <div className="diagram-box analyzer-box">
          <div className="box-title">AI Log Analyzer</div>
        </div>

        {/* Arrow */}
        <div className="diagram-arrow horizontal">
          <div className="arrow-line"></div>
          <div className="arrow-head"></div>
        </div>

        {/* Root Cause Box */}
        <div className="diagram-box root-cause-box">
          <div className="box-title">Identifies Root Cause</div>
        </div>
      </div>
    </div>
  )
}

export default VisualDiagram
