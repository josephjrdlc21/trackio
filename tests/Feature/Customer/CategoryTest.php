<?php

use App\Models\User;
use App\Models\Category;

use Inertia\Testing\AssertableInertia as Assert;

test('category list page', function () {

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

test('create new category page', function () {

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
        ->get(route('customer.category.create'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/create');
        });
});

test('store new category', function () {

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
        ->post(route('customer.category.store'), [
            'name' => 'Food',
            'type' => 'Expense',
            'status' => 'active',
        ])
        ->assertRedirect(route('customer.category.index'));
});

test('edit category page', function () {

    $user = new User;
    $user->name = 'John Doe';
    $user->email = 'johndoe@gmail.com';
    $user->password = bcrypt('Aa@12345');
    $user->email_verified_at = now();
    $user->status = 'active';
    $user->role = 'customer';
    $user->save();

    $category = new Category;
    $category->user_id = $user->id;
    $category->name = 'Food';
    $category->type = 'Expense';
    $category->status = 'active';
    $category->save();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.category.edit', $category->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/edit');
        });
});

test('update category details', function () {
    $user = new User;
    $user->name = 'John Doe';
    $user->email = 'johndoe@gmail.com';
    $user->password = bcrypt('Aa@12345');
    $user->email_verified_at = now();
    $user->status = 'active';
    $user->role = 'customer';
    $user->save();

    $category = new Category;
    $category->user_id = $user->id;
    $category->name = 'Food';
    $category->type = 'Expense';
    $category->status = 'active';
    $category->save();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.category.update', $category->id), [
            'name' => 'Groceries',
            'type' => 'Expense',
            'status' => 'active',
        ])
        ->assertRedirect(route('customer.category.index'));
});

test('delete category', function () {
    $user = new User;
    $user->name = 'John Doe';
    $user->email = 'johndoe@gmail.com';
    $user->password = bcrypt('Aa@12345');
    $user->email_verified_at = now();
    $user->status = 'active';
    $user->role = 'customer';
    $user->save();

    $category = new Category;
    $category->user_id = $user->id;
    $category->name = 'Food';
    $category->type = 'Expense';
    $category->status = 'active';
    $category->save();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.category.delete', $category->id))
        ->assertRedirect(route('customer.category.index'));
});