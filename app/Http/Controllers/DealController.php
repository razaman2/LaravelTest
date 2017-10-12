<?php

namespace App\Http\Controllers;

use App\Helpers\ZohoCRM\Contact;
use App\Helpers\ZohoCRM\Deal;
use Illuminate\Http\Request;

class DealController extends Controller
{
	private $request;

	public function __construct(Request $request)
	{
		$this->request = $request;
	}

	public function create()
	{
		return (new Deal($this->request->companyId))->createDeal($this->request->deal);
	}

	public function get()
	{
		return (new Deal($this->request->companyId))->getDeal($this->request->id);
	}

	public function update()
	{
		return (new Deal($this->request->companyId))->updateDeal($this->request->deal);
	}

	public function getFields()
	{
		return (new Deal($this->request->companyId))->getFields();
	}

	public function getDealWithContact()
	{
		$deal = (new Deal($this->request->companyId))->getDeal($this->request->id);

		$contact = (new Contact($this->request->companyId))->getContact($deal["CONTACTID"]);

		return ["deal" => $deal, "contact" => $contact];
	}
}
