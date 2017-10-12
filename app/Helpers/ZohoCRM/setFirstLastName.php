<?php

	namespace App\Helpers\ZohoCRM;

	trait setFirstLastName
	{
		private function setFirstLastName(&$collection)
		{
			$contactName = $collection["Contact Name"];

			$contactName = explode(" ", $contactName);

			if(count($contactName) > 2)
			{
				$firstName = $contactName[1];
				$lastName  = $contactName[2];
			}
			else
			{
				$firstName = $contactName[0];
				$lastName  = $contactName[1];
			}

			$collection["First Name"] = $firstName;
			$collection["Last Name"] = $lastName;
		}
	}