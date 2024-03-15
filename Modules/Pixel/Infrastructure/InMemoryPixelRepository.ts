import {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";
import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {IPixel} from "@modules/Pixel/Domain/IPixel";

/**
 * Represents the in-memory pixel repository.
 */
export class InMemoryPixelRepository extends InMemoryEntityRepository<IPixel> implements IPixelRepository {

}