<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class CustomerReportExport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize, WithStyles
{
    use Exportable;

    public $values;

    public function __construct(Collection $values)
    {
        $this->report = $values;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->report;
    }

    public function headings(): array
    {
        return [
            'Created',
            'Name',
            'Type',
            'Expenses Amount',
            'Expenses Date',
            'Income Amount',
            'Income Date',
        ];
    }

    public function map($value): array
    {
        return [
            $value->created_at ?? '',
            $value->name ?? '',
            $value->type ?? '',
            $value->expenses_sum_amount ?? 0.00,
            $value->expenses_max_expense_date ?? 'N/A',
            $value->incomes_sum_amount ?? 0.00,
            $value->created_at ?? 'N/A',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
