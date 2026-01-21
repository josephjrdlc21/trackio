<?php

use Inertia\Testing\AssertableInertia as Assert;

test('get dashboard page', function () {

    $this->get(route('customer.dashboard'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/dashboard');
        });
});