<?php

namespace App\Http\Requests\Customer\Category;

use App\Http\Requests\RequestManager;

class StoreCategoryRequest extends RequestManager
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
            'name' => "required|string|max:255",
            'type' => "required|in:income,expense",
            'status' => "required|in:active,inactive",
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
