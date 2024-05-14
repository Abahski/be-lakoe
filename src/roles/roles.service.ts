import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { roleValidation } from 'src/util/validation/roles/roles';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const { error } = roleValidation.validate(createRoleDto);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const role = await this.prisma.roles.create({
        data: createRoleDto,
      });

      return {
        data: role,
        message: 'Successfully created role',
      };
    } catch (error) {
      throw new Error(`Failed to create role: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const roles = await this.prisma.roles.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return {
        data: roles,
      };
    } catch (error) {
      throw new Error(`Failed to find role: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prisma.roles.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return {
        data: role,
      };
    } catch (error) {
      throw new Error(`Failed to find role: ${error.message}`);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.prisma.roles.update({
        where: {
          id: id,
        },
        data: updateRoleDto,
      });

      return {
        data: role,
        message: 'Successfully updated role',
      };
    } catch (error) {
      throw new Error(`Failed to update role: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const role = await this.prisma.roles.delete({
        where: {
          id: id,
        },
      });
      return {
        data: role,
        message: 'Successfully deleted role',
      };
    } catch (error) {
      throw new Error(`Failed to delete role: ${error.message}`);
    }
  }
}
