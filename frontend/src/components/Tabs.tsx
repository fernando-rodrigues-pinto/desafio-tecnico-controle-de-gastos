export interface TabItem {
  key: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (key: string) => void
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-slate-200 dark:border-slate-700" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors duration-150 focus:outline-none ${
              isActive
                ? 'border-brand-light-cyan dark:border-brand-dark-cyan text-brand-light-cyan dark:text-brand-dark-cyan'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-brand-light-text dark:hover:text-brand-dark-text'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}