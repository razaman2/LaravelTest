<?php

namespace App\Http\Controllers;

use App\Helpers\ZohoCRM\Contact;
use App\Helpers\ZohoCRM\Deal;
use Illuminate\Http\Request;

class DealController extends Controller
{
	public function create(Request $request)
	{
		return (new Deal($request->companyId))->createDeal($request->deal);
	}

	public function get(Request $request)
	{
		return (new Deal($request->companyId))->getDeal($request->Id);
	}

	public function update(Request $request)
	{
	    $deal = $request->deal;
	    $deal['Id'] = $request->Id;
		return (new Deal($request->companyId))->updateDeal($deal);
	}

	public function getFields(Request $request)
	{
		return (new Deal($request->companyId))->getFields();
	}

	public function getDealWithContact(Request $request)
	{
		$deal = (new Deal($request->companyId))->getDeal($request->Id);

		$contact = (new Contact($request->companyId))->getContact($deal["CONTACTID"]);

		return ["deal" => $deal, "contact" => $contact];
	}
}
