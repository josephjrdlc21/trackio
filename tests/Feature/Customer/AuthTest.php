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

    $user = new User;
    $user->name = 'John Doe';
    $user->email = 'johndoe@gmail.com';
    $user->password = bcrypt('Aa@12345');
    $user->email_verified_at = now();
    $user->status = 'active';
    $user->role = 'customer';
    $user->save();

    $this->withMiddleware()
        ->post(route('customer.auth.authenticate'), [
            'email' => 'johndoe@gmail.com',
            'password' => 'Aa@12345',
        ])
        ->assertRedirect(route('customer.dashboard'));

    $this->assertAuthenticatedAs($user, 'web');
});

test('logout user', function () {
    $user = new User;
    $user->name = 'John Doe';
    $user->email = 'johndoe@gmail.com';
    $user->password = bcrypt('Aa@12345');
    $user->email_verified_at = now();
    $user->status = 'active';
    $user->role = 'customer';
    $user->save();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.auth.logout'))
        ->assertRedirect(route('customer.auth.login'));

    $this->assertGuest('web');
});