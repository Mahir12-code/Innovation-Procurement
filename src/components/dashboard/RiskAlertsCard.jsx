import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { RISK_ALERTS } from '../../data/kpis';
import { AlertTriangle, Info, Bell, ArrowRight } from 'lucide-react';

export function RiskAlertsCard() {
  return (
    <Card className="border-amber-200/80 bg-amber-50/30 shadow-sm">
      <CardHeader className="pb-3 flex-row items-center justify-between border-amber-100">
        <div>
          <CardTitle className="text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Operational & Compliance Risk Alerts
          </CardTitle>
          <CardDescription className="text-amber-700/80">
            Active testbed anomalies & regulatory clearances needing attention
          </CardDescription>
        </div>
        <Badge variant="warning" size="sm">
          {RISK_ALERTS.length} Alerts Active
        </Badge>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {RISK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 rounded-xl border border-amber-200 bg-white shadow-xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-md bg-amber-100 text-amber-800 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{alert.title}</h5>
                  <p className="text-xs text-slate-600 mt-0.5">{alert.description}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">{alert.timestamp}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800">
                Action: {alert.actionRequired}
              </span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-gov-800 hover:text-gov-900">
                Resolve
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
