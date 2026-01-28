import { Controller, UseGuards, Get, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembershipService } from '../service/membership.service';

@Controller('memberships')
@UseGuards(AuthGuard('jwt'))
export class MembershipController {
  constructor(
    private membershipService: MembershipService,
    // REMOVIDO: private companyService: CompanyService <-- TIRE ISSO
  ) {}

  @Get('my/:companyId')
  getMyRole(@Req() req, @Param('companyId') companyId: number) {
    return this.membershipService.findByUserAndCompany(req.user.id, companyId);
  }
}
