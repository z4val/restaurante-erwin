<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('Administrador');

        $waiter = User::create([
            'name' => 'Waiter User',
            'email' => 'waiter@example.com',
            'password' => Hash::make('password'),
        ]);
        $waiter->assignRole('Mesero');

        $cook = User::create([
            'name' => 'Cook User',
            'email' => 'cook@example.com',
            'password' => Hash::make('password'),
        ]);
        $cook->assignRole('Cocinero');
    }
}
