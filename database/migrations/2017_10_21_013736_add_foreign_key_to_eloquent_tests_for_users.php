<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeyToEloquentTestsForUsers extends Migration
{
    public function up()
    {
        Schema::table('eloquent_tests', function (Blueprint $table) {
            $table->integer('user_id');
        });
    }

    public function down()
    {
        Schema::table('eloquent_tests', function (Blueprint $table) {
            $table->dropColumn(['user_id']);
        });
    }
}
