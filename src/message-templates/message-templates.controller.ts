import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageTemplatesService } from './message-templates.service';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { UpdateMessageTemplateDto } from './dto/update-message-template.dto';

@Controller('message-templates')
export class MessageTemplatesController {
  constructor(
    private readonly messageTemplatesService: MessageTemplatesService,
  ) {}

  @Post()
  create(@Body() createMessageTemplateDto: CreateMessageTemplateDto) {
    return this.messageTemplatesService.create(createMessageTemplateDto);
  }

  @Get()
  findAll() {
    return this.messageTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageTemplatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageTemplateDto: UpdateMessageTemplateDto,
  ) {
    return this.messageTemplatesService.update(+id, updateMessageTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageTemplatesService.remove(+id);
  }
}
