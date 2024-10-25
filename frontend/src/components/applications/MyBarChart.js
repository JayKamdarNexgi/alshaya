import React, { useEffect, useState } from "react";
import { BarChart } from '../Chart/index';

const MyBarChart = ({data}) => {
    const [barchrtData, setBarChartData] = useState(null);

    useEffect(() => {
        setBarChartData(data)
    }, [data])
    return <>
        {barchrtData && <BarChart data={barchrtData} />}
    </>
}

export default MyBarChart;