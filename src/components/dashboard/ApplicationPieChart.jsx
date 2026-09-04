import React, { useState } from 'react';

const DEFAULT_APPLICATION_DATA = [
  { label: 'Eligible', value: 52, color: '#10b981', darkColor: '#34d399' },
  { label: 'Under Review', value: 38, color: '#f59e0b', darkColor: '#fbbf24' },
  { label: 'Pilot Ready', value: 25, color: '#ea580c', darkColor: '#f97316' },
  { label: 'Pending Documents', value: 15, color: '#64748b', darkColor: '#94a3b8' },
  { label: 'Rejected', value: 18, color: '#ef4444', darkColor: '#f87171' }
];

export function ApplicationPieChart({
  data = DEFAULT_APPLICATION_DATA,
  title = 'Startup Application Status'
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate SVG Donut Arcs
  const size = 220;
  const center = size / 2;
  const radius = 82;
  const innerRadius = 54;

  let cumulativeAngle = 0;

  const slices = data.map((item, index) => {
    const angle = total > 0 ? (item.value / total) * 360 : 0;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';

    return {
      ...item,
      pathData,
      percentage,
      isHovered: hoveredIndex === index
    };
  });

  const activeItem = hoveredIndex !== null ? slices[hoveredIndex] : null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/90 dark:border-zinc-800 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Live distribution of 148 submitted proposals
            </p>
          </div>
          <span className="text-xs font-black px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md border border-zinc-200 dark:border-zinc-700">
            Total: {total}
          </span>
        </div>

        {/* Donut Chart Visual */}
        <div className="relative flex items-center justify-center py-6">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            {slices.map((slice, i) => (
              <path
                key={slice.label}
                d={slice.pathData}
                fill={slice.color}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  transform: slice.isHovered ? 'scale(1.04)' : 'scale(1)',
                  filter: slice.isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' : 'none'
                }}
              />
            ))}
          </svg>

          {/* Central Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              {activeItem ? activeItem.value : total}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
              {activeItem ? activeItem.label : 'Applications'}
            </span>
            {activeItem && (
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
                {activeItem.percentage}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        {slices.map((item, idx) => (
          <div
            key={item.label}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
              hoveredIndex === idx
                ? 'bg-zinc-100 dark:bg-zinc-800'
                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                {item.value}
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
