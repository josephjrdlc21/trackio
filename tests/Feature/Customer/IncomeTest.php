<?php

use App\Models\User;
use App\Models\Category;
use App\Models\Income;
use Carbon\Carbon;

use Inertia\Testing\AssertableInertia as Assert;

test('income list page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.income.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/income/index');
        });
});

test('create new income page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.income.create'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/income/create');
        });
});

test('store new income', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $new_income = [
        'user_id' => $user->id,
        'category' => $category->id,
        'amount' => 1500.00,
        'income_date' => Carbon::now(),
        'note' => 'This is a test',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.income.store'), $new_income)
        ->assertRedirect(route('customer.income.index'));

    $income = Income::where('category_id', $new_income['category'])->first();

    expect($income)->not()->toBeNull();
    expect($income)
        ->user_id->toBe($new_income['user_id'])
        ->category_id->toBe($new_income['category'])
        ->amount->toEqual($new_income['amount'])
        ->income_date->toEqual(Carbon::parse($new_income['income_date'])->format('Y-m-d'))
        ->note->toBe($new_income['note']);
});

test('edit income page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $income = Income::factory()->income()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.income.edit', $income->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/income/edit');
        });

    expect(Income::find($income->id))->not()->toBeNull();
});

test('update income details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $income = Income::factory()->income()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $update_income = [
        'category' => $category->id,
        'amount' => 1700.00,
        'income_date' => Carbon::now(),
        'note' => 'This is update test',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.income.update', $income->id), $update_income)
        ->assertRedirect(route('customer.income.index'));

    $income->refresh();

    expect($income)
        ->category_id->toBe($update_income['category'])
        ->amount->toEqual($update_income['amount'])
        ->income_date->toEqual(Carbon::parse($update_income['income_date'])->format('Y-m-d'))
        ->note->toBe($update_income['note']);
});

test('delete income', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $income = Income::factory()->income()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.income.delete', $income->id))
        ->assertRedirect(route('customer.income.index'));

    expect(Income::find($income->id))->toBeNull();
});