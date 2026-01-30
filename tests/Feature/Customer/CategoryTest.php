<?php

use App\Models\User;
use App\Models\Category;

use Inertia\Testing\AssertableInertia as Assert;

test('category list page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.category.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/index');
        });
});

test('create new category page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.category.create'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/create');
        });
});

test('store new category', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.category.store'), [
            'user_id' => $user->id,
            'name' => 'Food',
            'type' => 'expense',
            'status' => 'active',
        ])
        ->assertRedirect(route('customer.category.index'));
});

test('edit category page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.category.edit', $category->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/edit');
        });
});

test('update category details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.category.update', $category->id), [
            'name' => 'Groceries',
            'type' => 'expense',
            'status' => 'active',
        ])
        ->assertRedirect(route('customer.category.index'));
});

test('delete category', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.category.delete', $category->id))
        ->assertRedirect(route('customer.category.index'));
});