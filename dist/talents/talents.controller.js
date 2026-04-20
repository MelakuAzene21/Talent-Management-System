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
exports.TalentsController = void 0;
const common_1 = require("@nestjs/common");
const talents_service_1 = require("./talents.service");
const create_talent_dto_1 = require("./dto/create-talent.dto");
const update_talent_dto_1 = require("./dto/update-talent.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TalentsController = class TalentsController {
    constructor(talentsService) {
        this.talentsService = talentsService;
    }
    async create(createTalentDto) {
        return await this.talentsService.create(createTalentDto);
    }
    async findAll() {
        return await this.talentsService.findAll();
    }
    async findOne(id) {
        return await this.talentsService.findOne(id);
    }
    async update(id, updateTalentDto) {
        return await this.talentsService.update(id, updateTalentDto);
    }
    async remove(id) {
        await this.talentsService.remove(id);
    }
};
exports.TalentsController = TalentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_talent_dto_1.CreateTalentDto]),
    __metadata("design:returntype", Promise)
], TalentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TalentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_talent_dto_1.UpdateTalentDto]),
    __metadata("design:returntype", Promise)
], TalentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalentsController.prototype, "remove", null);
exports.TalentsController = TalentsController = __decorate([
    (0, common_1.Controller)('talents'),
    __metadata("design:paramtypes", [talents_service_1.TalentsService])
], TalentsController);
//# sourceMappingURL=talents.controller.js.map