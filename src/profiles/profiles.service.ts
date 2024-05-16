import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) { }
  async createProfile(data: Prisma.ProfileCreateInput) {
    try {
      const result = await this.prisma.profile.create({ data });
      return result;
    } catch (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const profiles = await this.prisma.profile.findMany({
        select: {
          fullname: true,
          address: true,
          phone_number: true,
          user: {
            select: {
              username: true,
              email: true
            }
          }
        },
      });

      return {
        data: profiles
      }
    } catch (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const profileId = Number(id);
      const profile = await this.prisma.profile.update({
        where: { id: profileId },
        data: updateProfileDto,
      })

      return profile
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
