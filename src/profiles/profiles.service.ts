import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  async createProfile(createProfileDto: CreateProfileDto) {
    try {
      const result = await this.prisma.profile.create({
        data: createProfileDto,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const profiles = await this.prisma.profile.findMany({
        select: {
          fullname: true,
          locations: true,
          phone_number: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        data: profiles,
      };
    } catch (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { id },
        select: {
          fullname: true,
          locations: true,
          phone_number: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });

      if (!profile) return { message: 'Profile not found' };

      return {
        data: profile,
      };
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const profileId = Number(id);

      const profile = await this.prisma.profile.findUnique({
        where: { id: profileId },
      });

      if (!profile) {
        return { message: 'Profile not found' };
      }

      const updateProfile = await this.prisma.profile.update({
        where: { id: profileId },
        data: updateProfileDto,
      });

      return updateProfile;
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const profileId = Number(id);

      const profile = await this.prisma.profile.findUnique({
        where: { id: profileId },
      });

      if (!profile) {
        return { message: 'Profile not found' };
      }

      const deletedProfile = await this.prisma.profile.delete({
        where: { id: profileId },
      });

      return {
        data: deletedProfile,
        message: 'Successfully deleted profile',
      };
    } catch (error) {
      throw new Error(`Failed to delete profile: ${error.message}`);
    }
  }
}
