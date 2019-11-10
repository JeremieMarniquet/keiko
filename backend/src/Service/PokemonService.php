<?php

namespace App\Service;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PokemonService
{
    private $entityManager;
    private $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function create(Pokemon $pokemon)
    {
        // Make sure the provided pokemon is fine regarding the databse constraints
        $violations = $this->validator->validate($pokemon);
        if (0 !== count($violations)) {
            throw new BadRequestHttpException($violations);
        }

        $this->entityManager->persist($pokemon);
        $this->entityManager->flush();

        return $pokemon;
    }
}
