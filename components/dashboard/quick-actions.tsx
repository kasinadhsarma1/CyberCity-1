import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Settings, BookOpen, Terminal, Scan } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Update All Tools",
      description: "Check for updates and install latest versions",
      icon: RefreshCw,
      action: "update",
      color: "text-blue-400",
    },
    {
      title: "Install Essentials",
      description: "Install the most commonly used security tools",
      icon: Download,
      action: "install-essentials",
      color: "text-green-400",
    },
    {
      title: "Quick Scan",
      description: "Run a quick network scan with Nmap",
      icon: Scan,
      action: "quick-scan",
      color: "text-orange-400",
    },
    {
      title: "Open Terminal",
      description: "Launch terminal with security tools in PATH",
      icon: Terminal,
      action: "terminal",
      color: "text-purple-400",
    },
    {
      title: "View Tutorials",
      description: "Access learning resources and guides",
      icon: BookOpen,
      action: "tutorials",
      color: "text-cyan-400",
    },
    {
      title: "System Settings",
      description: "Configure CyberCity preferences",
      icon: Settings,
      action: "settings",
      color: "text-gray-400",
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scan className="h-5 w-5 text-primary" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-accent/50 transition-colors bg-transparent"
            >
              <div className="flex items-center space-x-3 w-full">
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
