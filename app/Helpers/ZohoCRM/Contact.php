<?php

	namespace App\Helpers\ZohoCRM;

	use Exception;

	class Contact extends AbstractZoho
	{
		protected $moduleName = "Contacts";

		public function getContact($contactId)
		{
			$this->module = $this->zohoApi->getRecordById($contactId)
				->withEmptyFields()
				->request()[1]->getData();

			$this->changeArrayKey(["CONTACTID" => "Id"], $this->module);

			$this->module = $this->convertFromZohoString($this->module);

			$this->module["Mailing Country"] = $this->convertCountryFromZoho($this->module["Mailing Country"]);

			return $this->module;
		}

		public function createContact($data)
		{
			$data["Mailing Country"] = $this->convertCountryToZoho($data["Mailing Country"]);

			$this->module = $this->zohoApi->insertRecords()
				->setRecords([$this->convertToZohoString($data)])
				->triggerWorkflow()
				->onDuplicateError()
				->request();

			return $this->module;
		}

		public function updateContact($data)
		{
			if(isset($data["Mailing Country"]))
				$data["Mailing Country"] = $this->convertCountryToZoho($data["Mailing Country"]);

			$this->module = $this->zohoApi->updateRecords()
				->addRecord($this->convertToZohoString($data))
				->triggerWorkflow()
				->request();

			return $this->module;
		}

		public function searchContacts($email)
		{
			try
			{
				$this->module = $this->zohoApi->searchRecords()
					->withEmptyFields()
					->where("Email", $email)
					->request()[1]->getData();

				$this->changeArrayKey(["CONTACTID" => "Id"], $this->module);

				$this->module = $this->convertFromZohoString($this->module);

				$this->module["Mailing Country"] = $this->convertCountryFromZoho($this->module["Mailing Country"]);

				return $this->module;
			}
			catch(Exception $e)
			{
//				return $e->getMessage();
			}
		}

		public function getFields()
		{
			$this->module = $this->zohoApi
				->getFields()
				->request();

			return $this->convertToNoneFromZoho($this->module);
		}
	}