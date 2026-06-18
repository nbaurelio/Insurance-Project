'use client'

import chartConfig from '@/app/(dashboard)/(home)/(dashboard)/client-acquisition/chart-config'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { format, subYears } from 'date-fns'
import { createBrowserClient } from '@/utils/supabase-client'

const ClientAcquisitionChart = () => {
  const supabase = createBrowserClient()
  const startDate = useMemo(() => subYears(new Date(), 1).toISOString(), [])
  const endDate = useMemo(() => new Date().toISOString(), [])
  const { data, isLoading, error } = useQuery(
    supabase
      .from('accounts')
      .select('company_name, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate),
  )

  const formattedData = useMemo(() => {
    if (!data) return []

    const months = []
    const currentDate = new Date(startDate)

    while (currentDate <= new Date(endDate)) {
      months.push(format(new Date(currentDate), 'yyyy-MM'))
      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    const reducedData = data.reduce(
      (
        acc: { date: string; count: number }[],
        item: { created_at: string; company_name: string },
      ) => {
        const date = new Date(item.created_at)
        const monthYear = format(date, 'yyyy-MM')
        const existingEntry = acc.find((entry) => entry.date === monthYear)
        if (existingEntry) {
          existingEntry.count += 1
        } else {
          acc.push({ date: monthYear, count: 1 })
        }
        return acc
      },
      [],
    )
    const completeData = months.map((month) => {
      const entry = reducedData.find((data) => data.date === month)
      return entry ? entry : { date: month, count: 0 }
    })

    return completeData
  }, [data, startDate, endDate])

  if (isLoading) return <div className="mt-6 h-[300px] w-full flex items-center justify-center text-white">Loading...</div>
  if (error) return <div className="mt-6 h-[300px] w-full flex items-center justify-center text-red-400">Error: {String(error)}</div>

  return (
    <ChartContainer
      config={chartConfig}
      className="mt-6 h-[300px] w-full"
    >
      <LineChart accessibilityLayer data={formattedData} margin={{ top: 20 }}>
        <CartesianGrid vertical={true} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const [year, month] = value.split('-')
            const date = new Date(parseInt(year), parseInt(month) - 1, 1)
            return date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="count"
              labelFormatter={(value) => {
                const [year, month] = value.split('-')
                const date = new Date(parseInt(year), parseInt(month) - 1, 1)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              }}
            />
          }
        />
        <Line
          dataKey="count"
          type="monotone"
          stroke={`var(--color-count)`}
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default ClientAcquisitionChart
