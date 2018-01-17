<?php

namespace Tests\Unit;

use function collect;
use function dd;
use function dump;
use function print_r;
use function str_slug;
use function strtoupper;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function value;

class Collection extends TestCase
{
    public function testExample()
    {
    	dump(str_slug('baddas than dem'));
    	self::assertTrue(true);
    }
}
