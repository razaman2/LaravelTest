<?php

	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Route;

	/*
	|--------------------------------------------------------------------------
	| API Routes
	|--------------------------------------------------------------------------
	|
	| Here is where you can register API routes for your application. These
	| routes are loaded by the RouteServiceProvider within a group which
	| is assigned the "api" middleware group. Enjoy building your API!
	|
	*/

	Route::get('/user', function(Request $request){
		return $request->user();
	})->middleware('auth:api');

	Route::group(['middleware' => 'auth:api'], function () {
		Route::resource('/zones', 'ZonesController');
		Route::get('/sms/send/{recipient}/{body}', 'SMSController@send');
	});

	Route::post('/deal/get', 'DealController@get');
	Route::post('/deal/getfields', 'DealController@getFields');
	Route::post('/deal/create', 'DealController@create');
	Route::post('/deal/update', 'DealController@update');

	Route::post('/receiver/get', 'ReceiverController@get');

	Route::post('/recent/jobs/get', 'RecentJobsController@index');
	Route::post('/recent/jobs/update', 'RecentJobsController@store');
	Route::post('/recent/jobs/archive', 'RecentJobsController@archiveJob');
	Route::post('/recent/jobs/get/archived', 'RecentJobsController@getArchivedJobs');
	Route::post('/recent/jobs/restore/archived', 'RecentJobsController@restoreArchivedJob');
	Route::post('/recent/jobs/delete/archived', 'RecentJobsController@deleteArchivedJob');

