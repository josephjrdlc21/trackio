<?php

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\PDF;
use App\Exports\CustomerReportExport;

use Inertia\Testing\AssertableInertia as Assert;

test('report list page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.report.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/report/index');
        });
});

test('export report list excel', function () {

    Excel::fake();

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.report.export_excel'))
        ->assertOk();

    Excel::assertDownloaded(
        'Customer_Report_' . now()->format('Y-m-d') . '.xlsx',
        function ($export) {
            return $export instanceof CustomerReportExport;
        }
    );
});

test('export report list pdf', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.report.export_pdf'))
        ->assertOk()
        ->assertHeader('content-type', 'application/pdf');
});