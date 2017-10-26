<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecentJobsTable extends Migration
{
    public function up()
    {
        Schema::create('recent_jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('company_id');
            $table->string('job_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recent_jobs');
    }
}
