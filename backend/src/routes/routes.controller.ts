import { Controller, Get, Post, Body, UseGuards, Request, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { CreateRouteDto, SearchRoutesDto } from './dto';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Get()
  search(@Query() query: SearchRoutesDto) {
    return this.routesService.search(query);
  }

  @Get('my-routes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getMyRoutes(@Request() req) {
    return this.routesService.getMyRoutes(req.user.userId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.routesService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Body() dto: CreateRouteDto, @Request() req) {
    return this.routesService.create(dto, req.user.userId);
  }
}
