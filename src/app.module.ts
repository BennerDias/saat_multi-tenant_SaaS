import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/users.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentServiceModule } from './appointment_services/appointmentservice.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_saat',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
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
