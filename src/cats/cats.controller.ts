import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDTO } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService){}

    @Get()
    async findAll() : Promise<Cat[]>{
      return this.catService.findAll()
    }

    @Post()
    async create(@Body() createcatDto: CreateCatDTO) {
        this.catService.create(createcatDto as Cat)
        return {
            message: "create success"
        }
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number): Promise<Cat> {
        const cat = this.catService.findOne(id) as Cat
        return cat
    }

    @Patch(':id')
    update(@Param("id", ParseIntPipe) id:number) {}
    
    @Delete(':id')
    delete(@Param("id", ParseIntPipe) id:number) {}
}
