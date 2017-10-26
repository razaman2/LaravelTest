<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Model;

$factory->define(App\Models\EloquentTest::class, function (Faker $faker) {
    return [
        $usr = (new App\Models\User())::create([
            'name' => $faker->name,
            'email' => $faker->email,
            'password' => bcrypt($faker->password(6, 15))
        ]),
        (new App\Models\EloquentTest())->create([
            'first_name' => $faker->firstName('female'),
            'last_name' => $faker->lastName,
            'age' => random_int(15, 25),
            'height' => random_int(4, 5).".".random_int(0, 11),
            'married' => (random_int(0, 1) === 1) ? 'yes' : 'no',
            'address' => $faker->address,
            'sex' => (random_int(0, 1) === 1) ? 'male' : 'female',
            'user_id' => $usr->id
        ])
    ];
});
