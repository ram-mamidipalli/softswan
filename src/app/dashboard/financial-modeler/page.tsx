
'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  AreaChart,
  BarChart,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Landmark,
  FileText,
  Download,
  PieChart as PieChartIcon,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toPng } from 'html-to-image';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const currencies = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    INR: { symbol: '₹', name: 'Indian Rupee' },
    JPY: { symbol: '¥', name: 'Japanese Yen' },
};

type CurrencyCode = keyof typeof currencies;

const FinancialModelerPage = () => {
  const [revenue, setRevenue] = React.useState({
    sales: 0,
    recurring: 0,
    oneTime: 0,
    other: 0,
  });
  const [cogs, setCogs] = React.useState({
    rawMaterials: 0,
    manufacturing: 0,
    shipping: 0,
  });
  const [opEx, setOpEx] = React.useState({
    rent: 0,
    salaries: 0,
    marketing: 0,
    software: 0,
    insurance: 0,
    travel: 0,
    supplies: 0,
  });
  const [adminEx, setAdminEx] = React.useState({
    legal: 0,
    bank: 0,
  });
   const [funding, setFunding] = React.useState({
    investorCapital: 0,
    loans: 0,
  });
  const [currency, setCurrency] = React.useState<CurrencyCode>('USD');
  const modelerRef = React.useRef<HTMLDivElement>(null);

  const totalRevenue = Object.values(revenue).reduce((a, b) => a + b, 0);
  const totalCogs = Object.values(cogs).reduce((a, b) => a + b, 0);
  const totalOpEx = Object.values(opEx).reduce((a, b) => a + b, 0);
  const totalAdminEx = Object.values(adminEx).reduce((a, b) => a + b, 0);
  const totalExpenses = totalCogs + totalOpEx + totalAdminEx;

  const grossProfit = totalRevenue - totalCogs;
  const netProfit = grossProfit - totalOpEx - totalAdminEx;
  const grossProfitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  const netProfitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  
  const burnRate = Math.max(0, totalExpenses - totalRevenue);
  const runway = burnRate > 0 && funding.investorCapital > 0 ? funding.investorCapital / burnRate : Infinity;
  
  const currencySymbol = currencies[currency].symbol;

  const inputSections = [
    {
      title: 'Revenue Tracking',
      icon: AreaChart,
      description: 'Track all monthly income sources.',
      fields: [
        { name: 'Sales Revenue', key: 'sales', state: revenue, setter: setRevenue },
        { name: 'Recurring Revenue', key: 'recurring', state: revenue, setter: setRevenue },
        { name: 'One-Time Payments', key: 'oneTime', state: revenue, setter: setRevenue },
        { name: 'Other Income', key: 'other', state: revenue, setter: setRevenue },
      ],
    },
    {
      title: 'Cost of Goods Sold (COGS)',
      icon: LineChart,
      description: 'Direct costs of producing goods.',
      fields: [
        { name: 'Raw Materials', key: 'rawMaterials', state: cogs, setter: setCogs },
        { name: 'Manufacturing Costs', key: 'manufacturing', state: cogs, setter: setCogs },
        { name: 'Packaging & Shipping', key: 'shipping', state: cogs, setter: setCogs },
      ],
    },
    {
      title: 'Operating Expenses',
      icon: BarChart,
      description: 'Day-to-day business expenses.',
      fields: [
        { name: 'Rent & Utilities', key: 'rent', state: opEx, setter: setOpEx },
        { name: 'Salaries & Wages', key: 'salaries', state: opEx, setter: setOpEx },
        { name: 'Marketing & Ads', key: 'marketing', state: opEx, setter: setOpEx },
        { name: 'Software Subscriptions', key: 'software', state: opEx, setter: setOpEx },
        { name: 'Insurance', key: 'insurance', state: opEx, setter: setOpEx },
        { name: 'Travel & Meals', key: 'travel', state: opEx, setter: setOpEx },
        { name: 'Office Supplies', key: 'supplies', state: opEx, setter: setOpEx },
      ],
    },
     {
      title: 'Administrative Expenses',
      icon: FileText,
      description: 'General corporate expenses.',
      fields: [
        { name: 'Legal & Accounting Fees', key: 'legal', state: adminEx, setter: setAdminEx },
        { name: 'Bank Charges & Licenses', key: 'bank', state: adminEx, setter: setAdminEx },
      ],
    },
     {
      title: 'Funding',
      icon: Landmark,
      description: 'Capital available to the business.',
      fields: [
        { name: 'Investor Capital (Total)', key: 'investorCapital', state: funding, setter: setFunding },
        { name: 'Loans', key: 'loans', state: funding, setter: setFunding },
      ],
    },
  ];
  
  const expenseData = [
    { name: 'COGS', value: totalCogs },
    { name: 'Operating Expenses', value: totalOpEx },
    { name: 'Admin Expenses', value: totalAdminEx },
  ].filter(d => d.value > 0);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const handleInputChange = (setter: Function, state: any, key: string, value: string) => {
    setter({ ...state, [key]: Number(value) });
  };

  const resetCalculator = () => {
    setRevenue({ sales: 0, recurring: 0, oneTime: 0, other: 0 });
    setCogs({ rawMaterials: 0, manufacturing: 0, shipping: 0 });
    setOpEx({ rent: 0, salaries: 0, marketing: 0, software: 0, insurance: 0, travel: 0, supplies: 0 });
    setAdminEx({ legal: 0, bank: 0 });
    setFunding({ investorCapital: 0, loans: 0 });
  }

  const handleDownload = React.useCallback(() => {
    if (modelerRef.current === null) {
      return;
    }

    toPng(modelerRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'financial-model.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div ref={modelerRef} className="bg-background">
      <Card className="p-6 sm:p-8 shadow-none border-none">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Financial Modeler</h1>
              <p className="text-muted-foreground">
                  A simple calculator to understand your startup's key financial metrics.
              </p>
          </div>
          <div className="flex gap-2">
              <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(currencies).map(([code, { symbol, name }]) => (
                        <SelectItem key={code} value={code}>
                            {symbol} - {code}
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button onClick={resetCalculator} variant="outline">Reset</Button>
              <Button onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
              </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-1 space-y-6">
            <Accordion type="multiple" defaultValue={["item-0", "item-1"]} className="w-full">
              {inputSections.map((section, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <section.icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 bg-secondary/50 rounded-md">
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      {section.fields.map((field) => (
                          <div key={field.key} className="grid grid-cols-2 items-center gap-4">
                              <Label htmlFor={field.key} className="text-sm text-right">{field.name}</Label>
                              <Input
                                  id={field.key}
                                  type="number"
                                  placeholder="0"
                                  value={field.state[field.key] === 0 ? '' : field.state[field.key]}
                                  onChange={(e) => handleInputChange(field.setter, field.state, field.key, e.target.value)}
                                  className="h-9"
                              />
                          </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
                  <CardHeader>
                      <div className="flex items-center gap-3">
                        <CircleDollarSign className="h-6 w-6 text-primary" />
                          <div>
                              <CardTitle>Financial Summary</CardTitle>
                              <CardDescription>Your key monthly metrics.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Total Revenue</p>
                          <p className="font-bold text-green-600">{currencySymbol}{totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Total Expenses</p>
                          <p className="font-bold text-red-600">{currencySymbol}{totalExpenses.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Net Profit / Loss</p>
                          <p className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {currencySymbol}{netProfit.toLocaleString()}
                          </p>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-primary" />
                          <div>
                              <CardTitle>Performance Metrics</CardTitle>
                              <CardDescription>Analyze your business health.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Gross Profit Margin</p>
                          <p className="font-bold">{grossProfitMargin.toFixed(2)}%</p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Net Profit Margin</p>
                          <p className="font-bold">{netProfitMargin.toFixed(2)}%</p>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <div className="flex items-center gap-3">
                        <TrendingDown className="h-6 w-6 text-amber-500" />
                          <div>
                              <CardTitle>Burn & Runway</CardTitle>
                              <CardDescription>Cash flow sustainability.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Monthly Burn Rate</p>
                          <p className="font-bold text-red-600">{currencySymbol}{burnRate.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-md">
                          <p className="font-medium">Cash Runway</p>
                          <p className="font-bold">
                              {isFinite(runway) ? `${runway.toFixed(1)} months` : 'Positive Cashflow'}
                          </p>
                      </div>
                      {!isFinite(runway) && burnRate === 0 && funding.investorCapital > 0 && (
                          <Alert variant="default" className="bg-green-50 border-green-200">
                            <AlertTitle className="text-green-800 font-semibold">Positive Cash Flow!</AlertTitle>
                            <AlertDescription className="text-green-700">
                                  Your revenue currently covers or exceeds your expenses. Keep up the great work!
                            </AlertDescription>
                          </Alert>
                      )}
                      {isFinite(runway) && runway < 6 && (
                          <Alert variant="destructive">
                            <AlertTitle>Warning: Short Runway</AlertTitle>
                            <AlertDescription>
                                  Your estimated runway is less than 6 months. It's time to focus on increasing revenue or reducing costs.
                            </AlertDescription>
                          </Alert>
                      )}
                  </CardContent>
              </Card>

              {expenseData.length > 0 && (
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <PieChartIcon className="h-6 w-6 text-primary" />
                            <div>
                                <CardTitle>Expense Breakdown</CardTitle>
                                <CardDescription>A visual look at your spending.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {expenseData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${currencySymbol}${value.toLocaleString()}`, 'Value']}/>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                 </Card>
              )}

          </div>
        </div>
      </Card>
    </div>
  );
};

export default FinancialModelerPage;


    