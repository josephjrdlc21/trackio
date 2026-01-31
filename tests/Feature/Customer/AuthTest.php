<?php

use App\Models\User;

use Inertia\Testing\AssertableInertia as Assert;

test('login page', function () {

    $this->withMiddleware()
        ->get(route('customer.auth.login'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/auth/login');
        });
});

test('authenticate user credentials', function () {

    $user = User::factory()->auth()->create();

    $login_user = [
        'email' => 'johndoe@gmail.com',
        'password' => 'Aa@12345',
    ];

    $this->withMiddleware()
        ->post(route('customer.auth.authenticate'), $login_user)
        ->assertRedirect(route('customer.dashboard'));

    $this->assertAuthenticatedAs($user, 'web');
});

test('logout user', function () {
    
    $user = User::factory()->auth()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.auth.logout'))
        ->assertRedirect(route('customer.auth.login'));

    $this->assertGuest('web');
});