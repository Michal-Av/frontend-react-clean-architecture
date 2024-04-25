import React, { useEffect } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, LineSeries } from '@syncfusion/ej2-react-charts';

function ChartRain(props) {
    // Extract data from props.days
    const data = props.days.slice(0, 5).map(day => ({
        day: day.date,
        percent: day.day.daily_chance_of_rain
    }));

    // Chart configuration
    const primaryxAxis = { valueType: 'Category', title: '' };;
    const primaryyAxis = { minimum: 0, maximum: 100, interval: 20, labelFormat: "{value}%" };
    const marker = {
        visible: true, width: 10, height: 10, shape: 'Triangle', fill: '#ffc400',
        imageUrl: './images/droplet.png', dataLabel: { visible: true }
    };
    const textRender = (args) => {
        if (args.text === '0') {
            args.cancel = args.point.y === 0;
        }
    };


    return (
        <ChartComponent id='charts' primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} textRender={textRender}>
            <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={data} xName='day' yName='percent' width={2} name=' ' fill='#CD5B38' type='Line' marker={marker} />
            </SeriesCollectionDirective>
        </ChartComponent>
    );
}

export default ChartRain;
