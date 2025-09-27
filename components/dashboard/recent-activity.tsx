import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Download, Play, Settings } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "launch",
      tool: "Nmap",
      description: "Network scan completed",
      timestamp: "2 minutes ago",
      icon: Play,
      color: "text-green-400",
    },
    {
      id: 2,
      type: "install",
      tool: "Hashcat",
      description: "Tool updated to v6.2.6",
      timestamp: "15 minutes ago",
      icon: Download,
      color: "text-blue-400",
    },
    {
      id: 3,
      type: "launch",
      tool: "Metasploit",
      description: "Framework initialized",
      timestamp: "1 hour ago",
      icon: Play,
      color: "text-green-400",
    },
    {
      id: 4,
      type: "config",
      tool: "BloodHound",
      description: "Database configured",
      timestamp: "2 hours ago",
      icon: Settings,
      color: "text-orange-400",
    },
    {
      id: 5,
      type: "launch",
      tool: "Aircrack-ng",
      description: "WiFi analysis started",
      timestamp: "3 hours ago",
      icon: Play,
      color: "text-green-400",
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="p-1.5 rounded-full bg-background/50">
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{activity.tool}</span>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
