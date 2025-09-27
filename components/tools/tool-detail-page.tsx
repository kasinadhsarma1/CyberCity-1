"use client"

import { useState } from "react"
import { ArrowLeft, Download, Play, CheckCircle, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getToolById } from "@/lib/tools-data"

// Base tool type from your data
interface BaseTool {
  id: string
  name: string
  description: string
  category: string
  platform: string[] // Changed from string to string[]
  [key: string]: unknown // Allow additional properties
}

// Extended interface for tool examples
interface ToolExample {
  title: string
  command: string
  description: string
}

// Extended tool interface with all the properties we need
interface ExtendedTool {
  id: string
  name: string
  description: string
  category: string
  platform: string
  icon: React.ComponentType<{ className?: string }>
  longDescription: string
  features: string[]
  platforms: string[]
  size: string
  license: string
  installCommand: string
  basicUsage: string
  examples: ToolExample[]
}

interface ToolDetailPageProps {
  toolId: string
  onBack: () => void
}

export function ToolDetailPage({ toolId, onBack }: ToolDetailPageProps) {
  const [installProgress, setInstallProgress] = useState(0)
  const [isInstalling, setIsInstalling] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  const toolData = getToolById(toolId) as unknown as BaseTool | null

  if (!toolData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Tool not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  // Create extended tool with all required properties and fallbacks
  const tool: ExtendedTool = {
    id: toolData.id,
    name: toolData.name,
    description: toolData.description,
    category: toolData.category,
    platform: Array.isArray(toolData.platform) ? toolData.platform.join(", ") : toolData.platform,
    icon: (toolData.icon as React.ComponentType<{ className?: string }>) || Shield,
    longDescription: (toolData.longDescription as string) || toolData.description,
    features: (toolData.features as string[]) || [
      "Easy to use interface",
      "Cross-platform compatibility", 
      "Regular security updates",
      "Community support"
    ],
    platforms: (toolData.platforms as string[]) || (Array.isArray(toolData.platform) ? toolData.platform : [toolData.platform]),
    size: (toolData.size as string) || "~50MB",
    license: (toolData.license as string) || "Open Source",
    installCommand: (toolData.installCommand as string) || `sudo apt-get install ${toolData.id}`,
    basicUsage: (toolData.basicUsage as string) || `${toolData.id} [options] target`,
    examples: (toolData.examples as ToolExample[]) || []
  }

  const handleInstall = async () => {
    setIsInstalling(true)
    setInstallProgress(0)

    // Simulate installation progress
    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsInstalling(false)
          setIsInstalled(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  // Safe icon component rendering
  const IconComponent = tool.icon

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-lg">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isInstalled ? (
            <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30">
              <CheckCircle className="h-4 w-4 mr-1" />
              Installed
            </Badge>
          ) : (
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              Not Installed
            </Badge>
          )}

          <Button
            onClick={handleInstall}
            disabled={isInstalling || isInstalled}
            className="bg-primary hover:bg-primary/90"
          >
            {isInstalling ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-spin" />
                Installing...
              </>
            ) : isInstalled ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Launch
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Install
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Installation Progress */}
      {isInstalling && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Installing {tool.name}...</span>
                <span>{installProgress}%</span>
              </div>
              <Progress value={installProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tool.longDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tool Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="text-sm">{tool.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Platform</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tool.platforms.map((platform: string) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Size</label>
                    <p className="text-sm">{tool.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">License</label>
                    <p className="text-sm">{tool.license}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>RAM:</span>
                    <span>2GB minimum</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Storage:</span>
                    <span>100MB free space</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>OS:</span>
                    <span>Linux, macOS, Windows</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="installation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>Follow these steps to install {tool.name} on your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Quick Install</h4>
                <code className="text-sm bg-background px-2 py-1 rounded">
                  {tool.installCommand}
                </code>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Detailed Steps:</h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      1
                    </span>
                    <span>
                      Update your package manager: <code className="bg-muted px-1 rounded">sudo apt update</code>
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      2
                    </span>
                    <span>
                      Install dependencies:{" "}
                      <code className="bg-muted px-1 rounded">sudo apt install build-essential</code>
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      3
                    </span>
                    <span>
                      Install {tool.name}:{" "}
                      <code className="bg-muted px-1 rounded">
                        {tool.installCommand}
                      </code>
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      4
                    </span>
                    <span>
                      Verify installation: <code className="bg-muted px-1 rounded">{tool.id} --version</code>
                    </span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Common commands and usage patterns for {tool.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Basic Syntax</h4>
                <code className="text-sm">{tool.basicUsage}</code>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Common Options:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-3">
                    <code className="bg-muted px-2 py-1 rounded min-w-fit">-h, --help</code>
                    <span className="text-muted-foreground">Show help message</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <code className="bg-muted px-2 py-1 rounded min-w-fit">-v, --verbose</code>
                    <span className="text-muted-foreground">Enable verbose output</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <code className="bg-muted px-2 py-1 rounded min-w-fit">-o, --output</code>
                    <span className="text-muted-foreground">Specify output file</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>Practical examples of using {tool.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tool.examples.length > 0 ? (
                tool.examples.map((example: ToolExample, index: number) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{example.title}</h4>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <code className="text-sm">{example.command}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Basic Scan</h4>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <code className="text-sm">{tool.id} 192.168.1.1</code>
                    </div>
                    <p className="text-sm text-muted-foreground">Perform a basic scan on the target</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Advanced Scan</h4>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <code className="text-sm">{tool.id} -sS -O 192.168.1.0/24</code>
                    </div>
                    <p className="text-sm text-muted-foreground">Perform an advanced scan with OS detection</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}