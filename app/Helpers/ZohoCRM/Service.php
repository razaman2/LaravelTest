<?php

	namespace App\Helpers\ZohoCRM;

	class Service extends AbstractZoho
	{
		protected $moduleName = "CustomModule9";

		public function getService($serviceId)
		{
			$this->module = $this->zohoApi->getRecordById($serviceId)
				->withEmptyFields()
				->request()[1]->getData();

			$this->changeArrayKey(["SERVICEID" => "Id"], $this->module);

			$this->module = $this->convertFromString($this->module);

			return $this->module;
		}

		public function updateService($data)
		{
			$this->module = $this->zohoApi->updateRecords()
				->addRecord($this->convertToString($data))
				->triggerWorkflow()
				->request();

			return $this->module;
		}
	}