import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetKpisQuery } from "../../state/api";
import { DashboardBox } from "../../components/DashboardBox";
import { FlexBetween } from "../../components/FlexBetween";
import { Line, LineChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import regression, { DataPoint } from "regression";

type Props = {};

const Predicition = (props: Props) => {
    const { palette } = useTheme();
    const [isPrediction, setIsPrediction] = useState(false);
    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpiData) return [];
        const monthData = kpiData[0].monthlyData;
        const formatted: Array<DataPoint> = monthData?.map(({ revenue }, i: number) => {
            return [i, revenue];
        });
        const regressionLine = regression.linear(formatted);
        return monthData.map(({ month, revenue }, i: number) => {
            const dataPoint = {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
            };
            if (isPrediction) {
                dataPoint["Predicted Revenue"] = regressionLine.predict(i + 12)[1];
            }
            return dataPoint;
        });
    }, [kpiData, isPrediction]);

    return (
        <DashboardBox width="100%" height="100%" padding="1rem" overflow="hidden">
            <FlexBetween m="1rem 2.5rem" gap="0.3rem">
                <Box>
                    <Typography variant="h3">Revenue and Prediction</Typography>
                    <Typography variant="h6">
                        Charted Revenue and Projected Revenue based on a Simple Linear Regression Model
                    </Typography>
                </Box>
                <Button
                    onClick={() => setIsPrediction(!isPrediction)}
                    sx={{
                        color: palette.grey[900],
                        bgcolor: palette.grey[700],
                        boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
                    }}
                >
                    Show Predicted Revenue for Next Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 75,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                    >
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }}
                        tickFormatter={(v) => `$${v}`}
                    >
                        <Label value="Revenue in USD" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        stroke={palette.primary.main}
                        strokeWidth={2}
                        dot={{ strokeWidth: 5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Regression Line"
                        stroke="#8884d8"
                        dot={false}
                    />
                    {isPrediction && (
                        <Line
                            type="monotone"
                            dataKey="Predicted Revenue"
                            strokeDasharray="5 5"
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    );
};

export default Predicition;
