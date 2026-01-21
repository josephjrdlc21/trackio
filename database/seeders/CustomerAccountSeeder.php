<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

class CustomerAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'johndoe@gmail.com')->first();

        if(!$user) {
            $account = new User;
            $account->name = "John Doe";
            $account->email = "johndoe@gmail.com";
            $account->email_verified_at = now();
            $account->role = "customer";
            $account->status = "active";
            $account->password = bcrypt("Aa@12345");
            $account->save();
        }
    }
}
