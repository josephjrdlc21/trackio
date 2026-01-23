<?php

use Inertia\Testing\AssertableInertia as Assert;

use App\Models\User;

test('get dashboard page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.dashboard'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/dashboard');
        });
});