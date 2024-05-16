import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      const profileCreateInput: Prisma.ProfileCreateInput = {
        fullname: createProfileDto.fullname,
        address: createProfileDto.address,
        phone_number: createProfileDto.phone_number,
        user: { connect: { id: createProfileDto.userId } }
      };

      const result = await this.profilesService.createProfile(profileCreateInput);

      return {
        data: result,
        message: "profile create success"
      }
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.profilesService.findAll();
      return {
        data: result.data
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    try {
      const profileId = Number(id);
      const result = await this.profilesService.update(profileId, updateProfileDto);

      return {
        data: result,
        message: 'update profile success'
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
