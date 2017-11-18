<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('enhanced');
            $table->boolean('has_key');
            $table->boolean('signer');
            $table->string('company_id');
            $table->string('job_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('passcode');
            $table->string('call_order');
            $table->string('relationship');
            $table->string('phone_type');
            $table->string('contact_type');
            $table->string('authority_level');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
