import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talent } from './entities/talent.entity';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';

@Injectable()
export class TalentsService {
  constructor(
    @InjectRepository(Talent)
    private talentRepository: Repository<Talent>,
  ) {}

  async create(createTalentDto: CreateTalentDto): Promise<Talent> {
    try {
      const talent = this.talentRepository.create(createTalentDto);
      return await this.talentRepository.save(talent);
    } catch (error) {
      if (error.code === '23505' || error.errno === 19 || error.code === 'SQLITE_CONSTRAINT') { // Constraint violation
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Talent[]> {
    return await this.talentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Talent> {
    const talent = await this.talentRepository.findOne({ where: { id } });
    
    if (!talent) {
      throw new NotFoundException(`Talent with ID ${id} not found`);
    }
    
    return talent;
  }

  async update(id: string, updateTalentDto: UpdateTalentDto): Promise<Talent> {
    const talent = await this.findOne(id);
    
    try {
      Object.assign(talent, updateTalentDto);
      return await this.talentRepository.save(talent);
    } catch (error) {
      if (error.code === '23505' || error.errno === 19 || error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.talentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Talent with ID ${id} not found`);
    }
  }
}