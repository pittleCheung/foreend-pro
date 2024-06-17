import { Parser } from "./Parser";
import { Tokenizer } from "./Tokenizer";
import util from 'util'

const code = `let a = function() {}`;
const tokenizer = new Tokenizer(code);
console.log(tokenizer.tokenize())
const parser = new Parser(tokenizer.tokenize());
// console.log(parser.parse())

console.log(util.inspect(parser.parse(),{ depth:null }))