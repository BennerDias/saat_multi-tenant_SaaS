import { Controller, UseGuards, Get, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembershipService } from '../service/membership.service';

@Controller('memberships')
@UseGuards(AuthGuard('jwt'))
export class MembershipController {
  constructor(private service: MembershipService) {}

  @Get('my/:companyId')
  getMyRole(@Req() req, @Param('companyId') companyId: number) {
    return this.service.findByUserAndCompany(req.user.id, companyId);
  }
}
