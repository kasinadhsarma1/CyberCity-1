"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Lock, Wifi, Bug, Terminal, Skull, FileSearch, Wrench, Home, BookOpen, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    id: "vulnerability-analysis",
    label: "Vulnerability Analysis",
    icon: Bug,
  },
  {
    id: "password-attacks",
    label: "Password Attacks",
    icon: Lock,
  },
  {
    id: "wireless-attacks",
    label: "Wireless Attacks",
    icon: Wifi,
  },
  {
    id: "exploitation-tools",
    label: "Exploitation Tools",
    icon: Terminal,
  },
  {
    id: "forensics",
    label: "Forensics",
    icon: FileSearch,
  },
  {
    id: "post-exploitation",
    label: "Post Exploitation",
    icon: Skull,
  },
  {
    id: "reverse-engineering",
    label: "Reverse Engineering",
    icon: Wrench,
  },
  {
    id: "tutorials",
    label: "Tutorials",
    icon: BookOpen,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
]

interface SidebarProps {
  collapsed: boolean
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
  onToolSelect: (toolId: string | null) => void
}

export function Sidebar({ collapsed, selectedCategory, onCategorySelect, onToolSelect }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard")
  const handleItemClick = (item: SidebarItem) => {
    if (item.id === "dashboard") {
      onCategorySelect(null)
      onToolSelect(null)
      setActiveItem(item.id)
    } else if (item.id === "tutorials" || item.id === "settings") {
      setActiveItem(item.id)
    } else {
      onCategorySelect(item.id)
      onToolSelect(null)
      setActiveItem(item.id)
    }
  }

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = activeItem === item.id || selectedCategory === item.id

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start text-left h-auto py-3 px-3 mb-1",
          isActive && "bg-primary/20 text-primary border-r-2 border-primary",
          !isActive && "hover:bg-accent/50",
          collapsed && "px-2 justify-center",
        )}
        onClick={() => handleItemClick(item)}
      >
        <div className={cn("flex items-center space-x-3", collapsed && "space-x-0 justify-center")}>
          <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
          {!collapsed && <span className="font-medium">{item.label}</span>}
        </div>
      </Button>
    )
  }

  return (
    <aside
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-80",
      )}
    >
      <div className={cn("p-6 border-b border-border", collapsed && "p-4")}>
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="p-2 bg-primary/20 rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">CyberCity</h2>
              <p className="text-sm text-muted-foreground">Security Tools Hub</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">{sidebarItems.map((item) => renderSidebarItem(item))}</div>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Status</span>
            </div>
            <p className="text-xs text-muted-foreground">All tools operational</p>
          </div>
        </div>
      )}
    </aside>
  )
}
