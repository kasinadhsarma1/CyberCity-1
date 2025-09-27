"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Dashboard } from "@/components/dashboard/dashboard"
import { ToolDetailPage } from "@/components/tools/tool-detail-page"

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onToolSelect={setSelectedTool}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto">
          {selectedTool ? (
            <ToolDetailPage toolId={selectedTool} onBack={() => setSelectedTool(null)} />
          ) : (
            <Dashboard selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
          )}
        </main>
      </div>
    </div>
  )
}