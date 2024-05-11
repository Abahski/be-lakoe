import { Injectable } from '@nestjs/common';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from './dto/update-message-template.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageTemplatesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageTemplateDto: CreateMessageTemplateDto) {
    try {
      const messageTemplate = await this.prisma.messageTemplates.create({
        data: createMessageTemplateDto,
      });
      return {
        data: messageTemplate,
        message: 'Successfully created messageTemplate',
      };
    } catch (error) {
      throw new Error(`Failed to create messageTemplate: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const messageTemplates = await this.prisma.messageTemplates.findMany();
      return {
        data: messageTemplates,
        message: 'Successfully fetched messageTemplates',
      };
    } catch (error) {
      throw new Error(`Failed to fetch messageTemplates: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const messageTemplate = await this.prisma.messageTemplates.findUnique({
        where: { id },
      });
      return {
        data: messageTemplate,
        message: 'Successfully fetched messageTemplate',
      };
    } catch (error) {
      throw new Error(`Failed to find messageTemplate: ${error.message}`);
    }
  }

  async update(id: number, updateMessageTemplateDto: UpdateMessageTemplateDto) {
    try {
      const messageId = Number(id);
      const messageTemplate = await this.prisma.messageTemplates.findUnique({
        where: { id: messageId },
      });

      if (!messageTemplate) {
        return { message: 'MessageTemplate not found' };
      }
      const updatedMessageTemplate = await this.prisma.messageTemplates.update({
        where: { id: messageId },
        data: updateMessageTemplateDto,
      });
      return {
        data: updatedMessageTemplate,
        message: 'Successfully updated messageTemplate',
      };
    } catch (error) {
      throw new Error(`Failed to update messageTemplate: ${error.message}`);
    }
  }

  async remove(id: number) {
    const messageTemplateId = Number(id);
    const messageTemplate = await this.prisma.messageTemplates.findUnique({
      where: { id: messageTemplateId },
    });
    if (!messageTemplate) {
      return { message: 'MessageTemplate not found' };
    }
    const deletedMessageTemplate = await this.prisma.messageTemplates.delete({
      where: { id: messageTemplateId },
    });
    return {
      data: deletedMessageTemplate,
      message: 'Successfully deleted messageTemplate',
    };
  }
}
