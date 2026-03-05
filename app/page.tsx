"use client";

import { useState, useMemo } from "react";

export default function SalaryCalculator() {
  const [mainSalary, setMainSalary] = useState<number | "">("");
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [totalWorkingDays, setTotalWorkingDays] = useState<number | "">("");
  const [officeDays, setOfficeDays] = useState<number | "">("");
  const [absentDays, setAbsentDays] = useState<number | "">("");

  // Calculate days in the selected month
  const daysInMonth = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [month, year]);

  // Salary Calculations
  const calculations = useMemo(() => {
    const salary = Number(mainSalary) || 0;
    const workingDays = Number(totalWorkingDays) || 0;
    const inOffice = Number(officeDays) || 0;
    const absent = Number(absentDays) || 0;

    const a = salary / 2;
    const b = a * 0.20;
    const c = b / daysInMonth;
    const d = workingDays * c;
    const e = inOffice * 100;
    const f = d + e + salary;

    const perDaySalary = salary / daysInMonth;
    const absentAdjustment = absent * perDaySalary;
    const payableSalary = f - absentAdjustment;

    return { d, e, f, perDaySalary, absentAdjustment, payableSalary };
  }, [mainSalary, totalWorkingDays, officeDays, absentDays, daysInMonth]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Input Section */}
        <div className="p-8 md:w-1/2 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Main Salary</label>
              <input type="number" value={mainSalary} onChange={(e) => setMainSalary(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="e.g. 50000" />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Month</label>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Total Working Days (inc. WFH)</label>
              <input type="number" value={totalWorkingDays} onChange={(e) => setTotalWorkingDays(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="e.g. 22" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Total Office Days</label>
              <input type="number" value={officeDays} onChange={(e) => setOfficeDays(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="e.g. 10" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Absent Days</label>
              <input type="number" value={absentDays} onChange={(e) => setAbsentDays(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="e.g. 2" />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-8 md:w-1/2 bg-blue-600 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-50">Calculation Summary</h2>
            <div className="space-y-3 text-blue-100 text-sm">
              <div className="flex justify-between border-b border-blue-500 pb-2">
                <span>Days in Month:</span>
                <span className="font-semibold">{daysInMonth} days</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 pb-2">
                <span>Working Day Allowance (d):</span>
                <span className="font-semibold">+{calculations.d.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 pb-2">
                <span>Office Day Bonus (e):</span>
                <span className="font-semibold">+{calculations.e.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 pb-2">
                <span>Subtotal (f):</span>
                <span className="font-semibold">{calculations.f.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 pb-2 text-red-200">
                <span>Absent Deduction:</span>
                <span className="font-semibold">-{calculations.absentAdjustment.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-400">
            <p className="text-blue-100 mb-1">Total Payable Salary</p>
            <p className="text-4xl font-bold text-white tracking-tight">
              {calculations.payableSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}