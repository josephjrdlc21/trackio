<?php

namespace App\Http\Requests\Customer\Income;

use App\Http\Requests\RequestManager;

class UpdateIncomeRequest extends RequestManager
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
            'income_date' => "required",
            'note' => "required",
            'receipt' => "nullable|mimes:pdf|min:1|max:2048"
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => "Field is required.",
            'image.min' => "The file must be at least 1 KB.",
            'image.max' => "The file may not be greater than 2 MB.",
        ];
    }
}
