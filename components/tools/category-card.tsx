"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, Lock, Wifi, Terminal, FileSearch, Skull, Wrench } from "lucide-react"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    color: string
    icon: string
  }
  toolCount: number
  onClick: () => void
}

const iconMap = {
  Bug,
  Lock,
  Wifi,
  Terminal,
  FileSearch,
  Skull,
  Wrench,
}

export function CategoryCard({ category, toolCount, onClick }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Bug

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm cyber-glow-sm"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {toolCount} tools
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2 text-balance">{category.name}</h3>
        <p className="text-sm text-muted-foreground text-pretty">{category.description}</p>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Click to explore</span>
            <span>→</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
