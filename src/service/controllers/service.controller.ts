import { Controller } from "@nestjs/common";

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: Service)
}