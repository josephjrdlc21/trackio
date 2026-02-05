<!DOCTYPE html>
<html>

    <head>
        <title>Borrower PDF</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
            .text-uppercase {
                text-transform: uppercase;
            }

            .text-center {
                text-align: center;
            }

            .lh1 {
                line-height: 2px;
            }

            .fs14 {
                font-size: 14px;
            }

            table,
            td,
            th {
                border: 1px solid;
            }

            table {
                page-break-inside: auto
            }

            tr {
                page-break-inside: avoid;
                page-break-after: auto
            }

            thead {
                display: table-header-group
            }

            tfoot {
                display: table-footer-group
            }

            @page {
                margin: 0cm 0cm;
            }

            /** Define now the real margins of every page in the PDF **/
            body {
                margin-top: 2.1cm;
                margin-left: 1cm;
                margin-right: 1cm;
                margin-bottom: 1cm;
                font-family: Arial, Helvetica, sans-serif;

            }

            /** Define the header rules **/
            table {
                font-size: 12px;
                width: 100%;
                border-collapse: collapse;
            }

            .border-none {
                border: none;
            }

            .border-white{
                border-color: white;
            }

            .text-end{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <table width="100%" cellpadding="0" cellspacing="0" class="border-white">
            <tr class="border-none">
                <td class = "text-center border-none">
                    <p class="lh1 fs14"><b class="text-uppercase">Reports Data</b></p>
                </td>
            </tr>
        </table>

        <table width="100%" cellpadding="1" cellspacing="0">
            <thead>
                <tr>
                    <th class="text-center text-uppercase">Created</th>
                    <th class="text-center text-uppercase">Name</th>
                    <th class="text-center text-uppercase">Type</th>
                    <th class="text-center text-uppercase">Expenses Amount</th>
                    <th class="text-center text-uppercase">Expenses Date</th>
                    <th class="text-center text-uppercase">Income Amount</th>
                    <th class="text-center text-uppercase">Income Date</th>
                </tr>
            </thead>
            <tbody>
                @forelse($records as $report)
                    <tr>
                        <td>{{ $report->created_at }}</td>
                        <td>{{ $report->name }}</td>
                        <td>{{ $report->type }}</td>
                        <td>{{ $report->expenses_sum_amount }}</td>
                        <td>{{ $report->expenses_max_expense_date }}</td>
                        <td>{{ $report->incomes_sum_amount }}</td>
                        <td>{{ $report->incomes_max_income_date }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">No records found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </body>
</html>