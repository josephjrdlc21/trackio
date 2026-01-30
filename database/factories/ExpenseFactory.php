<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }

    public function expense()
    {
        return $this->state(fn (array $attributes) => [
            'amount' => fake()->randomFloat(2, 10, 1000),
            'expense_date' => now(),
            'note' => fake()->sentence(),
        ]);
    }
}
