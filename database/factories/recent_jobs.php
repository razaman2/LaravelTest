<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\RecentJobs::class, function (Faker $faker) {
    return [
        'company_id' => str_random(19),
        'job_id' => str_random(19),
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
    ];
});
