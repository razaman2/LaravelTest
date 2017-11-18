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
		Route::get('/sms/send/{recipient}/{body}', 'SMSController@send');
	});

	Route::post('/deal/get', 'DealController@get');
	Route::post('/deal/getfields', 'DealController@getFields');
	Route::post('/deal/create', 'DealController@create');
	Route::post('/deal/update', 'DealController@update');

	Route::post('/receiver/get', 'ReceiverController@get');

	Route::post('/recent/recentJobs/get', 'RecentJobsController@index');
	Route::post('/recent/recentJobs/update', 'RecentJobsController@store');
	Route::post('/recent/recentJobs/archive', 'RecentJobsController@archiveJob');
	Route::post('/recent/recentJobs/get/archived', 'RecentJobsController@getArchivedJobs');
	Route::post('/recent/recentJobs/restore/archived', 'RecentJobsController@restoreArchivedJob');
	Route::post('/recent/recentJobs/delete/archived', 'RecentJobsController@deleteArchivedJob');

	Route::post('/zone/create', 'ZonesController@save');
	Route::post('/zones/get/all', 'ZonesController@index');
	Route::post('/zone/get', 'ZonesController@show');
	Route::post('/zone/archive', 'ZonesController@archive');

	Route::post('/contact/create', 'ContactController@save');
	Route::post('/contacts/get/all', 'ContactController@index');
	Route::post('/contact/archive', 'ContactController@archive');
	Route::post('/contacts/get/selects', 'ContactController@contactSelects');

