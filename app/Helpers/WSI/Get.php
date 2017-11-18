<?php

	namespace App\Helpers\WSI;

	class Get extends Base
	{
		public function getSiteTestSelects()
		{
			return [
				"testCats" => $this->get("testcats"),
			];
		}

		public function getContactSelects()
		{
			return [
				"relation" => $this->get("relations"),
				"auth" => $this->get("authorities"),
				"ctactype" => $this->get("contypes"),
				"phonetype" => $this->get("phonetypes"),
			];
		}

		public function getZoneSelects()
		{
			return [
				"events" => $this->get("events"),
				"equipTypes" => $this->get("equiptypes"),
			];
		}

//		public function getZonesFromMoni(Request $request)
//		{
//			$this->customerNumber = $request->csNumber;
//
//			return json_encode([
//				"zones" => $this->getData("Zones"),
//			]);
//		}

		public function geocode(Request $request)
		{
			$this->xmlData = '<?xml version="1.0"?><GetZipCodes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><GetZipCode state_id="'.$request->state.'" zip_code="'.$request->zip.'" /></GetZipCodes>';

			return $this->get('zips');
		}

		public function getAgencies(Request $request)
		{
			$this->xmlData = '<?xml version="1.0"?><GetAgencies xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><GetAgency zip_code="'.$request->zipcode.'" /></GetAgencies>';

			return $this->get('agencies');
		}

//		public function getAccountStatus(Request $request)
//		{
//			$this->customerNumber = $request->csNumber;
//
//			return json_encode([
//				"accountStatus" => $this->getData("Sitesystems"),
//			]);
//		}

//		public function getEventHistoryData(Request $request)
//		{
//			$this->customerNumber = $request->csNumber;
//
//			return json_encode([
//				"eventHistory" => $this->getData("Eventhistories"),
//			]);
//		}

//		public function getSiteContacts(Request $request)
//		{
//			$this->customerNumber = $request->csNumber;
//
//			return json_encode([
//				"siteContacts" => $this->getData("Contacts")
//			]);
//		}

//		public function getSiteAgencies(Request $request)
//		{
//			$this->customerNumber = $request->csNumber;
//
//			return json_encode([
//				"siteAgencies" => $this->getData("Siteagencypermits")
//			]);
//		}

		protected function get($entity)
		{
			$get = new \Wsdl\MoniWsi\ServiceType\Get($this->options);

			if ($get->GetData(new \Wsdl\MoniWsi\StructType\GetData($entity,$this->username,$this->password,$this->csNumber,$this->xmlData)) !== false)
			{
				return simplexml_load_string($get->getResult()->getGetDataResult()->getAny())->NewDataSet;
			}

			return $get->getLastError();
		}
	}