"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Tool } from "@/lib/tools-data"
import {
  Star,
  Download,
  ExternalLink,
  Github,
  CheckCircle,
  Clock,
  Monitor,
  Tag,
  BookOpen,
  Play,
  Settings,
  Terminal,
  HardDrive,
  Package,
} from "lucide-react"

interface ToolDetailModalProps {
  tool: Tool | null
  isOpen: boolean
  onClose: () => void
}

export function ToolDetailModal({ tool, isOpen, onClose }: ToolDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!tool) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-400/50"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/50"
      case "Advanced":
        return "bg-orange-500/20 text-orange-400 border-orange-400/50"
      case "Expert":
        return "bg-red-500/20 text-red-400 border-red-400/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/50"
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "usage", label: "Usage", icon: Play },
    { id: "installation", label: "Installation", icon: Terminal },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">{tool.name}</DialogTitle>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={getDifficultyColor(tool.difficulty)}>{tool.difficulty}</Badge>
                {tool.installed && (
                  <Badge variant="outline" className="text-green-400 border-green-400/50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Installed
                  </Badge>
                )}
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{tool.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Platform Support
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.platform.map((platform) => (
                    <Badge key={platform} variant="secondary">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {tool.lastUsed && (
              <>
                <Separator />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Last used: {new Date(tool.lastUsed).toLocaleDateString()}
                </div>
              </>
            )}

            <Separator />

            <div className="flex space-x-3">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                {tool.installed ? "Launch Tool" : "Install Tool"}
              </Button>

              {tool.github && (
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              )}

              {tool.website && (
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </Button>
              )}
            </div>
          </div>
        )}

        {activeTab === "usage" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Basic {tool.name} usage examples</div>
                <div className="text-muted-foreground">
                  {tool.name === "Nmap" && (
                    <>
                      <div>nmap -sS target_ip # SYN scan</div>
                      <div>nmap -sV target_ip # Version detection</div>
                      <div>nmap -O target_ip # OS detection</div>
                    </>
                  )}
                  {tool.name === "Hashcat" && (
                    <>
                      <div>hashcat -m 0 hash.txt wordlist.txt # MD5 cracking</div>
                      <div>hashcat -m 1000 hash.txt wordlist.txt # NTLM cracking</div>
                      <div>hashcat -a 3 -m 0 hash.txt ?a?a?a?a # Brute force</div>
                    </>
                  )}
                  {tool.name === "Metasploit" && (
                    <>
                      <div>msfconsole # Start Metasploit</div>
                      <div>search exploit_name # Search for exploits</div>
                      <div>use exploit/path/to/exploit # Use exploit</div>
                    </>
                  )}
                  {!["Nmap", "Hashcat", "Metasploit"].includes(tool.name) && (
                    <>
                      <div>{tool.name.toLowerCase()} --help # Show help</div>
                      <div>{tool.name.toLowerCase()} -v # Verbose mode</div>
                      <div># Refer to documentation for specific usage</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Common Parameters</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                  <span className="font-mono text-sm">--help, -h</span>
                  <span className="text-sm text-muted-foreground">Display help information</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                  <span className="font-mono text-sm">--verbose, -v</span>
                  <span className="text-sm text-muted-foreground">Enable verbose output</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                  <span className="font-mono text-sm">--output, -o</span>
                  <span className="text-sm text-muted-foreground">Specify output file</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "installation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="font-medium">Size</span>
                </div>
                <span className="text-sm text-muted-foreground">{tool.size || "Unknown"}</span>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <span className="font-medium">Dependencies</span>
                </div>
                <span className="text-sm text-muted-foreground">{tool.dependencies?.length || 0} required</span>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="font-medium">Status</span>
                </div>
                <span className="text-sm text-muted-foreground">{tool.installed ? "Installed" : "Not Installed"}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Install</h3>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2"># Quick installation command</div>
                <div className="text-foreground bg-background/50 p-2 rounded">
                  {tool.installCommand || `# Installation command not available for ${tool.name}`}
                </div>
              </div>
            </div>

            {tool.installInstructions && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Step-by-Step Installation</h3>
                <div className="space-y-3">
                  {tool.installInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <code className="text-sm">{instruction}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tool.dependencies && tool.dependencies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dependencies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {tool.dependencies.map((dep) => (
                    <Badge key={dep} variant="outline" className="justify-center">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="flex space-x-3">
              <Button className="flex-1" disabled={tool.installed}>
                <Download className="h-4 w-4 mr-2" />
                {tool.installed ? "Already Installed" : "Install Now"}
              </Button>

              {!tool.installed && (
                <Button variant="outline">
                  <Terminal className="h-4 w-4 mr-2" />
                  Manual Install
                </Button>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tool Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Auto-update</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically update tool when new versions are available
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {tool.installed ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about tool updates and security advisories
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Integration</div>
                    <div className="text-sm text-muted-foreground">Connect with other security tools and workflows</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Advanced Options</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">Configuration file location:</p>
                <code className="text-xs bg-background p-2 rounded block">
                  ~/.config/cybercity/{tool.id}/config.yml
                </code>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
