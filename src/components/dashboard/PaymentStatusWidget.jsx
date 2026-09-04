import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { PAYMENTS } from '../../data/payments';
import { formatCurrency } from '../../utils/formatters';
import { CreditCard, Landmark, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function PaymentStatusWidget() {
  return (
    <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">
              <CreditCard className="w-4 h-4 text-gov-700" />
              Escrow & PFMS Grant Disbursals
            </CardTitle>
            <CardDescription>
              Milestone-linked funds release status
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            PFMS Linked
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          {PAYMENTS.map((payment) => (
            <div
              key={payment.id}
              className="p-3 rounded-lg border border-slate-200/90 bg-white hover:border-slate-300 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                    {payment.id}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 mt-1">
                    {payment.startupName}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {payment.milestoneName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-slate-900 block">
                    {formatCurrency(payment.amount)}
                  </span>
                  <StatusBadge status={payment.status} className="mt-1" />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>Ref: {payment.pfmsRef}</span>
                <span>{payment.payoutDate}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      <CardFooter className="py-2.5 px-4 text-xs text-slate-500">
        <Link
          to="/government/payments"
          className="text-gov-700 font-semibold hover:underline flex items-center gap-1"
        >
          <span>View escrow account statements</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
