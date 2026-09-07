import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EVALUATIONS } from '../../data/evaluations';
import { formatDate } from '../../utils/formatters';
import { CheckSquare, User, Clock, ArrowUpRight } from 'lucide-react';

export function PendingEvaluationsCard() {
  const pendingItems = EVALUATIONS.filter((e) => e.status !== 'completed');

  return (
    <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">
              <CheckSquare className="w-4 h-4 text-gov-700" />
              Pending Technical Evaluations
            </CardTitle>
            <CardDescription>
              Jury scorecards awaiting committee submission
            </CardDescription>
          </div>
          <Badge variant="warning" size="sm">
            {pendingItems.length} Queue
          </Badge>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          {pendingItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                    {item.startupName}
                  </h5>
                  <p className="text-[11px] text-slate-500 truncate max-w-[220px]">
                    {item.challengeTitle}
                  </p>
                </div>
                <Badge variant={item.priority === 'high' ? 'danger' : 'warning'} size="sm">
                  {item.priority} priority
                </Badge>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[140px]">{item.assignedEvaluator}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Due {formatDate(item.dueDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      <CardFooter className="py-2.5 px-4 text-xs text-slate-500">
        <Link
          to="/government/evaluator"
          className="text-gov-700 font-semibold hover:underline flex items-center gap-1"
        >
          <span>Open evaluator committee view</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
