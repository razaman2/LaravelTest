<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

	use Illuminate\Support\Facades\Route;

	Route::get('/', 'PagesController@index');
	Route::get('/about', 'PagesController@about');
	Route::get('/services', 'PagesController@services');
	Route::get('/zones', 'ZonesController@index');
	Route::post('/zones/create', 'ZonesController@create');
	Route::get('/zones/show/{zone_id}', 'ZonesController@show');
	Route::get('/sms/send{receipent}/{body}', 'SMSController@send');


