import React, { useState } from "react"

import { Button } from "@/components/ui/button"

const BarGraph = ({ onSelect }: { onSelect: (option: string) => void }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    onSelect(option)
  }

  // Dummy data for the bar graph
  const graphData = [40, 10, 60, 60] //example data
  const maxDataValue = Math.max(...graphData)
  const labels = ["DEL", "BLR", "ND1", "DL1"]

  const renderBars = () => {
    return graphData.map((value, index) => (
      <div
        key={index}
        className="flex flex-col items-center"
        style={{ marginRight: "100px" }}
      >
        <div
          className="mt-auto bg-blue-500"
          style={{
            width: "40px",
            height: `${(value / maxDataValue) * 400}px`,
            marginBottom: "50px",
          }}
        ></div>
        <span className="text-xs">{value}</span>
        <span className="mt-1 text-xs">{labels[index]}</span>
      </div>
    ))
  }
  //X and Y axis for the bar graph
  /*const renderYAxis = () => {
    const yAxisValues = Array.from(Array(11).keys()).map((_, index) => index * 10);
    return yAxisValues.map((value) => (
      <div key={value} className="flex flex-col items-end mt-auto" style={{ marginTop: "10px" }}>
        <span className="text-xs">{value}</span>
        <div className="bg-gray-300" style={{ width: "20px", height: "1px" }}></div>
      </div>
    ));
  };

  const renderXAxisLabels = () => {
    return labels.map((label, index) => (
      <span key={index} className="text-xs mt-auto" style={{ width: "40px", textAlign: "center" }}>{label}</span>
    ));
  };
  */

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-xl font-semibold">
        Warehouse Performance Matrix
      </h2>
      <div className="mt-4 flex flex-row justify-center">
        <Button
          onClick={() => handleSelect("Yesterday")}
          className={`mr-4 ${selectedOption === "Yesterday" ? "bg-blue-500 text-white" : ""}`}
        >
          Yesterday
        </Button>
        <Button
          onClick={() => handleSelect("Today")}
          className={`mr-4 ${selectedOption === "Today" ? "bg-blue-500 text-white" : ""}`}
        >
          Today
        </Button>
        <Button
          onClick={() => handleSelect("Current Week")}
          className={`mr-4 ${selectedOption === "Current Week" ? "bg-blue-500 text-white" : ""}`}
        >
          Current Week
        </Button>
        <Button
          onClick={() => handleSelect("Last Week")}
          className={`mr-4 ${selectedOption === "Last Week" ? "bg-blue-500 text-white" : ""}`}
        >
          Last Week
        </Button>
      </div>
      <div className="mt-8 flex w-3/4 flex-row justify-center">
        <div className="flex flex-col"></div>
        <div className="flex">{renderBars()}</div>
      </div>
    </div>
  )
}

export default BarGraph
