import { CardData } from '@/types/customer/dashboard';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, Wallet, TrendingUp } from 'lucide-react';

export default function DashboardFinance() {

    const cardsData: CardData[] = [
        {
            label: 'Expenses',
            amount: 5658,
            previousAmount: 4563,
            icon: <TrendingDown className="w-4 h-4" />,
        },
        {
            label: 'Budget',
            amount: 89657,
            previousAmount: 76852,
            icon: <Wallet className="w-4 h-4" />,
        },
        {
            label: 'Income',
            amount: 2354,
            previousAmount: 1578,
            icon: <TrendingUp className="w-4 h-4" />,
        },
    ];

    const calculatePercentageChange = (current: number, previous: number): number => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };

    const formatCurrency = (amount: number): string => {
        return `₱${amount.toLocaleString('en-US')} PHP`;
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 py-4">
           {cardsData.map((card, index) => {
                const percentageChange = calculatePercentageChange(card.amount, card.previousAmount);
                const isPositive = percentageChange >= 0;

                return (
                    <Card key={index} className="flex-1 border border-gray-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-gray-500">
                                    {card.icon}
                                </div>
                                <span className="text-sm text-gray-500 font-medium">
                                    {card.label}
                                </span>
                            </div>

                            <div className="mb-2">
                                <h3 className="text-3xl font-semibold text-gray-900">
                                    {formatCurrency(card.amount)}
                                </h3>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">vs last month:</span>
                                <span className="text-gray-600 font-medium">
                                    {formatCurrency(card.previousAmount)}
                                </span>
                                <span
                                className={`ml-auto font-medium ${
                                    isPositive ? 'text-green-600' : 'text-red-600'
                                }`}
                                >
                                    {isPositive ? '+' : ''}
                                    {percentageChange.toFixed(2)}%
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}
