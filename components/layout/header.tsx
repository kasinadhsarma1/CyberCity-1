"use client"

import { useState } from "react"
import { Search, Bell, Settings, Shield, X, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchTools } from "@/lib/tools-data"
import { ToolCard } from "@/components/tools/tool-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// Use Tool type from tools-data for search results
import type { Tool } from "@/lib/tools-data"

interface HeaderProps {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export function Header({ sidebarCollapsed, onToggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchTools(query)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm relative z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className={cn(
                "h-10 w-10 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200",
                "hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20",
                "group relative overflow-hidden",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              ) : (
                <PanelLeftClose className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary cyber-glow-sm" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CyberCity
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tools, categories..."
                className="pl-10 pr-10 bg-background/50 border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Results Overlay */}
      {showResults && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={clearSearch}>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto p-6">
            <div className="bg-card border border-border rounded-lg shadow-2xl max-h-[70vh] overflow-y-auto">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Search Results for &quot;{searchQuery}&quot;</h3>
                <p className="text-sm text-muted-foreground">Found {searchResults.length} tools</p>
              </div>

              {searchResults.length > 0 ? (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No tools found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}