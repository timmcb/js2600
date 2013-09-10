var Mnemonic;
(function (Mnemonic) {
    Mnemonic[Mnemonic["UND"] = 0] = "UND";
    Mnemonic[Mnemonic["ADC"] = 1] = "ADC";
    Mnemonic[Mnemonic["AND"] = 2] = "AND";
    Mnemonic[Mnemonic["ASL"] = 3] = "ASL";
    Mnemonic[Mnemonic["BCC"] = 4] = "BCC";
    Mnemonic[Mnemonic["BCS"] = 5] = "BCS";
    Mnemonic[Mnemonic["BEQ"] = 6] = "BEQ";
    Mnemonic[Mnemonic["BIT"] = 7] = "BIT";
    Mnemonic[Mnemonic["BMI"] = 8] = "BMI";
    Mnemonic[Mnemonic["BNE"] = 9] = "BNE";
    Mnemonic[Mnemonic["BPL"] = 10] = "BPL";
    Mnemonic[Mnemonic["BRK"] = 11] = "BRK";
    Mnemonic[Mnemonic["BVC"] = 12] = "BVC";
    Mnemonic[Mnemonic["BVS"] = 13] = "BVS";
    Mnemonic[Mnemonic["CLC"] = 14] = "CLC";
    Mnemonic[Mnemonic["CLD"] = 15] = "CLD";
    Mnemonic[Mnemonic["CLI"] = 16] = "CLI";
    Mnemonic[Mnemonic["CLV"] = 17] = "CLV";
    Mnemonic[Mnemonic["CMP"] = 18] = "CMP";
    Mnemonic[Mnemonic["CPX"] = 19] = "CPX";
    Mnemonic[Mnemonic["CPY"] = 20] = "CPY";
    Mnemonic[Mnemonic["DEC"] = 21] = "DEC";
    Mnemonic[Mnemonic["DEX"] = 22] = "DEX";
    Mnemonic[Mnemonic["DEY"] = 23] = "DEY";
    Mnemonic[Mnemonic["EOR"] = 24] = "EOR";
    Mnemonic[Mnemonic["INC"] = 25] = "INC";
    Mnemonic[Mnemonic["INX"] = 26] = "INX";
    Mnemonic[Mnemonic["INY"] = 27] = "INY";
    Mnemonic[Mnemonic["JMP"] = 28] = "JMP";
    Mnemonic[Mnemonic["JSR"] = 29] = "JSR";
    Mnemonic[Mnemonic["LDA"] = 30] = "LDA";
    Mnemonic[Mnemonic["LDX"] = 31] = "LDX";
    Mnemonic[Mnemonic["LDY"] = 32] = "LDY";
    Mnemonic[Mnemonic["LSR"] = 33] = "LSR";
    Mnemonic[Mnemonic["NOP"] = 34] = "NOP";
    Mnemonic[Mnemonic["ORA"] = 35] = "ORA";
    Mnemonic[Mnemonic["PHA"] = 36] = "PHA";
    Mnemonic[Mnemonic["PHP"] = 37] = "PHP";
    Mnemonic[Mnemonic["PLA"] = 38] = "PLA";
    Mnemonic[Mnemonic["PLP"] = 39] = "PLP";
    Mnemonic[Mnemonic["ROL"] = 40] = "ROL";
    Mnemonic[Mnemonic["ROR"] = 41] = "ROR";
    Mnemonic[Mnemonic["RTI"] = 42] = "RTI";
    Mnemonic[Mnemonic["RTS"] = 43] = "RTS";
    Mnemonic[Mnemonic["SBC"] = 44] = "SBC";
    Mnemonic[Mnemonic["SEC"] = 45] = "SEC";
    Mnemonic[Mnemonic["SED"] = 46] = "SED";
    Mnemonic[Mnemonic["SEI"] = 47] = "SEI";
    Mnemonic[Mnemonic["STA"] = 48] = "STA";
    Mnemonic[Mnemonic["STX"] = 49] = "STX";
    Mnemonic[Mnemonic["STY"] = 50] = "STY";
    Mnemonic[Mnemonic["TAX"] = 51] = "TAX";
    Mnemonic[Mnemonic["TAY"] = 52] = "TAY";
    Mnemonic[Mnemonic["TSX"] = 53] = "TSX";
    Mnemonic[Mnemonic["TXA"] = 54] = "TXA";
    Mnemonic[Mnemonic["TXS"] = 55] = "TXS";
    Mnemonic[Mnemonic["TYA"] = 56] = "TYA";
})(Mnemonic || (Mnemonic = {}));

var MnemonicString = [
    "UND",
    "ADC",
    "AND",
    "ASL",
    "BCC",
    "BCS",
    "BEQ",
    "BIT",
    "BMI",
    "BNE",
    "BPL",
    "BRK",
    "BVC",
    "BVS",
    "CLC",
    "CLD",
    "CLI",
    "CLV",
    "CMP",
    "CPX",
    "CPY",
    "DEC",
    "DEX",
    "DEY",
    "EOR",
    "INC",
    "INX",
    "INY",
    "JMP",
    "JSR",
    "LDA",
    "LDX",
    "LDY",
    "LSR",
    "NOP",
    "ORA",
    "PHA",
    "PHP",
    "PLA",
    "PLP",
    "ROL",
    "ROR",
    "RTI",
    "RTS",
    "SBC",
    "SEC",
    "SED",
    "SEI",
    "STA",
    "STX",
    "STY",
    "TAX",
    "TAY",
    "TSX",
    "TXA",
    "TXS",
    "TYA"
];

var AddressingMode;
(function (AddressingMode) {
    AddressingMode[AddressingMode["Implied"] = 0] = "Implied";
    AddressingMode[AddressingMode["Absolute"] = 1] = "Absolute";
    AddressingMode[AddressingMode["AbsoluteX"] = 2] = "AbsoluteX";
    AddressingMode[AddressingMode["AbsoluteY"] = 3] = "AbsoluteY";
    AddressingMode[AddressingMode["Accumulator"] = 4] = "Accumulator";
    AddressingMode[AddressingMode["Immediate"] = 5] = "Immediate";
    AddressingMode[AddressingMode["Indirect"] = 6] = "Indirect";
    AddressingMode[AddressingMode["IndirectX"] = 7] = "IndirectX";
    AddressingMode[AddressingMode["IndirectY"] = 8] = "IndirectY";
    AddressingMode[AddressingMode["Relative"] = 9] = "Relative";
    AddressingMode[AddressingMode["ZeroPage"] = 10] = "ZeroPage";
    AddressingMode[AddressingMode["ZeroPageX"] = 11] = "ZeroPageX";
    AddressingMode[AddressingMode["ZeroPageY"] = 12] = "ZeroPageY";
})(AddressingMode || (AddressingMode = {}));

var DisassemblyFormat;
(function (DisassemblyFormat) {
    DisassemblyFormat[DisassemblyFormat["Default"] = 0x1F] = "Default";
    DisassemblyFormat[DisassemblyFormat["Address"] = 0x01] = "Address";
    DisassemblyFormat[DisassemblyFormat["ByteCodes"] = 0x02] = "ByteCodes";
    DisassemblyFormat[DisassemblyFormat["Mnemonic"] = 0x04] = "Mnemonic";
    DisassemblyFormat[DisassemblyFormat["BranchAddress"] = 0x08] = "BranchAddress";
    DisassemblyFormat[DisassemblyFormat["Label"] = 0x10] = "Label";
    DisassemblyFormat[DisassemblyFormat["Decimal"] = 0x20] = "Decimal";
    DisassemblyFormat[DisassemblyFormat["AllHex"] = 0x0F] = "AllHex";
    DisassemblyFormat[DisassemblyFormat["AllDecimal"] = 0x2F] = "AllDecimal";
})(DisassemblyFormat || (DisassemblyFormat = {}));

var RW;
(function (RW) {
    RW[RW["None"] = 0] = "None";
    RW[RW["Read"] = 1] = "Read";
    RW[RW["Write"] = 2] = "Write";
    RW[RW["ReadWrite"] = 3] = "ReadWrite";
})(RW || (RW = {}));

function Instruction(operation, mnemonic, addressingMode, bytes, cycles, pageCycles, branchCycles, rw) {
    this.Operation = operation;
    this.Mnemonic = mnemonic;
    this.AddressingMode = addressingMode;
    this.Bytes = bytes;
    this.Cycles = cycles;
    this.PageCycles = pageCycles;
    this.BranchCycles = branchCycles;
    this.RW = rw;
}

function DisassembledInstruction() {
    this.LabelResolver = null;
    this.Address = null;
    this.Operands = null;
    this.Operation = null;
    this.Mnemonic = null;
    this.AddressingMode = null;
    this.Bytes = null;
    this.Cycles = null;
    this.PageCycles = null;
    this.BranchCycles = null;
    this.RW = null;
    this.Operand = null;
}

DisassembledInstruction.prototype.Init = function (address, instruction, operands, labelResolver) {
    this.LabelResolver = labelResolver;
    this.Address = address;
    this.Operands = operands;
    this.Operation = instruction.Operation;
    this.Mnemonic = instruction.Mnemonic;
    this.AddressingMode = instruction.AddressingMode;
    this.Bytes = instruction.Bytes;
    this.Cycles = instruction.Cycles;
    this.PageCycles = instruction.PageCycles;
    this.BranchCycles = instruction.BranchCycles;
    this.RW = instruction.RW;

    switch (operands.length) {
        case 2:
            this.Operand = (operands[1] << 8) | operands[0];
            break;
        case 1:
            this.Operand = operands[0];
            break;
        default:
            this.Operand = null;
            break;
    }
};

DisassembledInstruction.prototype.NumberToString = function (number, disassemblyFormat, bytes) {
    if (!disassemblyFormat) {
        disassemblyFormat = DisassemblyFormat.Default;
    }

    if (!bytes) {
        bytes = 1;
    }

    var numberString;
    var padding;

    if (disassemblyFormat & DisassemblyFormat.Decimal) {
        numberString = number.toString();
        padding = ((bytes * 2) + 1) - numberString.length;
    } else {
        numberString = number.toString(16).toUpperCase();
        padding = (bytes * 2) - numberString.length;
    }

    while (padding > 0) {
        numberString = "0" + numberString;
        padding--;
    }

    return numberString;
};

DisassembledInstruction.prototype.ByteCodesToString = function (disassemblyFormat) {
    if (!disassemblyFormat) {
        disassemblyFormat = DisassemblyFormat.Default;
    }

    var byteCodesString = this.NumberToString(this.Operation, disassemblyFormat);

    for (var i = 0; i < this.Operands.length; i++) {
        byteCodesString += this.NumberToString(this.Operands[i], disassemblyFormat);
    }

    var len = 10;
    if (disassemblyFormat & DisassemblyFormat.Decimal) {
        len = 10;
    }

    len -= byteCodesString.length;
    while (len > 0) {
        byteCodesString += " ";
        len--;
    }

    return byteCodesString;
};

DisassembledInstruction.prototype.AddressToString = function (disassemblyFormat) {
    return this.NumberToString(this.Address, disassemblyFormat, 2);
};

DisassembledInstruction.prototype.BranchAddressToString = function (disassemblyFormat) {
    var branchAddress = null;

    if (this.AddressingMode === AddressingMode.Relative) {
        var relative = this.Operands[0];
        branchAddress = this.Address + this.Bytes + (relative - ((relative & 0x80) << 1));
    }

    return this.NumberToString(branchAddress, disassemblyFormat, 2);
};

DisassembledInstruction.prototype.toString = function (disassemblyFormat) {
    if (!disassemblyFormat) {
        disassemblyFormat = DisassemblyFormat.Default;
    }

    var disassembly = "";

    if (disassemblyFormat & DisassemblyFormat.Address) {
        disassembly += this.AddressToString(disassemblyFormat);
    }

    if (disassemblyFormat & DisassemblyFormat.ByteCodes) {
        if (disassembly.length > 0)
            disassembly += " ";
        disassembly += this.ByteCodesToString(disassemblyFormat);
    }

    if (disassemblyFormat & DisassemblyFormat.Mnemonic) {
        if (disassembly.length > 0)
            disassembly += " ";
        disassembly += this.MnemonicToString(disassemblyFormat);
    }

    return disassembly;
};

DisassembledInstruction.prototype.OperandToString = function (disassemblyFormat, addressBytes) {
    if (!disassemblyFormat) {
        disassemblyFormat = DisassemblyFormat.Default;
    }

    if (!addressBytes) {
        addressBytes = 0;
    }

    var operandString;

    if (this.LabelResolver && addressBytes > 0 && disassemblyFormat & DisassemblyFormat.Label) {
        operandString = this.LabelResolver.AddressToLabel(this.Operand, this.RW);
    }

    if (!operandString) {
        if (disassemblyFormat & DisassemblyFormat.Decimal) {
            operandString = "";
        } else {
            operandString = "$";
        }
        operandString += this.NumberToString(this.Operand, disassemblyFormat, this.Bytes - 1);
    }

    return operandString;
};

DisassembledInstruction.prototype.MnemonicToString = function (disassemblyFormat) {
    if (!disassemblyFormat) {
        disassemblyFormat = DisassemblyFormat.Default;
    }

    var str = MnemonicString[this.Mnemonic];

    switch (this.AddressingMode) {
        case AddressingMode.Implied:
            break;
        case AddressingMode.Absolute:
            str = str + " " + this.OperandToString(disassemblyFormat, 2);
            break;
        case AddressingMode.AbsoluteX:
            str = str + " " + this.OperandToString(disassemblyFormat, 2) + ",X";
            break;
        case AddressingMode.AbsoluteY:
            str = str + " " + this.OperandToString(disassemblyFormat, 2) + ",Y";
            break;
        case AddressingMode.Accumulator:
            str = str + " A";
            break;
        case AddressingMode.Immediate:
            str = str + " #" + this.OperandToString(disassemblyFormat);
            break;
        case AddressingMode.Indirect:
            str = str + " (" + this.OperandToString(disassemblyFormat, 2) + ")";
            break;
        case AddressingMode.IndirectX:
            str = str + " (" + this.OperandToString(disassemblyFormat, 1) + ",X)";
            break;
        case AddressingMode.IndirectY:
            str = str + " (" + this.OperandToString(disassemblyFormat, 1) + "),Y";
            break;
        case AddressingMode.Relative:
            str += " ";
            if (disassemblyFormat & DisassemblyFormat.BranchAddress) {
                str += this.BranchAddressToString(disassemblyFormat);
            } else {
                str += this.OperandToString(disassemblyFormat);
            }
            break;
        case AddressingMode.ZeroPage:
            str = str + " " + this.OperandToString(disassemblyFormat, 1);
            break;
        case AddressingMode.ZeroPageX:
            str = str + " " + this.OperandToString(disassemblyFormat, 1) + ",X";
            break;
        case AddressingMode.ZeroPageY:
            str = str + " " + this.OperandToString(disassemblyFormat, 1) + ",Y";
            break;
        default:
            break;
    }

    return str;
};

function Disassembler() {
    function MemoryReader() {
        this.Address = 0;
        this.ReadByte = function () {
            return null;
        };
    }

    this.Instruction = new DisassembledInstruction();
    this.LabelResolver = new LabelResolver();
}

/**
* @returns {DisassembledInstruction}
*/
Disassembler.prototype.Disassemble = function (memoryReader) {
    var address = memoryReader.Address;
    var operation = memoryReader.ReadByte();
    if (operation !== null) {
        var instruction = this.instructions[operation];

        var operands = new Array();
        var operandBytes = instruction.Bytes - 1;
        while (operandBytes--) {
            operands.push(memoryReader.ReadByte());
        }

        this.Instruction.Init(address, instruction, operands, this.LabelResolver);
        return this.Instruction;
    }

    return null;
};

Disassembler.prototype.instructions = [
    new Instruction(0x00, Mnemonic.BRK, AddressingMode.Implied, 1, 7, 0, 0, RW.None),
    new Instruction(0x01, Mnemonic.ORA, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0x02, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x03, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x04, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x05, Mnemonic.ORA, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0x06, Mnemonic.ASL, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.ReadWrite),
    new Instruction(0x07, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x08, Mnemonic.PHP, AddressingMode.Implied, 1, 3, 0, 0, RW.None),
    new Instruction(0x09, Mnemonic.ORA, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0x0A, Mnemonic.ASL, AddressingMode.Accumulator, 1, 2, 0, 0, RW.ReadWrite),
    new Instruction(0x0B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x0C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x0D, Mnemonic.ORA, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0x0E, Mnemonic.ASL, AddressingMode.Absolute, 3, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x0F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x10, Mnemonic.BPL, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0x11, Mnemonic.ORA, AddressingMode.IndirectY, 2, 5, 0, 0, RW.Read),
    new Instruction(0x12, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x13, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x14, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x15, Mnemonic.ORA, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0x16, Mnemonic.ASL, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x17, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x18, Mnemonic.CLC, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x19, Mnemonic.ORA, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0x1A, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x1B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x1C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x1D, Mnemonic.ORA, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0x1E, Mnemonic.ASL, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.ReadWrite),
    new Instruction(0x1F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x20, Mnemonic.JSR, AddressingMode.Absolute, 3, 6, 0, 0, RW.None),
    new Instruction(0x21, Mnemonic.AND, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0x22, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x23, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x24, Mnemonic.BIT, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0x25, Mnemonic.AND, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0x26, Mnemonic.ROL, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.ReadWrite),
    new Instruction(0x27, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x28, Mnemonic.PLP, AddressingMode.Implied, 1, 4, 0, 0, RW.None),
    new Instruction(0x29, Mnemonic.AND, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0x2A, Mnemonic.ROL, AddressingMode.Accumulator, 1, 2, 0, 0, RW.ReadWrite),
    new Instruction(0x2B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x2C, Mnemonic.BIT, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0x2D, Mnemonic.AND, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0x2E, Mnemonic.ROL, AddressingMode.Absolute, 3, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x2F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x30, Mnemonic.BMI, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0x31, Mnemonic.AND, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0x32, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x33, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x34, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x35, Mnemonic.AND, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0x36, Mnemonic.ROL, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x37, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x38, Mnemonic.SEC, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x39, Mnemonic.AND, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0x3A, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x3B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x3C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x3D, Mnemonic.AND, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0x3E, Mnemonic.ROL, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.ReadWrite),
    new Instruction(0x3F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x40, Mnemonic.RTI, AddressingMode.Implied, 1, 6, 0, 0, RW.None),
    new Instruction(0x41, Mnemonic.EOR, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0x42, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x43, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x44, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x45, Mnemonic.EOR, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0x46, Mnemonic.LSR, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.ReadWrite),
    new Instruction(0x47, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x48, Mnemonic.PHA, AddressingMode.Implied, 1, 3, 0, 0, RW.None),
    new Instruction(0x49, Mnemonic.EOR, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0x4A, Mnemonic.LSR, AddressingMode.Accumulator, 1, 2, 0, 0, RW.ReadWrite),
    new Instruction(0x4B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x4C, Mnemonic.JMP, AddressingMode.Absolute, 3, 3, 0, 0, RW.None),
    new Instruction(0x4D, Mnemonic.EOR, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0x4E, Mnemonic.LSR, AddressingMode.Absolute, 3, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x4F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x50, Mnemonic.BVC, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0x51, Mnemonic.EOR, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0x52, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x53, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x54, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x55, Mnemonic.EOR, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0x56, Mnemonic.LSR, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.ReadWrite),
    new Instruction(0x57, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x58, Mnemonic.CLI, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x59, Mnemonic.EOR, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0x5A, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x5B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x5C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x5D, Mnemonic.EOR, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0x5E, Mnemonic.LSR, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.ReadWrite),
    new Instruction(0x5F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x60, Mnemonic.RTS, AddressingMode.Implied, 1, 6, 0, 0, RW.None),
    new Instruction(0x61, Mnemonic.ADC, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0x62, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x63, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x64, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x65, Mnemonic.ADC, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0x66, Mnemonic.ROR, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.None),
    new Instruction(0x67, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x68, Mnemonic.PLA, AddressingMode.Implied, 1, 4, 0, 0, RW.None),
    new Instruction(0x69, Mnemonic.ADC, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0x6A, Mnemonic.ROR, AddressingMode.Accumulator, 1, 2, 0, 0, RW.None),
    new Instruction(0x6B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x6C, Mnemonic.JMP, AddressingMode.Indirect, 3, 5, 0, 0, RW.None),
    new Instruction(0x6D, Mnemonic.ADC, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0x6E, Mnemonic.ROR, AddressingMode.Absolute, 3, 6, 0, 0, RW.None),
    new Instruction(0x6F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x70, Mnemonic.BVS, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0x71, Mnemonic.ADC, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0x72, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x73, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x74, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x75, Mnemonic.ADC, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0x76, Mnemonic.ROR, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.None),
    new Instruction(0x77, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x78, Mnemonic.SEI, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x79, Mnemonic.ADC, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0x7A, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x7B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x7C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x7D, Mnemonic.ADC, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0x7E, Mnemonic.ROR, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.None),
    new Instruction(0x7F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x80, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x81, Mnemonic.STA, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Write),
    new Instruction(0x82, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x83, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x84, Mnemonic.STY, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Write),
    new Instruction(0x85, Mnemonic.STA, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Write),
    new Instruction(0x86, Mnemonic.STX, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Write),
    new Instruction(0x87, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x88, Mnemonic.DEY, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x89, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x8A, Mnemonic.TXA, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x8B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x8C, Mnemonic.STY, AddressingMode.Absolute, 3, 4, 0, 0, RW.Write),
    new Instruction(0x8D, Mnemonic.STA, AddressingMode.Absolute, 3, 4, 0, 0, RW.Write),
    new Instruction(0x8E, Mnemonic.STX, AddressingMode.Absolute, 3, 4, 0, 0, RW.Write),
    new Instruction(0x8F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x90, Mnemonic.BCC, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0x91, Mnemonic.STA, AddressingMode.IndirectY, 2, 6, 0, 0, RW.Write),
    new Instruction(0x92, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x93, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x94, Mnemonic.STY, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Write),
    new Instruction(0x95, Mnemonic.STA, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Write),
    new Instruction(0x96, Mnemonic.STX, AddressingMode.ZeroPageY, 2, 4, 0, 0, RW.Write),
    new Instruction(0x97, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x98, Mnemonic.TYA, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x99, Mnemonic.STA, AddressingMode.AbsoluteY, 3, 5, 0, 0, RW.Write),
    new Instruction(0x9A, Mnemonic.TXS, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0x9B, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x9C, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x9D, Mnemonic.STA, AddressingMode.AbsoluteX, 3, 5, 0, 0, RW.Write),
    new Instruction(0x9E, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0x9F, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xA0, Mnemonic.LDY, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xA1, Mnemonic.LDA, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0xA2, Mnemonic.LDX, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xA3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xA4, Mnemonic.LDY, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xA5, Mnemonic.LDA, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xA6, Mnemonic.LDX, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xA7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xA8, Mnemonic.TAY, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xA9, Mnemonic.LDA, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xAA, Mnemonic.TAX, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xAB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xAC, Mnemonic.LDY, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xAD, Mnemonic.LDA, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xAE, Mnemonic.LDX, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xAF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xB0, Mnemonic.BCS, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0xB1, Mnemonic.LDA, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0xB2, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xB3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xB4, Mnemonic.LDY, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0xB5, Mnemonic.LDA, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0xB6, Mnemonic.LDX, AddressingMode.ZeroPageY, 2, 4, 0, 0, RW.Read),
    new Instruction(0xB7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xB8, Mnemonic.CLV, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xB9, Mnemonic.LDA, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0xBA, Mnemonic.TSX, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xBB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xBC, Mnemonic.LDY, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0xBD, Mnemonic.LDA, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0xBE, Mnemonic.LDX, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0xBF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xC0, Mnemonic.CPY, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xC1, Mnemonic.CMP, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0xC2, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xC3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xC4, Mnemonic.CPY, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xC5, Mnemonic.CMP, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xC6, Mnemonic.DEC, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.ReadWrite),
    new Instruction(0xC7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xC8, Mnemonic.INY, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xC9, Mnemonic.CMP, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xCA, Mnemonic.DEX, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xCB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xCC, Mnemonic.CPY, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xCD, Mnemonic.CMP, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xCE, Mnemonic.DEC, AddressingMode.Absolute, 3, 6, 0, 0, RW.ReadWrite),
    new Instruction(0xCF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xD0, Mnemonic.BNE, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0xD1, Mnemonic.CMP, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0xD2, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xD3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xD4, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xD5, Mnemonic.CMP, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0xD6, Mnemonic.DEC, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.ReadWrite),
    new Instruction(0xD7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xD8, Mnemonic.CLD, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xD9, Mnemonic.CMP, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0xDA, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xDB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xDC, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xDD, Mnemonic.CMP, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0xDE, Mnemonic.DEC, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.ReadWrite),
    new Instruction(0xDF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xE0, Mnemonic.CPX, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xE1, Mnemonic.SBC, AddressingMode.IndirectX, 2, 6, 0, 0, RW.Read),
    new Instruction(0xE2, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xE3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xE4, Mnemonic.CPX, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xE5, Mnemonic.SBC, AddressingMode.ZeroPage, 2, 3, 0, 0, RW.Read),
    new Instruction(0xE6, Mnemonic.INC, AddressingMode.ZeroPage, 2, 5, 0, 0, RW.ReadWrite),
    new Instruction(0xE7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xE8, Mnemonic.INX, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xE9, Mnemonic.SBC, AddressingMode.Immediate, 2, 2, 0, 0, RW.Read),
    new Instruction(0xEA, Mnemonic.NOP, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xEB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xEC, Mnemonic.CPX, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xED, Mnemonic.SBC, AddressingMode.Absolute, 3, 4, 0, 0, RW.Read),
    new Instruction(0xEE, Mnemonic.INC, AddressingMode.Absolute, 3, 6, 0, 0, RW.ReadWrite),
    new Instruction(0xEF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xF0, Mnemonic.BEQ, AddressingMode.Relative, 2, 2, 1, 1, RW.None),
    new Instruction(0xF1, Mnemonic.SBC, AddressingMode.IndirectY, 2, 5, 1, 0, RW.Read),
    new Instruction(0xF2, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xF3, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xF4, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xF5, Mnemonic.SBC, AddressingMode.ZeroPageX, 2, 4, 0, 0, RW.Read),
    new Instruction(0xF6, Mnemonic.INC, AddressingMode.ZeroPageX, 2, 6, 0, 0, RW.ReadWrite),
    new Instruction(0xF7, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xF8, Mnemonic.SED, AddressingMode.Implied, 1, 2, 0, 0, RW.None),
    new Instruction(0xF9, Mnemonic.SBC, AddressingMode.AbsoluteY, 3, 4, 1, 0, RW.Read),
    new Instruction(0xFA, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xFB, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xFC, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None),
    new Instruction(0xFD, Mnemonic.SBC, AddressingMode.AbsoluteX, 3, 4, 1, 0, RW.Read),
    new Instruction(0xFE, Mnemonic.INC, AddressingMode.AbsoluteX, 3, 7, 0, 0, RW.ReadWrite),
    new Instruction(0xFF, Mnemonic.UND, AddressingMode.Implied, 1, 1, 0, 0, RW.None)
];

function LabelResolver() {
}

LabelResolver.prototype.AddressToLabel = function (address, rw) {
    if (address & 0x1000) {
        // CART (upper 4K)
        return this.CARTResolver(address, rw);
    } else {
        if (address & 0x80) {
            if (address & 0x200) {
                // REGISTERS (A10=1)
                return this.RIOTResolver(address, rw);
            } else {
                // RAM (A10=0)
                return this.RAMResolver(address, rw);
            }
        } else {
            // TIA (lower half of LSB)
            return this.TIAResolver(address, rw);
        }
    }
};

LabelResolver.prototype.CARTResolver = function (address, rw) {
    if (address === 0x1FFE) {
        return "IRQ_VECTOR";
    } else if (address === 0x1FFF) {
        return "IRQ_VECTOR_MSB";
    } else if (address === 0x1FFC) {
        return "RESET_VECTOR";
    } else if (address === 0x1FFD) {
        return "RESET_VECTOR_MSB";
    } else if (address === 0x1FFA) {
        return "NMI_VECTOR";
    } else if (address === 0x1FFB) {
        return "NMI_VECTOR_MSB";
    } else if (address >= 0x1FF6 && address <= 0x1FF9) {
        return "BANK_SWITCH_" + (address & 0x000F).toString(16).toUpperCase();
    }
};

LabelResolver.prototype.RAMResolver = function (address, rw) {
    return "RAM_" + (address & 0xFF).toString(16).toUpperCase();
};

LabelResolver.prototype.RIOTResolver = function (address, rw) {
    if (rw & RW.Read) {
        switch (address & 0x7) {
            case 0:
                return "SWCHA";
            case 1:
                return "SWACNT";
            case 2:
                return "SWCHB";
            case 3:
                return "SWBCNT";
            case 4:
                return "INTIM";
            case 5:
                return "TIMSTAT";
            case 6:
                return "INTIM2";
            case 7:
                return "TIMSTAT2";
            default:
                return "IO_" + (address & 0xFF).toString(16).toUpperCase();
        }
    } else if (rw & RW.Write) {
        switch (address & 0x7) {
            case 0:
                return "SWCHA";
            case 1:
                return "SWACNT";
            case 2:
                return "SWCHB";
            case 3:
                return "SWBCNT";
            case 4:
                return "TIM1T";
            case 5:
                return "TIM8T";
            case 6:
                return "TIM64T";
            case 7:
                return "T1024T";
            default:
                return "IO_" + (address & 0xFF).toString(16).toUpperCase();
        }
    }
};

LabelResolver.prototype.TIAResolver = function (address, rw) {
    if (rw & RW.Write) {
        switch (address & 0x3F) {
            case 0x00:
                return "VSYNC";
            case 0x01:
                return "VBLANK";
            case 0x02:
                return "WSYNC";
            case 0x03:
                return "RSYNC";
            case 0x04:
                return "NUSIZ0";
            case 0x05:
                return "NUSIZ1";
            case 0x06:
                return "COLUP0";
            case 0x07:
                return "COLUP1";
            case 0x08:
                return "COLUPF";
            case 0x09:
                return "COLUBK";
            case 0x0A:
                return "CTRLPF";
            case 0x0B:
                return "REFP0";
            case 0x0C:
                return "REFP1";
            case 0x0D:
                return "PF0";
            case 0x0E:
                return "PF1";
            case 0x0F:
                return "PF2";
            case 0x10:
                return "RESP0";
            case 0x11:
                return "RESP1";
            case 0x12:
                return "RESM0";
            case 0x13:
                return "RESM1";
            case 0x14:
                return "RESBL";
            case 0x15:
                return "AUDC0";
            case 0x16:
                return "AUDC1";
            case 0x17:
                return "AUDF0";
            case 0x18:
                return "AUDF1";
            case 0x19:
                return "AUDV0";
            case 0x1A:
                return "AUDV1";
            case 0x1B:
                return "GRP0";
            case 0x1C:
                return "GRP1";
            case 0x1D:
                return "ENAM0";
            case 0x1E:
                return "ENAM1";
            case 0x1F:
                return "ENABL";
            case 0x20:
                return "HMP0";
            case 0x21:
                return "HMP1";
            case 0x22:
                return "HMM0";
            case 0x23:
                return "HMM1";
            case 0x24:
                return "HMBL";
            case 0x25:
                return "VDELP0";
            case 0x26:
                return "VDELP1";
            case 0x27:
                return "VDELBL";
            case 0x28:
                return "RESMP0";
            case 0x29:
                return "RESMP1";
            case 0x2A:
                return "HMOVE";
            case 0x2B:
                return "HMCLR";
            case 0x2C:
                return "CXCLR";
            case 0x2D:
                return "UNDEFO_2D";
            case 0x2E:
                return "UNDEFO_2E";
            case 0x2F:
                return "UNDEFO_2F";
            case 0x30:
                return "UNDEFO_30";
            case 0x31:
                return "UNDEFO_31";
            case 0x32:
                return "UNDEFO_32";
            case 0x33:
                return "UNDEFO_33";
            case 0x34:
                return "UNDEFO_34";
            case 0x35:
                return "UNDEFO_35";
            case 0x36:
                return "UNDEFO_36";
            case 0x37:
                return "UNDEFO_37";
            case 0x38:
                return "UNDEFO_38";
            case 0x39:
                return "UNDEFO_39";
            case 0x3A:
                return "UNDEFO_3A";
            case 0x3B:
                return "UNDEFO_3B";
            case 0x3C:
                return "UNDEFO_3C";
            case 0x3D:
                return "UNDEFO_3D";
            case 0x3E:
                return "UNDEFO_3E";
            case 0x3F:
                return "UNDEFO_3F";
            default:
                return "TIA_UNDEFO";
        }
    } else if (rw & RW.Read) {
        switch (address & 0x0F) {
            case 0x00:
                return "CXM0P";
            case 0x01:
                return "CXM1P";
            case 0x02:
                return "CXP0FB";
            case 0x03:
                return "CXP1FB";
            case 0x04:
                return "CXM0FB";
            case 0x05:
                return "CXM1FB";
            case 0x06:
                return "CXBLPF";
            case 0x07:
                return "CXPPMM";
            case 0x08:
                return "INPT0";
            case 0x09:
                return "INPT1";
            case 0x0A:
                return "INPT2";
            case 0x0B:
                return "INPT3";
            case 0x0C:
                return "INPT4";
            case 0x0D:
                return "INPT5";
            case 0x0E:
                return "UNDEFI_E";
            case 0x0F:
                return "UNDEFI_F";
            default:
                return "TIA_UNDEFI";
        }
    }
};
//# sourceMappingURL=disassembler.js.map
