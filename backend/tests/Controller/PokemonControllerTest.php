<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Tests\FixtureAwareCaseTrait;
use App\Tests\AuthenticationTrait;

class PostControllerTest extends WebTestCase
{
    use FixtureAwareCaseTrait;
    use AuthenticationTrait;

    public function setUp()
    {
        $this->client = static::createClient();
        static::loadFixtures('jwt_authentication.yaml');
    }

    public function testGetPokemons()
    {
        $client = static::createClient();

        $client = $this->authenticateClient($this->client, 'jean_mousquetaire', 'lolilol');
        $client->request(
            'GET',
            '/users'
        );

        $client->request('GET', '/pokemon');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
