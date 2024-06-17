// 版本一
import {
  Controller,
  Get,
  Header,
  VERSION_NEUTRAL,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import * as grapesjs from 'grapesjs';
import { data } from './data';
// console.log(grapesjs, 'xxx');
// fetch('https://unpkg.com/grapesjs').then((res) => {
//   console.log(res, 'xxx');
// });

// @Controller('user')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  grapesjs: any;
  data: any;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.grapesjs = grapesjs;
    this.data = data;
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getUser(): object {
    const editor = this.grapesjs.init({ headless: true });
    try {
      editor.loadData(data);
      const mainPage = editor.Pages.getMain();
      // console.log(mainPage.attributes);
      mainPage.attributes.basicForm.name = 'pittle';
      // console.log(editor.storeData().pages[0].basicForm);
      console.log(editor.getHtml(), editor.getCss());

      // editor.Components.addType('tpkg-layout-module', {
      //   model: {
      //     init() {
      //       const toolbar = this.attributes.toolbar!;
      //       if (!toolbar.find((t: any) => !!t.isModuleSetting)) {
      //         this.attributes.toolbar!.push({
      //           attributes: {
      //             class: 'fa fa-ellipsis-h fa-ellipsis-h-alt',
      //             id: 'toolbar-more-module',
      //           },
      //           command: () => {
      //             editor.trigger('tpkg:comp-module-more:click' as any);
      //           },
      //           // @ts-ignore
      //           isModuleSetting: true,
      //         });
      //       }
      //     },
      //     // defaults: {
      //     //   // name: i18n.t(`${packageName}.模块`),
      //     //   name: '模块',
      //     //   tagName: 'section',
      //     //   // attributes: { class: "gjs-module" },
      //     //   traits: ['id', 'title'],
      //     //   removable: true,

      //     //   styles: `.gjs-module:hover{ background-color:rgba(11, 111, 248, 0.2)}`,
      //     //   // 初始化内容
      //     //   // content: `<div class="gjs-module"  style="height:100%;padding:150px 0;display:flex;justify-content: center;align-items: center">
      //     //   //             <div class="content-guidance" style="width:50%;display:flex;flex-direction: column;justify-content: center;align-items: center;cursor:pointer;outline:1px dashed rgba(170, 170, 170, 0.7); padding:20px 0;">
      //     //   //                 <div style="  display: flex;justify-content: center;align-items: center;width: 48px;height: 48px;background: rgba(11,111,248,0.30);border-radius: 48px">
      //     //   //                   <span class="material-symbols-outlined" style="color:#0B6FF8">add</span>
      //     //   //                 </div>
      //     //   //                 <div style="padding-top:8px">点击按鈕，将小部件从左侧面板拖动到這裡</div>
      //     //   //             </div>
      //     //   //          </div>
      //     //   //         `
      //     //   content: `<div class="gjs-module"  style="min-height:0px;box-sizing:border-box;height:100%;padding:240px 0;display:flex;justify-content: center;align-items: center">
      //     //           <div  style="width:50%;display:flex;flex-direction: column;justify-content: center;align-items: center;cursor:pointer;">
      //     //               <div style="font-size:14px;" class="content-guidance">
      //     //                 <span style="color:rgba(11,111,248)" class="content-module">新增区块模板</span>
      //     //                 或
      //     //                 <span style="color:rgba(11,111,248)" class="content-block">新增小部件</span>
      //     //               </div>
      //     //           </div>
      //     //        </div>
      //     //       `,

      //     //   // toolbar: [
      //     //   //   {
      //     //   //     label:
      //     //   //       '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>',
      //     //   //     command: (ed: any) =>
      //     //   //       ed.runCommand("core:component-exit", { force: 1 })
      //     //   //   },
      //     //   //   {
      //     //   //     label: `<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z\" /></svg>`,
      //     //   //     command: "tlb-clone"
      //     //   //   },
      //     //   //   {
      //     //   //     label: `<svg viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>`,
      //     //   //     command: "tlb-delete"
      //     //   //   },
      //     //   //   {
      //     //   //     label: `<i class="fa fa-ellipsis-h fa-ellipsis-h-alt" id="toolbar-more-module" style="height:15px;width:18px;display:block"></i>`,
      //     //   //     command: (ed) => {
      //     //   //       ed.trigger("tpkg:comp-module-more:click");
      //     //   //     }
      //     //   //   }
      //     //   // ]
      //     // },
      //   },
      //   // view: {
      //   //   init() {
      //   //     // 监听组件添加和删除 操作
      //   //     this.listenTo(
      //   //       this.model.get('components'),
      //   //       'add remove',
      //   //       this.onChildrenChange,
      //   //     );

      //   //     // console.log("init");
      //   //     // const className = this.model.ccid;
      //   //     // this.model.attributes.styles = `#${className}{height:300px;}`;
      //   //     // this.model.setAttributes({
      //   //     //   ...this.model.getAttributes,
      //   //     //   class: className,
      //   //     // });
      //   //     // console.log(this.model.getStyle());

      //   //     // 默认300px高度
      //   //     // if (!this.model.getStyle().height) {
      //   //     //   this.model.setStyle({
      //   //     //     height: "300px"
      //   //     //     // background: "#ede8fb",
      //   //     //   });
      //   //     // }
      //   //   },

      //   //   events: {
      //   //     'click .content-module': 'onGuideModule',
      //   //     'click .content-block': 'onGuideBlock',
      //   //   },
      //   //   onGuideBlock() {
      //   //     const editor = this.em.getEditor();
      //   //     editor.trigger('tpkg:comp-guide-block:click');
      //   //   },
      //   //   onGuideModule() {
      //   //     const editor = this.em.getEditor();
      //   //     editor.trigger('tpkg:comp-guide-module:click');
      //   //   },
      //   //   onChildrenChange() {
      //   //     if (!this.model.get('components')?.length) {
      //   //       this.renderEmptyContent();
      //   //     } else {
      //   //       this.clearEmptyContent();
      //   //     }
      //   //   },
      //   //   renderEmptyContent() {
      //   //     // @ts-ignore
      //   //     this.el.innerHTML = this.model.get('content');
      //   //   },
      //   //   clearEmptyContent() {
      //   //     const ele = this.el.getElementsByClassName('gjs-module')[0];
      //   //     if (ele) {
      //   //       this.el.removeChild(ele);
      //   //     }
      //   //   },
      //   //   onRender({ el }: any) {
      //   //     // const btn = document.createElement("button");
      //   //     // console.log("onRender====");
      //   //     // btn.value = "+";
      //   //     // btn.innerHTML = "+";
      //   //     // // // This is just an example, AVOID adding events on inner elements,
      //   //     // // // use `events` for these cases
      //   //     // // btn.addEventListener("click", () => {})
      //   //     // // console.log(el)
      //   //     // el.appendChild(btn);
      //   //     // this.renderEmptyContent();
      //   //   },
      //   // },
      // });
      const components = editor.addComponents({ type: 'script' }); // Component Definition
      const html = components.map((cmp) => cmp.toHTML()).join('');
      // console.log(html, 'html');
    } catch (e) {
      console.log(e.message);
    }
    // throw Error('zhangsan');
    // console.log(editor);
    return editor.storeData();
  }
  // 测试版本
  // @Get()
  // @Version('1')
  // getUser(): string {
  //   return 'hello user';
  // }

  @Get('version')
  @Version([VERSION_NEUTRAL, '2'])
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('2')
  findAll2() {
    return 'i am new one';
  }

  // 伪造一个程序运行异常的接口，来验证常规异常是否能被正常捕获：
  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  // 重新伪造一个业务异常的场景
  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }

  // 环境变量
  @Get('getTestName')
  getTestName() {
    console.log('test123123====');
    return this.configService.get('TEST_VALUE').name;
  }
}

// 版本二
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Version,
//   VERSION_NEUTRAL,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { BusinessException } from '@/common/exceptions/business.exception';
// import { ConfigService } from '@nestjs/config';

// @Controller({
//   path: 'user',
//   version: '1',
// })
// export class UserController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly configService: ConfigService,
//   ) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.userService.create(createUserDto);
//   }

//   @Get()
//   @Version([VERSION_NEUTRAL, '1'])
//   findAll() {
//     return this.userService.findAll();
//   }

//   @Get('getTestName')
//   getTestName() {
//     console.log(this.configService.get('TEST_VALUE').name);
//     return this.configService.get('TEST_VALUE').name;
//   }

//   @Get('findError')
//   @Version([VERSION_NEUTRAL, '1'])
//   findError() {
//     const a: any = {};
//     console.log(a.b.c);
//     return this.userService.findAll();
//   }

//   @Get('findBusinessError')
//   @Version([VERSION_NEUTRAL, '1'])
//   findBusinessError() {
//     const a: any = {};
//     try {
//       console.log(a.b.c);
//     } catch (error) {
//       throw new BusinessException('你这个参数错了');
//     }
//     return this.userService.findAll();
//   }

//   @Get()
//   @Version('2')
//   findAll2() {
//     return 'i am new one';
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.userService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }
// }

// 版本三
// import { Controller, Post, Body, Query, Get } from '@nestjs/common';
// import { UserService } from './user.service';
// import { AddUserDto } from './user.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('用户')
// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @ApiOperation({
//     summary: '新增用户',
//   })
//   @Post('/add')
//   create(@Body() user: AddUserDto) {
//     return this.userService.createOrSave(user);
//   }

//   @Get('/')
//   find() {
//     return 'hello world';
//   }
// }
