<?php

namespace App\Http\Requests\Customer\Expense;

use App\Http\Requests\RequestManager;

class UpdateExpenseRequest extends RequestManager
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->id ?? 0;

        $rules = [
            'category' => "required",
            'amount' => "required|numeric|min:0",
            'expense_date' => "required",
            'note' => "required",
            'receipt' => "nullable"
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => "Field is required.",
        ];
    }
}
