<?php

namespace Tests\Feature;

use App\Models\EloquentTest;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class eloquent_tests extends TestCase
{
    use RefreshDatabase;

    public function testExample()
    {

        $eloquent_tests = EloquentTest::create([
            'first_name' => 'ainsley',
            'last_name' => 'clarke',
            'age' => 32,
            'height' => 5.10,
            'married' => 'yes',
            'address' => '602 east 24th street, paterson, nj, 07514',
            'sex' => 'male',
            ]
        );
//        $eloquent_tests = new EloquentTest([
//            'first_name' => 'ainsley',
//            'last_name' => 'clarke',
//            'age' => 32,
//            'height' => 5.10,
//            'married' => 'yes',
//            'address' => '602 east 24th street, paterson, nj, 07514',
//            'sex' => 'male',
//        ]);

//        $eloquent_tests->first_name = 'ainsley';
//        $eloquent_tests->last_name = 'clarke';
//        $eloquent_tests->age = 32;
//        $eloquent_tests->height = 5.10;
//        $eloquent_tests->married = 'yes';
//        $eloquent_tests->address = '602 east 24th street, paterson, nj, 07514';
//        $eloquent_tests->sex = 'male';

        $status = $eloquent_tests->save();

        $this->assertTrue($status);

        $this->assertDatabaseHas('eloquent_tests', [
            'first_name' => 'ainsley',
            'last_name' => 'clarke',
            'age' => 32,
            'height' => 5.10,
            'married' => 'yes',
            'address' => '602 east 24th street, paterson, nj, 07514',
            'sex' => 'male',
        ]);

        $eloquent_tests->delete();

        $this->assertSoftDeleted('eloquent_tests', $eloquent_tests->toArray());
    }
}
