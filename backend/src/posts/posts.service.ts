import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getFeed(userId: string) {
    return this.prisma.post.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            role: true,
            isVerified: true,
          },
        },
        comments: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        ratings: {
          where: { userId },
          select: { id: true },
        },
        _count: {
          select: {
            comments: true,
            ratings: true,
          },
        },
      },
    });
  }

  async getById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            role: true,
            isVerified: true,
          },
        },
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
            ratings: true,
          },
        },
      },
    });
  }

  async create(dto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            role: true,
            isVerified: true,
          },
        },
      },
    });
  }

  async addComment(postId: string, userId: string, content: string) {
    return this.prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async toggleLike(postId: string, userId: string) {
    // Check if already liked
    const existing = await this.prisma.rating.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existing) {
      // Unlike
      await this.prisma.rating.delete({
        where: { id: existing.id },
      });
      return { liked: false };
    } else {
      // Like
      await this.prisma.rating.create({
        data: {
          postId,
          userId,
          value: 5, // Default rating value
        },
      });
      return { liked: true };
    }
  }
}
