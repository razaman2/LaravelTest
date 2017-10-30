<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZonesTable extends Migration
{
    public function up()
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('tested');
            $table->boolean('existing');
            $table->string('company_id');
            $table->string('job_id');
            $table->string('zone_number');
            $table->string('zone_name');
            $table->string('event_type');
            $table->string('device_type');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('zones');
    }
}
