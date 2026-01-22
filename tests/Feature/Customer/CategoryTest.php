<?php

use App\Models\User;

use Inertia\Testing\AssertableInertia as Assert;

test('get category page', function () {

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
        ->get(route('customer.category.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/index');
        });
});