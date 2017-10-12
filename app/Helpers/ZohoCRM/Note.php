<?php

	namespace App\Helpers\ZohoCRM;

	class Note
	{
		protected $authToken;

		public function __construct($companyId)
		{
			$zohoUser = '5b69810dc50fa3a7d24aeafdd2b738a3';

			$this->authToken = $zohoUser;
		}

		protected function setUrl($id, $title, $content)
		{
			return 'https://crm.zoho.com/crm/private/xml/Notes/insertRecords?newFormat=1&authtoken='.$this->authToken.'&scope=crmapi&xmlData='.urlencode('<Notes><row no="1"><FL val="entityId">'.$id.'</FL><FL val="Note Title">'.$title.'</FL><FL val="Note Content">'.$content.'</FL></row></Notes>');
		}

		public function request($id, $title, $content)
		{
			$ch = curl_init($this->setUrl($id, $title, $content));

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

			return curl_exec($ch);
		}
	}