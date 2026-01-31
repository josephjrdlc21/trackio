<?php

use App\Models\User;
use App\Models\Category;
use App\Models\Expense;
use Carbon\Carbon;

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
    $category = Category::factory()->category()->create(['user_id' => $user->id]);

    $new_expense = [
        'user_id' => $user->id,
        'category' => $category->id,
        'amount' => 1500.00,
        'expense_date' => Carbon::now(),
        'note' => 'This is a test',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.expense.store'), $new_expense)
        ->assertRedirect(route('customer.expense.index'));

    $expense = Expense::where('category_id', $new_expense['category'])->first();

    expect($expense)->not()->toBeNull();
    expect($expense)
        ->user_id->toBe($new_expense['user_id'])
        ->category_id->toBe($new_expense['category'])
        ->amount->toEqual($new_expense['amount'])
        ->expense_date->toEqual(Carbon::parse($new_expense['expense_date'])->format('Y-m-d'))
        ->note->toBe($new_expense['note']);
});

test('edit expense page', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $expense = Expense::factory()->expense()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->get(route('customer.expense.edit', $expense->id))
        ->assertOk()
        ->assertInertia(function (Assert $page) {
            $page->component('customer/expense/edit');
        });

    expect(Expense::find($expense->id))->not()->toBeNull();
});

test('update expense details', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $expense = Expense::factory()->expense()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $update_expense = [
        'category' => $category->id,
        'amount' => 1700.00,
        'expense_date' => Carbon::now(),
        'note' => 'This is update test',
    ];

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->post(route('customer.expense.update', $expense->id), $update_expense)
        ->assertRedirect(route('customer.expense.index'));

    $expense->refresh();

    expect($expense)
        ->category_id->toBe($update_expense['category'])
        ->amount->toEqual($update_expense['amount'])
        ->expense_date->toEqual(Carbon::parse($update_expense['expense_date'])->format('Y-m-d'))
        ->note->toBe($update_expense['note']);
});

test('delete expense', function () {

    $user = User::factory()->customer()->create();
    $category = Category::factory()->category()->create(['user_id' => $user->id]);
    $expense = Expense::factory()->expense()->create(['user_id' => $user->id, 'category_id' => $category->id]);

    $this->withMiddleware()
        ->actingAs($user, 'web')
        ->delete(route('customer.expense.delete', $expense->id))
        ->assertRedirect(route('customer.expense.index'));

    expect(Expense::find($expense->id))->toBeNull();
});