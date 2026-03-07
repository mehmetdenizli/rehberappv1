import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRouteDto, SearchRoutesDto } from './dto';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async search(query: SearchRoutesDto) {
    const where: any = { isPublished: true };

    if (query.region) where.region = query.region;
    if (query.category) where.category = query.category;
    if (query.maxPrice) where.price = { lte: parseFloat(query.maxPrice) };

    return this.prisma.route.findMany({
      where,
      include: {
        guide: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },
        _count: {
          select: {
            ratings: true,
            purchases: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateRouteDto, guideId: string) {
    return this.prisma.route.create({
      data: {
        ...dto,
        guideId,
      },
    });
  }
}
