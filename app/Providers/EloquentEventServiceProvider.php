<?php

namespace App\Providers;

use App\Models\EloquentTest;
use Illuminate\Support\ServiceProvider;

class EloquentEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
    	EloquentTest::observe(App\Observers\EloquentTestObserver::class);
    }

    public function register()
    {
        //
    }
}
