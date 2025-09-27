"use client"

import { useState, useEffect } from "react"
import { categories, toolsData, getToolsByCategory } from "@/lib/tools-data"
import { CategoryCard } from "@/components/tools/category-card"
import { ToolCard } from "@/components/tools/tool-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Activity, Shield, Zap, Users } from "lucide-react"

interface DashboardProps {
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
}

export function Dashboard({ selectedCategory, onCategorySelect }: DashboardProps) {
  const [filteredTools, setFilteredTools] = useState(toolsData)
  const [sortBy, setSortBy] = useState<"name" | "rating" | "lastUsed">("rating")
  const [filterBy, setFilterBy] = useState<"all" | "installed" | "not-installed">("all")

  const installedTools = toolsData.filter((tool) => tool.installed).length
  const totalTools = toolsData.length
  const recentlyUsed = toolsData.filter((tool) => tool.lastUsed).length

  useEffect(() => {
    let tools = selectedCategory ? getToolsByCategory(selectedCategory) : toolsData

    // Apply filters
    if (filterBy === "installed") {
      tools = tools.filter((tool) => tool.installed)
    } else if (filterBy === "not-installed") {
      tools = tools.filter((tool) => !tool.installed)
    }

    // Apply sorting
    tools = [...tools].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "lastUsed":
          if (!a.lastUsed && !b.lastUsed) return 0
          if (!a.lastUsed) return 1
          if (!b.lastUsed) return -1
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
        default:
          return 0
      }
    })

    setFilteredTools(tools)
  }, [selectedCategory, sortBy, filterBy])

  if (selectedCategory) {
    const categoryInfo = categories.find((cat) => cat.id === selectedCategory)

    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => onCategorySelect(null)}
            className="text-primary hover:text-primary/80 mb-4 flex items-center space-x-2 transition-colors"
          >
            <span>← Back to Dashboard</span>
          </button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{categoryInfo?.name}</h1>
              <p className="text-muted-foreground">{categoryInfo?.description}</p>
            </div>

            {/* Category Filters and Sorting */}
            <div className="flex items-center space-x-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as "all" | "installed" | "not-installed")}
                className="bg-background border border-border rounded px-3 py-2 text-sm"
              >
                <option value="all">All Tools</option>
                <option value="installed">Installed Only</option>
                <option value="not-installed">Not Installed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "rating" | "lastUsed")}
                className="bg-background border border-border rounded px-3 py-2 text-sm"
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
                <option value="lastUsed">Sort by Last Used</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to CyberCity
        </h1>
        <p className="text-xl text-muted-foreground">Your comprehensive cybersecurity tools platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tools"
          value={totalTools.toString()}
          description="Available security tools"
          icon={Shield}
          trend="+12 this month"
        />
        <StatsCard
          title="Installed"
          value={installedTools.toString()}
          description="Ready to use"
          icon={Zap}
          trend={`${Math.round((installedTools / totalTools) * 100)}% coverage`}
        />
        <StatsCard
          title="Recently Used"
          value={recentlyUsed.toString()}
          description="Active tools"
          icon={Activity}
          trend="Last 30 days"
        />
        <StatsCard
          title="Categories"
          value={categories.length.toString()}
          description="Tool categories"
          icon={Users}
          trend="Fully organized"
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Tool Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              toolCount={getToolsByCategory(category.id).length}
              onClick={() => onCategorySelect(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Recently Used Tools */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recently Used Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsData
            .filter((tool) => tool.lastUsed)
            .sort((a, b) => new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime())
            .slice(0, 8)
            .map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>
      </div>

      {/* Popular Tools */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsData
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8)
            .map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>
      </div>
    </div>
  )
}
