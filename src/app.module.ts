import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/users.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentServiceModule } from './appointment_services/appointmentservice.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UserModule,
    ServiceModule,
    CompanyModule,
    AuthModule,
    AppointmentServiceModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
