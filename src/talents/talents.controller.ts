import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTalentDto: CreateTalentDto) {
    return await this.talentsService.create(createTalentDto);
  }

  @Get()
  async findAll() {
    return await this.talentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.talentsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return await this.talentsService.update(id, updateTalentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.talentsService.remove(id);
  }
}