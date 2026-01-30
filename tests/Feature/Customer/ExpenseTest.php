<?php

use App\Models\User;
use App\Models\Category;
use App\Models\Expense;

use Inertia\Testing\AssertableInertia as Assert;

test('expense list page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.expense.index'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/expense/index');
        });
});

test('create new expense page', function () {

    $user = User::factory()->customer()->create();

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.expense.create'))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/expense/create');
        });
});

test('store new expense', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.expense.store'), [
            'user_id' => $user->id,
            'category_id' => $category->id,
            'amount' => 1500.00,
            'expense_date' => now(),
            'note' => 'This is a test',
            'source' => 'Test source',
            'filename' => 'Test filename',
            'path' => 'Test path',
            'directory' => 'Test directory',
        ])
        ->assertRedirect(route('customer.expense.index'));
});

test('edit expense page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);
    $expense = Expense::factory()->expense()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.expense.edit', $expense->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/expense/edit');
        });
});

test('update expense details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);
    $expense = Expense::factory()->expense()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.expense.update', $expense->id), [
            'amount' => 1700.00,
            'expense_date' => now(),
            'note' => 'This is update test',
            'source' => 'Test update source',
            'filename' => 'Test update filename',
            'path' => 'Test update path',
            'directory' => 'Test update directory',
        ])
        ->assertRedirect(route('customer.expense.index'));
});

test('delete expense', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create([
        'user_id' => $user->id,
    ]);
    $expense = Expense::factory()->expense()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
    ]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.expense.delete', $expense->id))
        ->assertRedirect(route('customer.expense.index'));
});