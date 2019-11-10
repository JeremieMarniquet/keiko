<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PokemonController
{
    private $normalizer;
    private $entityManager;

    public function __construct(NormalizerInterface $normalizer, EntityManagerInterface $entityManager)
    {
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/pokemon", methods={"GET"})
     */
    public function get()
    {
        $pokemon = new Pokemon();
        $pokemon->setName('Pikachu2');
        $pokemon->setHeight(10);
        $pokemon->setWeight(10);

        $content = $this->normalizer->normalize($pokemon, 'json');

        return new JsonResponse($content);
    }

    /**
     * @Route("api/pokemon", methods={"POST"})
     */
    public function create()
    {
        $pokemon = new Pokemon();
        $pokemon->setName('Pikachu');
        $pokemon->setHeight(10);
        $pokemon->setWeight(10);

        $this->entityManager->persist($pokemon);
        $this->entityManager->flush();

        // Return the created pokemon in the response
        return new JsonResponse($this->normalizer->normalize($pokemon, 'json'));
    }
}
