<?php

namespace App\Listener;

use App\Entity\Pokemon;
use App\Entity\Ability;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\EntityManagerInterface;

class PokemonListener
{
    protected $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function checkAbilities(Pokemon $pokemon)
    {
        // if the pokemon is registered with no abilities, add a random one
        if (empty($pokemon->getAbilities())) {

            $abilities = $this->manager->getRepository(Ability::class)->findAll();
            if (count($abilities) > 0) {
                $ability = $abilities[rand(0, count($abilities) - 1)];
                $pokemon->addAbility($ability);
            }

        }
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function prePersist(Pokemon $pokemon, LifecycleEventArgs $event)
    {
        $this->checkAbilities($pokemon);
    }
}
