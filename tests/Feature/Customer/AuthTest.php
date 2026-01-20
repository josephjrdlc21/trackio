<?php

use Inertia\Testing\AssertableInertia as Assert;

test('get login page', function () {

    $this->get('/login')
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('auth/login');
        });
});