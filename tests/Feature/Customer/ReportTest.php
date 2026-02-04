<?php

use App\Models\User;
use Carbon\Carbon;

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

