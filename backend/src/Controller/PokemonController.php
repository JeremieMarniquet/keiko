<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class PokemonController
{
    private $normalizer;
    private $entityManager;
    private $serializer;
    private $validator;

    public function __construct(
      NormalizerInterface $normalizer,
      EntityManagerInterface $entityManager,
      SerializerInterface $serializer,
      ValidatorInterface $validator
    ) {
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    /**
     * @Route("/api/pokemon", methods={"GET"})
     */
    public function list()
    {
        // Retrieve the pokemons
        $repository = $this->entityManager->getRepository(Pokemon::class);
        $pokemons = $repository->findAll();

        // Serialize
        $response = $this->normalizer->normalize($pokemons, 'json');

        return new JsonResponse($response);
    }

    /**
     * @Route("/api/pokemon/{id}", methods={"GET"})
     */
    public function get(string $id)
    {
        // Retrieve the pokemon based on id
        $repository = $this->entityManager->getRepository(Pokemon::class);
        $pokemon = $repository->findOneById($id);

        // Serialize
        $response = $this->normalizer->normalize($pokemon, 'json');

        return new JsonResponse($response);
    }

    /**
     * @Route("api/pokemon", methods={"POST"})
     */
    public function create(Request $request)
    {
        $pokemon = $this->serializer->deserialize($request->getContent(), Pokemon::class, 'json');

        // Make sure the provided pokemon is fine regarding the databse constraints
        $violations = $this->validator->validate($pokemon);
        if (0 !== count($violations)) {
            throw new BadRequestHttpException($violations);
        }

        $this->entityManager->persist($pokemon);
        $this->entityManager->flush();

        // Return the created pokemon in the response
        return new JsonResponse($this->normalizer->normalize($pokemon, 'json'));
    }
}
