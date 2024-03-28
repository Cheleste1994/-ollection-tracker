import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemContainerInput, CreateItemInput } from './dto/create-item.input';
import { Item, ItemsContainer } from './entities/item.entity';
import { FileUpload } from 'graphql-upload';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { Status } from '@prisma/client';

@Injectable()
export class ItemService {
  CONTAINER_NAME = 'TEMPORARILY';

  constructor(
    private prisma: PrismaService,
    private dropboxService: DropboxService,
  ) {}

  async createCategory(name: string) {
    return this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  async checkCategory(name: string | undefined) {
    if (!name) return null;

    return this.prisma.category.findUnique({
      where: {
        name: name,
      },
    });
  }

  async userItems(userId: string): Promise<Item[]> {
    const result: Item[] = await this.prisma.item.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return result;
  }

  async createContainer(
    userId: string,
    dto: CreateItemContainerInput,
  ): Promise<ItemsContainer> {
    const data = await this.userItems(userId);
    const containers = data.filter(({ name }) => name === this.CONTAINER_NAME);

    if (containers.length > 0) {
      await this.deleteItem(containers.map(({ id }) => id));
    }

    const result = await this.prisma.item.create({
      data: {
        name: this.CONTAINER_NAME,
        status: Status[dto.status] || Status.PAUSED,
        userId,
        description: '',
        image: '',
      },
    });

    return { id: result.id, name: result.name, userId: result.userId };
  }

  async createItem(
    userId: string,
    { category, tags, ...dto }: CreateItemInput,
  ): Promise<Item> {
    const items = tags.map(tag => ({ name: tag }));

    const result = await this.prisma.item.create({
      data: {
        ...dto,
        status: Status[dto.status] || Status.PAUSED,
        user: {
          connect: {
            id: userId,
          },
        },
        tags: {
          createMany: {
            data: items,
          },
        },
        category: {
          connect: {
            name: category,
          },
        },
      },
      include: {
        tags: true,
        category: true,
      },
    });

    return result;
  }

  async uploadItem(itemId: string, file: FileUpload): Promise<Item> {
    try {
      const { id } = await this.dropboxService.uploadItem(itemId, file);

      if (id) {
        const result = await this.prisma.item.update({
          where: {
            id: itemId,
          },
          data: {
            image: id,
          },
          include: {
            category: true,
            tags: true,
          },
        });

        return result;
      }
      throw new BadRequestException();
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteItem(itemIds: string[]) {
    return this.prisma.item.deleteMany({
      where: {
        id: {
          in: itemIds,
        },
      },
    });
  }
}
