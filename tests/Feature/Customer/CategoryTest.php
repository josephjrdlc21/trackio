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

    $new_category = [
        'user_id' => $user->id,
        'name' => 'Food',
        'type' => 'expense',
        'status' => 'active',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.category.store'), $new_category)
        ->assertRedirect(route('customer.category.index'));

    $category = Category::where('name', $new_category['name'])->first();

    expect($category)->not()->toBeNull();
    expect($category)
        ->user_id->toBe($new_category['user_id'])
        ->name->toBe($new_category['name'])
        ->type->toBe($new_category['type'])
        ->status->toBe($new_category['status']);

});

test('edit category page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.category.edit', $category->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/category/edit');
        });

    expect(Category::find($category->id))->not()->toBeNull();
});

test('update category details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $update_category = [
        'name' => 'Groceries',
        'type' => 'expense',
        'status' => 'active',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.category.update', $category->id), $update_category)
        ->assertRedirect(route('customer.category.index'));
    
    $category->refresh();

    expect($category)
        ->name->toBe($update_category['name'])
        ->type->toBe($update_category['type'])
        ->status->toBe($update_category['status']);
});

test('delete category', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.category.delete', $category->id))
        ->assertRedirect(route('customer.category.index'));

    expect(Category::find($category->id))->toBeNull();
});