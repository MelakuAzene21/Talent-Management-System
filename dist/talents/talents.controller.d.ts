import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
export declare class TalentsController {
    private readonly talentsService;
    constructor(talentsService: TalentsService);
    create(createTalentDto: CreateTalentDto): Promise<import("./entities/talent.entity").Talent>;
    findAll(): Promise<import("./entities/talent.entity").Talent[]>;
    findOne(id: string): Promise<import("./entities/talent.entity").Talent>;
    update(id: string, updateTalentDto: UpdateTalentDto): Promise<import("./entities/talent.entity").Talent>;
    remove(id: string): Promise<void>;
}
