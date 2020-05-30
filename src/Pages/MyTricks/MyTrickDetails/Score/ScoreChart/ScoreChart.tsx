import React from "react";
import classes from "./ScoreChart.module.scss";
import { VictoryChart, VictoryBar, VictoryZoomContainer, VictoryLabel, VictoryAxis } from "victory";
import { nameof } from "../../../../../Utils/stringUtils";
import { formatDate, dateFormats } from "../../../../../Utils/dateUtils";

type ScoreChartProps = {
	scores: ChartData[];
};

type ChartData = {
	date: string;
	score: number;
};

const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
	const axisStyle = { axis: { stroke: "#072f71" }, tickLabels: { fill: "#072f71", fontSize: 9 } };

	return (
		<div className={classes.ScoreChart}>
			<VictoryChart
				scale={{ x: "time", y: "linear" }}
				padding={20}
				containerComponent={
					<VictoryZoomContainer
						zoomDimension="x"
						zoomDomain={{
							x: [0, scores.length > 10 ? 10 : scores.length + 1],
							y: [0, 10],
						}}
						minimumZoom={{ x: 5, y: 10 }}
					/>
				}
			>
				<VictoryBar
					style={{
						data: { fill: "#17ff74", strokeWidth: "1" },
						labels: { fill: "#17ff74", fontSize: 16 },
					}}
					labels={({ datum }) => {
						return datum.score === 0 ? datum.score : undefined;
					}}
					barWidth={20}
					data={scores}
					x={nameof<ChartData>("date")}
					y={nameof<ChartData>("score")}
					labelComponent={<VictoryLabel dy={-10} />}
				></VictoryBar>
				<VictoryAxis dependentAxis style={axisStyle} />
				<VictoryAxis
					crossAxis
					style={axisStyle}
					tickFormat={(date: string) => formatDate(new Date(date), dateFormats.monthAndDay)}
				/>
			</VictoryChart>
		</div>
	);
};

export default ScoreChart;
