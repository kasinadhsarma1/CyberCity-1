"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/tools-data"
import { Star, Download, ExternalLink, Github, CheckCircle, Clock, Info } from "lucide-react"
import { ToolDetailModal } from "@/components/tools/tool-detail-modal"

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400"
      case "Advanced":
        return "bg-orange-500/20 text-orange-400"
      case "Expert":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <>
      <Card className="transition-all duration-200 hover:scale-105 hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getDifficultyColor(tool.difficulty)}>{tool.difficulty}</Badge>
                {tool.installed && (
                  <Badge variant="outline" className="text-green-400 border-green-400/50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Installed
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{tool.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 text-pretty">{tool.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {tool.platform.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>

          {tool.lastUsed && (
            <div className="flex items-center text-xs text-muted-foreground mb-4">
              <Clock className="h-3 w-3 mr-1" />
              Last used: {new Date(tool.lastUsed).toLocaleDateString()}
            </div>
          )}

          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              {tool.installed ? "Launch" : "Install"}
            </Button>

            <Button size="sm" variant="outline" onClick={() => setShowDetailModal(true)}>
              <Info className="h-4 w-4" />
            </Button>

            <div className="flex space-x-1">
              {tool.github && (
                <Button size="sm" variant="outline">
                  <Github className="h-4 w-4" />
                </Button>
              )}
              {tool.website && (
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ToolDetailModal tool={tool} isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} />
    </>
  )
}
