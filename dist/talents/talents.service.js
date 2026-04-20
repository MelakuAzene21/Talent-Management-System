"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const talent_entity_1 = require("./entities/talent.entity");
let TalentsService = class TalentsService {
    constructor(talentRepository) {
        this.talentRepository = talentRepository;
    }
    async create(createTalentDto) {
        try {
            const talent = this.talentRepository.create(createTalentDto);
            return await this.talentRepository.save(talent);
        }
        catch (error) {
            if (error.code === '23505' || error.errno === 19 || error.code === 'SQLITE_CONSTRAINT') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async findAll() {
        return await this.talentRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const talent = await this.talentRepository.findOne({ where: { id } });
        if (!talent) {
            throw new common_1.NotFoundException(`Talent with ID ${id} not found`);
        }
        return talent;
    }
    async update(id, updateTalentDto) {
        const talent = await this.findOne(id);
        try {
            Object.assign(talent, updateTalentDto);
            return await this.talentRepository.save(talent);
        }
        catch (error) {
            if (error.code === '23505' || error.errno === 19 || error.code === 'SQLITE_CONSTRAINT') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        const result = await this.talentRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Talent with ID ${id} not found`);
        }
    }
};
exports.TalentsService = TalentsService;
exports.TalentsService = TalentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(talent_entity_1.Talent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TalentsService);
//# sourceMappingURL=talents.service.js.map