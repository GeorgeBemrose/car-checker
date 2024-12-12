'use client'

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MileageGraphProps {
  motTests: Array<{
    completedDate: string
    odometerValue: string
    testResult: string
  }>
}

export function MileageGraph({ motTests }: MileageGraphProps) {
  const data = motTests
    .filter(test => test.testResult === "PASSED") 
    .sort((a, b) => new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime())
    .map(test => ({
      date: new Date(test.completedDate).toLocaleDateString(),
      mileage: parseInt(test.odometerValue, 10)
    }))

  return (
    <ChartContainer
      config={{
        mileage: {
          label: "Mile",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="px-5"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{fontSize: 12}}
          >
            <Label value="Date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis tickFormatter={(value: number) => value.toLocaleString()}>
            <Label value="Miles" angle={-90} offset={-10} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value: any, name: any, props: any) => [
                  `${value.toLocaleString()}`, ` `,
                  'Miles'
                ]}
              />
            } 
          />
          <Legend verticalAlign="top" height={36}/>
          <Line 
            type="monotone" 
            dataKey="mileage" 
            stroke="var(--color-mileage)" 
            strokeWidth={2}
            name="Mileage" 
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

