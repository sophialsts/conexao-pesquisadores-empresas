"use client"

import { UserCheck } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { RecommendationCriterion } from "@/types/researchers.types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
  { criterio: "Área de Estudo", valor: 3 },
  { criterio: "Flexibilidade", valor: 2 },
  { criterio: "Experiência Acadêmica", valor: 1 }
]

const chartConfig = {
  valor: {
    label: "Valor",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig



export function ChartPesquisador({ criteria }: { criteria: RecommendationCriterion[] }) {
  const criteriaLabels: { [key: string]: string } = {
    areaEstudo: 'Área de Estudo',
    flexibilidade: 'Flexibilidade',
    experienciaAcademica: 'Experiência Acadêmica',
  };
  
  const chartData = criteria.map(c => ({
    criterio: criteriaLabels[c.criterionName] || c.criterionName,
    valor: c.value,
  }));
  return (
    <Card className="shadow-none">
      <CardHeader className="items-center pb-4">
        <CardTitle>Critérios de Avaliação</CardTitle>
        <CardDescription>
          Aproximação dos critérios calculados a partir do currículo do pesquisador
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[280px]"

        >
          <RadarChart data={chartData} outerRadius={"90%"} innerRadius={"20%"}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="criterio" />
            <PolarGrid />
            <Radar
              dataKey="valor"
              fill="var(--color-eng-primary )"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Pesquisador recomendado <UserCheck className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Critérios aprovados para recomendação
        </div>
      </CardFooter>
    </Card>
  )
}
