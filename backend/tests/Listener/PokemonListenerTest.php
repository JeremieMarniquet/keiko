<?php

namespace App\Tests\Listener;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Doctrine\Common\Persistence\ObjectRepository;

use App\Entity\Pokemon;
use App\Entity\Ability;
use App\Listener\PokemonListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;

class PostControllerTest extends WebTestCase
{
    public function testPokemonListener()
    {
        $pokemonRepository = $this->createMock(ObjectRepository::class);
        $abilitiesRepository = $this->createMock(ObjectRepository::class);
        $entityManager = $this->createMock(EntityManagerInterface::class);

        $ability = new Ability();
        $ability->setName('test 1');

        $abilitiesRepository->expects($this->any())->method('findAll')->willReturn(array($ability));
        $entityManager->expects($this->any())->method('getRepository')->willReturn($abilitiesRepository);

        $listener = new PokemonListener($entityManager);

        $pokemon = new Pokemon();
        $pokemon->setName('carapuce');
        $pokemon->setHeight(30);
        $pokemon->setWeight(70);
        $pokemon->setAbilities(array());

        // Check if the method adds an ability to a Pokemon with no ability
        $listener->checkAbilities($pokemon);
        $this->assertEquals(1, count($pokemon->getAbilities()));

        // Check if the method adds no ability if the Pokemon already has one
        $listener->checkAbilities($pokemon);
        $this->assertEquals(1, count($pokemon->getAbilities()));
    }
}
