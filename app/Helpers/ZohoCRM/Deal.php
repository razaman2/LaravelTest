<?php

	namespace App\Helpers\ZohoCRM;

	class Deal extends AbstractZoho
	{
		use setFirstLastName;

		protected $moduleName = "Potentials";

		public function getDeal($dealId)
		{
			$this->module = $this->zohoApi->getRecordById($dealId)
				->withEmptyFields()
				->request()[1]->getData();

			$this->changeArrayKey(["POTENTIALID" => "Id"], $this->module);

			$this->module = $this->convertFromZohoString($this->module);

			$this->setFirstLastNameFromZoho($this->module);

			$this->module = $this->convertToCurrencyFromZoho($this->module);

			$this->module["Country"] = $this->convertCountryFromZoho($this->module["Country"]);

			$this->module = $this->countryIsCanadaFromZoho($this->module);

			return $this->module;
		}

		public function createDeal($data)
		{
			$data["Country"] = $this->convertCountryToZoho($data["Country"]);

			$this->module = $this->zohoApi->insertRecords()
				->setRecords([$this->convertToZohoString($data)])
				->triggerWorkflow()
				->onDuplicateError()
				->request();
			
			return $this->module;
		}

		public function getFields()
		{
			$this->module = $this->zohoApi
				->getFields()
				->request();

			return $this->convertToNoneFromZoho($this->module);
		}

		public function updateDeal($data)
		{
			if(isset($data["Country"]))
				$data["Country"] = $this->convertCountryToZoho($data["Country"]);

			$this->module = $this->zohoApi->updateRecords()
				->addRecord($this->convertToZohoString($data))
				->triggerWorkflow()
				->request();
			
			return $this->module;
		}

		public function uploadFileToDeal($data)
		{
			$this->module = $this->zohoApi->uploadFile()
				->id($data["Id"])
				->uploadFromPath($data["Path"])
				->request();
			
			return $this->module;
		}
	}