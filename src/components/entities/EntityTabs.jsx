import { cn } from '../../lib/cn'

export function EntityTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-warmgrey/20">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={cn(
              'pb-3 text-sm font-medium transition-colors relative',
              activeTab === tab.key
                ? 'text-nearblack'
                : 'text-charcoal/50 hover:text-charcoal',
            )}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
