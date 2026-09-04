import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { URGENT_TASKS } from '../../data/mockData';
import { CheckCircle2, Clock, AlertTriangle, CheckSquare, ListTodo, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export function UrgentTasksWidget() {
  const [tasks, setTasks] = useState(URGENT_TASKS);

  const toggleTask = (taskId) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-card h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
                <ListTodo className="w-4 h-4" />
              </span>
              <CardTitle className="text-base text-zinc-950 dark:text-white">
                Action Required & Urgent Tasks
              </CardTitle>
            </div>
            <CardDescription className="mt-0.5">
              Decisions, jury scores, and field approvals needing officer sign-off.
            </CardDescription>
          </div>

          <span className="text-xs font-black px-2.5 py-1 bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 rounded-full shrink-0">
            {pendingCount} Pending
          </span>
        </CardHeader>

        <CardContent className="p-5 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={cn(
                'p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 select-none',
                task.completed
                  ? 'bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 opacity-60'
                  : 'bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-subtle'
              )}
            >
              <button
                type="button"
                className={cn(
                  'mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors',
                  task.completed
                    ? 'bg-zinc-950 dark:bg-orange-600 border-zinc-950 dark:border-orange-600 text-orange-400 dark:text-white'
                    : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-orange-500'
                )}
              >
                {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md border border-orange-200/60 dark:border-orange-800/60">
                    {task.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    {task.dueText}
                  </span>
                </div>

                <p
                  className={cn(
                    'text-xs font-bold leading-snug',
                    task.completed ? 'line-through text-zinc-500 dark:text-zinc-500' : 'text-zinc-950 dark:text-white'
                  )}
                >
                  {task.title}
                </p>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5 font-medium">
                  <span className="truncate">Challenge: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{task.challenge}</strong></span>
                  <span className="flex items-center gap-1 shrink-0 font-semibold">
                    <User className="w-3 h-3 text-zinc-400" />
                    {task.assignedTo.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      <CardFooter className="py-3 px-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <span>Click any task to toggle complete status.</span>
        <span className="font-black text-orange-600 dark:text-orange-400">{tasks.filter(t => t.completed).length} of {tasks.length} done</span>
      </CardFooter>
    </Card>
  );
}
