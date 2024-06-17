import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HostParam,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Controller('cats')
// @Controller({ host: ':localhost:3000', path: '/cats' })
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  @Get('/account')
  getInfo(@HostParam('account') account: string) {
    console.log(account);
    return account;
  }

  // @@filename(cats.controller)
  @Get('/Observable')
  observable(): Observable<any[]> {
    return of([]);
  }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   console.log(createCatDto);
  //   return 'This action adds a new cat';
  // }

  // @Post()
  // @UseFilters(new HttpExceptionFilter())
  // async create(@Body() createCatDto: CreateCatDto) {
  //   throw new ForbiddenException();
  // }

  // @Get('/:id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return id;
  // }

  /**
   *
   * @param createCatDto 管道
   */
  // @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // 拦截器
}
