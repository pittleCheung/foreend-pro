import { BlockStatement, Expression, FunctionExpression, Identifier, NodeType, Program, Statement, VariableDeclaration, VariableDeclarator, VariableKind } from "./node-types";
import {Token, Tokenizer, TokenType} from "./Tokenizer"
import util from 'util'

export class Parser {
  private _tokens: Token[] = [];
  private _currentIndex = 0;
  constructor(token: Token[]) {
    this._tokens = [...token];
  }
  
  parse(): Program {
    const program = this._parseProgram();
    return program;
  }

   // token 是否已经扫描完
  private _isEnd(): boolean {
    return this._currentIndex >= this._tokens.length;
  }
  
  private _parseProgram(): Program {
    const program: Program = {
      type: NodeType.Program,
      body: [],
      start: 0,
      end: Infinity,
    };
    
    // 解析 token 数组
    // while (!this._isEnd()) {
    //   console.log(this._tokens[this._currentIndex])
    //   const node = this._parseStatement();
    //   // console.log(util.inspect(node,{ depth:null }))
    //   // program.body.push(node);
    //   // if (this._isEnd()) {
    //   //   program.end = node.end;
    //   // }
    // }
    const node = this._parseStatement();
    program.body.push(node);
    return program;
  }

  private _checkCurrentTokenType(type: TokenType | TokenType[]): boolean {
    // if (this._isEnd()) {
    //   return false;
    // }
    const currentToken = this._tokens[this._currentIndex];
    // console.log(currentToken,type,this._currentIndex)
    if (Array.isArray(type)) {
      return type.includes(currentToken.type);
    } else {
      return currentToken.type === type;
    }
  }

  // 解析变量声明
  private _parseStatement(): Statement | never {
    // TokenType 来自 Tokenizer 的实现中
    if (this._checkCurrentTokenType(TokenType.Let)) {
      return this._parseVariableDeclaration();
    }
    console.log(this._checkCurrentTokenType(TokenType.Let),TokenType.Let)
    throw new Error("Unexpected token");
  }
  
  private _parseVariableDeclaration(): VariableDeclaration {
    // 获取语句开始位置
    const { start } = this._getCurrentToken();
    // 拿到 let
    const kind = this._getCurrentToken().value;
    this._goNext(TokenType.Let);
    // 解析变量名 foo
    const id = this._parseIdentifier();
    // 解析 = 
    this._goNext(TokenType.Assign);
    // 解析函数表达式
    const init = this._parseFunctionExpression();
    const declarator: VariableDeclarator = {
      type: NodeType.VariableDeclarator,
      id,
      init,
      start: id.start,
      end: init ? init.end : id.end,
    };
    // 构造 Declaration 节点
    const node: VariableDeclaration = {
      type: NodeType.VariableDeclaration,
      kind: kind as VariableKind,
      declarations: [declarator],
      start,
      end: this._getPreviousToken().end,
    };
    return node;
  }

  // 1. 解析变量名
  private _parseIdentifier(): Identifier {
    const token = this._getCurrentToken();
    const identifier: Identifier = {
      type: NodeType.Identifier,
      name: token.value!,
      start: token.start,
      end: token.end,
    };
    this._goNext(TokenType.Identifier);
    return identifier;
  }
  
  // 2. 解析函数表达式
  private _parseFunctionExpression(): FunctionExpression {
    const { start } = this._getCurrentToken();
    this._goNext(TokenType.Function);
    let id:any = null;
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier();
    }
    const node: FunctionExpression = {
      type: NodeType.FunctionExpression,
      id,
      params: [],
      body: {
        type: NodeType.BlockStatement,
        body: [],
        start: start,
        end: Infinity,
      },
      start,
      end: 0,
    };
    return node;
  }

  // 用于解析函数参数
  private _parseParams(): Identifier[] | Expression[] {
    // 消费 "("
    this._goNext(TokenType.LeftParen);
    const params:Identifier[] = [];
    // 逐个解析括号中的参数
    while (!this._checkCurrentTokenType(TokenType.RightParen)) {
      let param = this._parseIdentifier();
      params.push(param);
    }
    // 消费 ")"
    this._goNext(TokenType.RightParen);
    return params;
  }

  // 用于解析函数体
  private _parseBlockStatement(): BlockStatement {
    const { start } = this._getCurrentToken();
    const blockStatement: BlockStatement = {
      type: NodeType.BlockStatement,
      body: [],
      start,
      end: Infinity,
    };
    // 消费 "{"
    this._goNext(TokenType.LeftCurly);
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      // 递归调用 _parseStatement 解析函数体中的语句(Statement)
      const node = this._parseStatement();
      blockStatement.body.push(node);
    }
    blockStatement.end = this._getCurrentToken().end;
    // 消费 "}"
    this._goNext(TokenType.RightCurly);
    return blockStatement;
  }

  // 工具方法，表示消费当前 Token，扫描位置移动到下一个 token
  private _goNext(type: TokenType | TokenType[]): Token {
    const currentToken = this._tokens[this._currentIndex];
    // 断言当前 Token 的类型，如果不能匹配，则抛出错误
    if (Array.isArray(type)) {
      if (!type.includes(currentToken.type)) {
        throw new Error(
          `Expect ${type.join(",")}, but got ${currentToken.type}`
        );
      }
    } else {
      if (currentToken.type !== type) {
        throw new Error(`Expect ${type}, but got ${currentToken.type}`);
      }
    }
    this._currentIndex++;
    // console.log("currentToken===",currentToken)   { type: 'Let', value: 'let', start: 0, end: 3 }
    return currentToken;
  }

  private _getCurrentToken(): Token {
    return this._tokens[this._currentIndex];
  }
  
  private _getPreviousToken(): Token {
    console.log()
    return this._tokens[this._currentIndex - 1];
  }
}

const code = `let a = function() {}`;
const tokenizer = new Tokenizer(code);
const parser = new Parser(tokenizer.tokenize());


console.log(util.inspect(parser.parse(),{ depth:null }))