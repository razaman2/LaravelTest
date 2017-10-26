<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSexColumnToEloquentTest extends Migration
{
    public function up()
    {
        Schema::table('eloquent_tests', function (Blueprint $table) {
            $table->enum('sex', ['unknown', 'male', 'female']);
        });
    }

    public function down()
    {
        Schema::table('eloquent_tests', function (Blueprint $table) {
            $table->dropColumn(['sex']);
        });
    }
}
