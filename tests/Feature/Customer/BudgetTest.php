<?php

use App\Models\User;
use App\Models\Category;
use App\Models\Budget;
use Carbon\Carbon;

use Inertia\Testing\AssertableInertia as Assert;

test('budget list page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.budget.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/budget/index');
        });
});

test('create new budget page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.budget.create'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/budget/create');
        });
});

test('store new expense', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $new_budget = [
        'user_id' => $user->id,
        'category' => $category->id,
        'amount' => 1500.00,
        'budget_date' => Carbon::now(),
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.budget.store'), $new_budget)
        ->assertRedirect(route('customer.budget.index'));

    $budget = Budget::where('category_id', $new_budget['category'])->first();

    expect($budget)->not()->toBeNull();
    expect($budget)
        ->user_id->toBe($new_budget['user_id'])
        ->category_id->toBe($new_budget['category'])
        ->amount->toEqual($new_budget['amount'])
        ->budget_date->toEqual(Carbon::parse($new_budget['budget_date'])->format('Y-m-d'));
});

test('edit budget page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $budget = Budget::factory()->budget()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.budget.edit', $budget->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/budget/edit');
        });

    expect(Budget::find($budget->id))->not()->toBeNull();
});

test('update budget details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $budget = Budget::factory()->budget()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $update_budget = [
        'category' => $category->id,
        'amount' => 1500.00,
        'budget_date' => Carbon::now(),
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.budget.update', $budget->id), $update_budget)
        ->assertRedirect(route('customer.budget.index'));

    $budget->refresh();

    expect($budget)
        ->category_id->toBe($update_budget['category'])
        ->amount->toEqual($update_budget['amount'])
        ->budget_date->toEqual(Carbon::parse($update_budget['budget_date'])->format('Y-m-d'));
});

test('delete budget', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $budget = Budget::factory()->budget()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.budget.delete', $budget->id))
        ->assertRedirect(route('customer.budget.index'));

    expect(Budget::find($budget->id))->toBeNull();
});