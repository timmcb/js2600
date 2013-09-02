
function AssemblyTokenizerFile(file) {
    this.File = file;
    this.Position = 0;

    this.PeekChar = function(position) {
        var ch = null;
        if (position && this.File && position >= 0 && position < this.File.length) {
            ch = this.File.charAt(position);
        }
        return ch;
    }

    this.Advance = function() {
        if (this.Positon && this.Positon < this.File.length) {
            this.Positon++;
        }
    }

    this.PeekString = function(length, position) {
        var str = null;
        if (length && length > 0 && position && position >=0 && this.File && (position + length) <= this.File.length) {
            ch = this.File.substr(position, length);
        }
        return ch;
    }

    this.GetChar = function() {
        var ch = this.PeekChar(this.Position);
        if (ch) {
            this.Position++;
        }
        return ch;
    }

    this.PutChar = function() {
        this.Position--;
    }
    
    this.GetString = function(length) {
        var str = this.PeekString(this.Position, length);
        if (str) {
            this.Position += length;
        }
        return ch;
    }
}

function AssemblyTokenizer() {

    this.TokenTypes = {
        Whitespace : 0,
        LineTerminator : 1,
        Comment : 2,
        Digits : 3,
        Letters : 4,
        Quote : 5,
        Dollar : 6,
        Pound : 7,
        LeftParen : 8,
        RightParen : 9,
        Period : 10,
        Colon : 11,
        Comma : 12,
        Greater : 13,
        Less : 14,
        Equal : 15,
        Char : 16,
        EOI : 17
    }

    function Token(type, line, column, length) {
        this.Type = type;
        this.Line = line;
        this.Column = column;
        this.Length = length;
    }

    this.Tokens = new Array();
    this.LineNumber = 1;
    this.LinePosition = 0;
    this.TokenPosition = 0;
    this.File = null;

    this.AddToken = function(type) {
        if(this.File.Position > this.TokenPosition) {
            var filePosition = this.File.Posision;
            var token = new Token(type, this.LineNumber, filePosition - this.LinePosition + 1, filePosition - this.TokenPosition);
            this.Tokens.push(token);
            this.TokenPosition = filePosition;
            return true;
        }
        return false;
    }

    this.TokenizeChar = function(character, type) {
        var ch = this.File.PeekChar();
        if(ch === character) {
            this.File.Advance();
            return this.AddToken(type);
        }
        return false;
    }

    this.TokenizeWhitespace = function() {
        for(var ch = this.File.PeekChar(); ch !== null && (ch === " " || ch === "\t"); ) {
            this.File.Advance();
        }
        return this.AddToken(this.TokenTypes.Whitespace);
    }

    this.TokenizeLineTerminator = function() {
        var ch = this.File.PeekChar();
        if(ch === "\r") {
            this.File.Advance();
            ch = this.File.PeekChar();
        }
        if(ch === "\n") {
            this.File.Advance();
        }
        return this.AddToken(this.TokenTypes.LineTerminator);
    }

    this.TokenizeComment = function() {
        var ch = this.File.PeekChar();
        if(ch === ";") {
            this.File.Advance();

            for(ch = this.File.PeekChar(); ch !== null && ch !== "\r" && ch !== "\n"; ) {
                this.File.Advance();
            }
            return this.AddToken(this.TokenTypes.Comment);
        }
        return false;
    }

    this.TokenizeDigits = function() {
        for(var ch = this.File.PeekChar(); ch >= '0' && ch <= '9'; ) {
            this.File.Advance();
        }
        return this.AddToken(this.TokenTypes.Digits);
    }

    this.TokenizeLetters = function() {
        for(var ch = this.File.PeekChar(); ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')); ) {
            this.File.Advance();
        }
        return this.AddToken(this.TokenTypes.Leters);
    }

    this.TokenizeQuote = function() {
        return this.TokenizeChar("\"", this.TokenTypes.Quote);
    }

    this.TokenizeDollar = function() {
        return this.TokenizeChar("$", this.TokenTypes.Dollar);
    }

    this.TokenizePound = function() {
        return this.TokenizeChar("#", this.TokenTypes.Pound);
    }

    this.TokenizeLeftParen = function() {
        return this.TokenizeChar("(", this.TokenTypes.LeftParen);
    }

    this.TokenizeRightParen = function() {
        return this.TokenizeChar(")", this.TokenTypes.RightParen);
    }

    this.TokenizePeriod = function() {
        return this.TokenizeChar(".", this.TokenTypes.Period);
    }

    this.TokenizeColon = function() {
        return this.TokenizeChar(":", this.TokenTypes.Colon);
    }

    this.TokenizeComma = function() {
        return this.TokenizeChar(",", this.TokenTypes.Comma);
    }

    this.TokenizeGreater = function() {
        return this.TokenizeChar(">", this.TokenTypes.Greater);
    }

    this.TokenizeLess = function() {
        return this.TokenizeChar("<", this.TokenTypes.Less);
    }

    this.TokenizeEqual = function() {
         return this.TokenizeChar("=", this.TokenTypes.Equal);
    }

    this.TokenizeOther = function() {
        var ch = this.File.PeekChar();
        if(ch !== null) {
            this.File.Advance();
            return this.AddToken(this.TokenTypes.Other);
        }
        return false;
    }

    this.TokenizeEOI = function() {
        var ch = this.File.PeekChar();
        if(ch === null) {
            this.AddToken(this.TokenTypes.EOI);
        }
        return false;
    }

    this.Tokenize = function(file) {
        this.Tokens = new Array();
        this.LineNumber = 1;
        this.LinePosition = 0;
        this.TokenPosition = 0;
        this.File = null;

        while(!TokenizeEOI()) {
            if(TokenizeComment()
                || TokenizeWhitespace()
                || TokenizeLineTerminator()
                || TokenizeDigits()
                || TokenizeLetters()
                || TokenizeQuote()
                || TokenizeDollar()
                || TokenizePound()
                || TokenizeLeftParen()
                || TokenizeRightParen()
                || TokenizePeriod()
                || TokenizeColon()
                || TokenizeComma()
                || TokenizeGreater()
                || TokenizeLess()
                || TokenizeEqual()) {
            }
            else {
                TokenizeChar();
            }
        }
    }
}

function AssemblyParser() {

    this.Tokenizer = null;

    this.Parse = function(file) {
        this.Tokenizer = new Tokenizer(file);
        return this.ParseFile();
    }

    this.ParseFile = function() {
        var success = true;
        while(!this.parseEOI()) {
            if (!this.ParseLine()) {
                success = false;
            }
        }
        return success;
    }

    this.ParseLine = function() {
        var success = false;

        ParseWhitespace();

        if(this.ParseDirective()) {
            success = true;
        }
        else if (ParseOperation()) {
            success = true;
        }

        ParseWhitespace();
        ParseComment();

        return success;
    }

    this.ParseDirective = function() {
       if(ParseIdentifier()) {
           if ()
       }
       
       return false; 
    }

    this.ParseOperation = function() {
        
    }

    this.ParseLabel = function() {
        if(ParseIdentifier()) {
            ParseWhitespace();
            if (ParseLabelTerminator()) {
                push label
            }
        }
    }

    this.ParseIdentifier = function() {
        if (token.Type === TokenType.Letters) {
            while (token.Type === TokenType.Letters || tokenType === TokenType.Digits) {
                
            }
        }
        return false;
    }

    this.ParseInstruction = function() {
        if (ParseMneumonic()) {
            ParseWhitespace();
            ParseExpression()
        }
    }

    this.ParseMneumonic = function() {
        if (ParseIdentifier) {
            
        }
    }

    this.ParseExpression = function() {
        if (ParseAbsolute()) {
            ParseIndirect()
            ParseImmediate()
            Parse
        }
    }

    this.ParseAbsolute = function() {
        if (ParseAddress()) {
            ParseLabel
        }
    }

    this.ParseNumericLiteral = function() {
        if (ParseDecimalLiteral()) {
            ParseHexidecimalNumber()
        }
    }

    this.ParseDecimalLiteral = function() {
        if (ParseDigits) {
        }
    }

    this.ParseHexidecimalLiteral = function() {
        if (ParseDollar) {
            while (ParseDigits ParseHex)
        }
        ParseDigits) {
        }
    }

    this.ParseDeclaration = function() {
        ParseIdentifier
        ParseWhitespace
        ParseEquals
        ParseNumericLiteral
    }

    this.ParseORG
}


function Assembler() {
    this.Bin = null;
    this.Sym = null;
    this.Asm = null;

    this.Parser = null;
    this.Tokenizer = null

    this.Assemble = function(asm) {
        this.Asm = asm;
        this.Tokenizer= new Tokenizer(asm);
        this.Parser = new Parser(this.Tokenizer);

        if (this.Parser.ParseFile()) {
           this.Compile(); 
        }

        return this.Errors();
    }

    this.Errors = function() {
        
    }
}