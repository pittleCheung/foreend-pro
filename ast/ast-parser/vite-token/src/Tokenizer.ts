export enum TokenType {
  // let
  Let = "Let",
  // =
  Assign = "Assign",
  // function
  Function = "Function",
  // 变量名
  Identifier = "Identifier",
  // (
  LeftParen = "LeftParen",
  // )
  RightParen = "RightParen",
  // {
  LeftCurly = "LeftCurly",
  // }
  RightCurly = "RightCurly",
}

export type Token = {
  type: TokenType;
  value?: string;
  start: number;
  end: number;
  raw?: string;
};

// 然后定义 Token 的生成器对象:
const TOKENS_GENERATOR: Record<string, (...args: any[]) => Token> = {
  let(start: number) {
    return { type: TokenType.Let, value: "let", start, end: start + 3 };
  },
  assign(start: number) {
    return { type: TokenType.Assign, value: "=", start, end: start + 1 };
  },
  function(start: number) {
    return {
      type: TokenType.Function,
      value: "function",
      start,
      end: start + 8,
    };
  },
  leftParen(start: number) {
    return { type: TokenType.LeftParen, value: "(", start, end: start + 1 };
  },
  rightParen(start: number) {
    return { type: TokenType.RightParen, value: ")", start, end: start + 1 };
  },
  leftCurly(start: number) {
    return { type: TokenType.LeftCurly, value: "{", start, end: start + 1 };
  },
  rightCurly(start: number) {
    return { type: TokenType.RightCurly, value: "}", start, end: start + 1 };
  },
  identifier(start: number, value: string) {
    return {
      type: TokenType.Identifier,
      value,
      start,
      end: start + value.length,
    };
  },
}

type SingleCharTokens = "(" | ")" | "{" | "}" | "=";

// 单字符到 Token 生成器的映射
const KNOWN_SINGLE_CHAR_TOKENS = new Map<
  SingleCharTokens,
  typeof TOKENS_GENERATOR[keyof typeof TOKENS_GENERATOR]
>([
  ["(", TOKENS_GENERATOR.leftParen],
  [")", TOKENS_GENERATOR.rightParen],
  ["{", TOKENS_GENERATOR.leftCurly],
  ["}", TOKENS_GENERATOR.rightCurly],
  ["=", TOKENS_GENERATOR.assign],
]);



/**
 * 在扫描字符的过程，我们需要对不同的字符各自进行不同的处理，具体的策略如下：
当前字符为分隔符，如空格，直接跳过，不处理；
当前字符为字母，需要继续扫描，获取完整的单词:
如果单词为语法关键字，则新建相应关键字的 Token
否则视为普通的变量名
当前字符为单字符，如{、}、(、)，则新建单字符对应的 Token
 */
export class Tokenizer {
  private _tokens: Token[] = [];
  private _currentIndex: number = 0;
  private _source: string;
  constructor(input: string) {
    this._source = input;
  }
  tokenize(): Token[] {
    while (this._currentIndex < this._source.length) {
      // while 循环内部
      let currentChar = this._source[this._currentIndex];
      const startIndex = this._currentIndex;

      const isAlpha = (char: string): boolean => {
        return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
      }

      // 1. 处理空格
      if (currentChar === ' ') {
        this._currentIndex++;
        continue;
      }
      // 2. 处理字母
      else if (isAlpha(currentChar)) {
        let identifier = '';
        while(isAlpha(currentChar)) {
          identifier += currentChar;
          this._currentIndex ++;
          currentChar = this._source[this._currentIndex];
        }
        let token: Token;
        if (identifier in TOKENS_GENERATOR) { // let function
          // 如果是关键字
          token =
              TOKENS_GENERATOR[identifier as keyof typeof TOKENS_GENERATOR](
                startIndex
              );
        } else {
          // 如果是普通标识符
          token = TOKENS_GENERATOR["identifier"](startIndex, identifier);
        }
        this._tokens.push(token);
        continue;
      }
      // 3. 处理单字符
      else if(KNOWN_SINGLE_CHAR_TOKENS.has(currentChar as SingleCharTokens)) {
        const token = KNOWN_SINGLE_CHAR_TOKENS.get(
          currentChar as SingleCharTokens
        )!(startIndex);
        this._tokens.push(token);
        this._currentIndex++;
        continue;
      }
            
    }
    return this._tokens;
  }
}

 const code = `let a = function() {}`;
 const tokenizer = new Tokenizer(code);

//  console.log(tokenizer.tokenize())

//  [
//   { type: 'Let', value: 'let', start: 0, end: 3 },
//   { type: 'Identifier', value: 'a', start: 4, end: 5 },
//   { type: 'Assign', value: '=', start: 6, end: 7 },
//   { type: 'Function', value: 'function', start: 8, end: 16 },
//   { type: 'LeftParen', value: '(', start: 16, end: 17 },
//   { type: 'RightParen', value: ')', start: 17, end: 18 },
//   { type: 'LeftCurly', value: '{', start: 19, end: 20 },
//   { type: 'RightCurly', value: '}', start: 20, end: 21 }
// ]