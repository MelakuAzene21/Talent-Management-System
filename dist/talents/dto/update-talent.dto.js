"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTalentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_talent_dto_1 = require("./create-talent.dto");
class UpdateTalentDto extends (0, mapped_types_1.PartialType)(create_talent_dto_1.CreateTalentDto) {
}
exports.UpdateTalentDto = UpdateTalentDto;
//# sourceMappingURL=update-talent.dto.js.map