<?php

	namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use Twilio\Rest\Client;

	class SMSController extends Controller
	{
		protected $client;
		protected $sender = '14843098255';

		public function __construct()
		{
			$sid = 'ACff24327334002c1834503c951b66b2cd';
			$token = 'fac9160d9987da09c7b145ca6508e926';
			$this->client = new Client($sid, $token);
		}

		public function send(Request $request)
		{
			$status = $this->client->messages->create(
				$request->recipient,
				[
					'from' => $this->sender,
					'body' => $request->body,
				]
			);

			return response()->json($status->toArray());
		}

		public function receive(Request $request)
		{
			/**
			 * @todo, remove debug log.
			 */
			\Illuminate\Support\Facades\Log::info($request->all());
		}
	}
