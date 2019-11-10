<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class PokemonController
{
    private $normalizer;
    private $entityManager;

    public function __construct(
      NormalizerInterface $normalizer,
      EntityManagerInterface $entityManager,
      SerializerInterface $serializer
    ) {
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
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
    public function create(Request $request)
    {
        $pokemon = $this->serializer->deserialize($request->getContent(), Pokemon::class, 'json');

        $this->entityManager->persist($pokemon);
        $this->entityManager->flush();

        // Return the created pokemon in the response
        return new JsonResponse($this->normalizer->normalize($pokemon, 'json'));
    }
}
