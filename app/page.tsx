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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 flex items-center justify-center font-sans transition-colors duration-200">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-transparent dark:border-gray-800">

        {/* Input Section */}
        <div className="p-6 sm:p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Salary Details</h2>

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Main Salary</label>
              <input type="number" value={mainSalary} onChange={(e) => setMainSalary(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors" placeholder="e.g. 50000" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Month</label>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className="dark:bg-gray-800 dark:text-gray-100">{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Total Working Days (inc. WFH)</label>
              <input type="number" value={totalWorkingDays} onChange={(e) => setTotalWorkingDays(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors" placeholder="e.g. 22" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Total Office Days</label>
              <input type="number" value={officeDays} onChange={(e) => setOfficeDays(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors" placeholder="e.g. 10" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">Absent Days</label>
              <input type="number" value={absentDays} onChange={(e) => setAbsentDays(Number(e.target.value))} className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 transition-colors" placeholder="e.g. 2" />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-6 sm:p-8 md:w-1/2 bg-blue-600 dark:bg-blue-700 text-white flex flex-col justify-between transition-colors">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-50">Calculation Summary</h2>
            <div className="space-y-3 text-blue-100 text-sm sm:text-base">
              <div className="flex justify-between border-b border-blue-500 dark:border-blue-600 pb-2">
                <span>Days in Month:</span>
                <span className="font-semibold text-white">{daysInMonth} days</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 dark:border-blue-600 pb-2">
                <span>Working Day Allowance (d):</span>
                <span className="font-semibold text-white">+{calculations.d.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 dark:border-blue-600 pb-2">
                <span>Office Day Bonus (e):</span>
                <span className="font-semibold text-white">+{calculations.e.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 dark:border-blue-600 pb-2">
                <span>Subtotal (f):</span>
                <span className="font-semibold text-white">{calculations.f.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 dark:border-blue-600 pb-2 text-red-200 dark:text-red-300">
                <span>Absent Deduction:</span>
                <span className="font-semibold">-{calculations.absentAdjustment.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-400 dark:border-blue-500">
            <p className="text-blue-100 mb-1 text-sm sm:text-base">Total Payable Salary</p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight break-all">
              {calculations.payableSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}