import { Repository } from 'typeorm';
import { Talent } from './entities/talent.entity';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
export declare class TalentsService {
    private talentRepository;
    constructor(talentRepository: Repository<Talent>);
    create(createTalentDto: CreateTalentDto): Promise<Talent>;
    findAll(): Promise<Talent[]>;
    findOne(id: string): Promise<Talent>;
    update(id: string, updateTalentDto: UpdateTalentDto): Promise<Talent>;
    remove(id: string): Promise<void>;
}
