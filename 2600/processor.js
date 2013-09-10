/// <reference>Dissasembler.ts</reference>
/// <reference>Memory.ts</reference>
function MemoryReader(processor) {
    this.Processor = processor;
    this.Address = processor.PC;

    this.ReadByte = function () {
        var b = this.Processor.memory.ReadByte(this.Address);
        this.Address = (this.Address + 1) & 0xFFFF;
        return b;
    };
}

// Implied Addressing Mode
var Implied = (function () {
    function Implied(processor) {
        this.Processor = processor;
    }
    return Implied;
})();

// Absolute Addressing Mode
var Absolute = (function () {
    function Absolute(processor) {
        this.Processor = processor;
    }
    Absolute.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = operand;
        return this.Processor.ReadByte(address);
    };

    Absolute.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var address = operand;
        this.Processor.WriteByte(address, value);
    };

    Absolute.prototype.GetAddress = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = operand;
        return address;
    };
    return Absolute;
})();

// AbsoluteX Addressing Mode
var AbsoluteX = (function () {
    function AbsoluteX(processor) {
        this.Processor = processor;
    }
    AbsoluteX.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = (operand + x) & 0xFFFF;
        return this.Processor.ReadByte(address);
    };

    AbsoluteX.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = (operand + x) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    };
    return AbsoluteX;
})();

// AbsoluteY Addressing Mode
var AbsoluteY = (function () {
    function AbsoluteY(processor) {
        this.Processor = processor;
    }
    AbsoluteY.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (operand + y) & 0xFFFF;
        return this.Processor.ReadByte(address);
    };

    AbsoluteY.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (operand + y) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    };
    return AbsoluteY;
})();

// Accumulator Addressing Mode
var Accumulator = (function () {
    function Accumulator(processor) {
        this.Processor = processor;
    }
    Accumulator.prototype.GetValue = function () {
        return this.Processor.A;
    };

    Accumulator.prototype.SetValue = function (value) {
        this.Processor.A = value;
    };
    return Accumulator;
})();

// Immediate Addressing Mode
var Immediate = (function () {
    function Immediate(processor) {
        this.Processor = processor;
    }
    Immediate.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        return operand;
    };
    return Immediate;
})();

// Indirect Addressing Mode
var Indirect = (function () {
    function Indirect(processor) {
        this.Processor = processor;
    }
    Indirect.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = this.Processor.ReadWord(operand);
        return this.Processor.ReadByte(address);
    };

    Indirect.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var address = this.Processor.ReadWord(operand);
        this.Processor.WriteByte(address, value);
    };

    Indirect.prototype.GetAddress = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = this.Processor.ReadWord(operand);
        return address;
    };
    return Indirect;
})();

// IndirectX Addressing Mode
var IndirectX = (function () {
    function IndirectX(processor) {
        this.Processor = processor;
    }
    IndirectX.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = this.Processor.ReadWord((operand + x) & 0xFF);
        return this.Processor.ReadByte(address);
    };

    IndirectX.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = this.Processor.ReadWord((operand + x) & 0xFF);
        this.Processor.WriteByte(address, value);
    };
    return IndirectX;
})();

// IndirectY Addressing Mode
var IndirectY = (function () {
    function IndirectY(processor) {
        this.Processor = processor;
    }
    IndirectY.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (this.Processor.ReadWord(operand) + y) & 0xFFFF;
        return this.Processor.ReadByte(address);
    };

    IndirectY.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (this.Processor.ReadWord(operand) + y) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    };
    return IndirectY;
})();

// Relative Addressing Mode,
var Relative = (function () {
    function Relative(processor) {
        this.Processor = processor;
    }
    Relative.prototype.GetAddress = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = this.Processor.PC + (operand - ((operand & 0x80) << 1));
        return address;
    };
    return Relative;
})();

// ZeroPage Addressing Mode
var ZeroPage = (function () {
    function ZeroPage(processor) {
        this.Processor = processor;
    }
    ZeroPage.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var address = operand;
        return this.Processor.ReadByte(address);
    };

    ZeroPage.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var address = operand;
        this.Processor.WriteByte(address, value);
    };
    return ZeroPage;
})();

// ZeroPageX Addressing Mode
var ZeroPageX = (function () {
    function ZeroPageX(processor) {
        this.Processor = processor;
    }
    ZeroPageX.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = (operand + x) & 0xFF;
        return this.Processor.ReadByte(address);
    };

    ZeroPageX.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var x = this.Processor.X;
        var address = (operand + x) & 0xFF;
        this.Processor.WriteByte(address, value);
    };
    return ZeroPageX;
})();

// ZeroPageY Addressing Mode
var ZeroPageY = (function () {
    function ZeroPageY(processor) {
        this.Processor = processor;
    }
    ZeroPageY.prototype.GetValue = function () {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (operand + y) & 0xFF;
        return this.Processor.ReadByte(address);
    };

    ZeroPageY.prototype.SetValue = function (value) {
        var operand = this.Processor.Instruction.Operand;
        var y = this.Processor.Y;
        var address = (operand + y) & 0xFF;
        this.Processor.WriteByte(address, value);
    };
    return ZeroPageY;
})();

var m6507 = (function () {
    function m6507(theCart) {
        this.PC = 0;
        this.S = 0xFF;
        this.A = 0;
        this.X = 0;
        this.Y = 0;

        this.N = 0;
        this.V = 0;
        this.U = 1;
        this.B = 0;
        this.D = 0;
        this.I = 0;
        this.Z = 0;
        this.C = 0;

        this.memory = new Memory(theCart);
        this.Instruction = null;
        this.Cycles = 0;
        this.InstructionCycles = 0;
        this.Disassembler = new Disassembler();
        this.ExecutionReader = new MemoryReader(this);
        this.LastWrites = new Array();
        this.LastReads = new Array();
        this.PC = this.ReadWord(0xFFFC);

        this.Instructions = [
            this.UND,
            this.ADC,
            this.AND,
            this.ASL,
            this.BCC,
            this.BCS,
            this.BEQ,
            this.BIT,
            this.BMI,
            this.BNE,
            this.BPL,
            this.BRK,
            this.BVC,
            this.BVS,
            this.CLC,
            this.CLD,
            this.CLI,
            this.CLV,
            this.CMP,
            this.CPX,
            this.CPY,
            this.DEC,
            this.DEX,
            this.DEY,
            this.EOR,
            this.INC,
            this.INX,
            this.INY,
            this.JMP,
            this.JSR,
            this.LDA,
            this.LDX,
            this.LDY,
            this.LSR,
            this.NOP,
            this.ORA,
            this.PHA,
            this.PHP,
            this.PLA,
            this.PLP,
            this.ROL,
            this.ROR,
            this.RTI,
            this.RTS,
            this.SBC,
            this.SEC,
            this.SED,
            this.SEI,
            this.STA,
            this.STX,
            this.STY,
            this.TAX,
            this.TAY,
            this.TSX,
            this.TXA,
            this.TXS,
            this.TYA
        ];

        this.AddressingModes = [
            new Implied(this),
            new Absolute(this),
            new AbsoluteX(this),
            new AbsoluteY(this),
            new Accumulator(this),
            new Immediate(this),
            new Indirect(this),
            new IndirectX(this),
            new IndirectY(this),
            new Relative(this),
            new ZeroPage(this),
            new ZeroPageX(this),
            new ZeroPageY(this)
        ];
    }
    m6507.prototype.GetAllFlags = function () {
        var flags = 0;
        flags = flags | this.N;
        flags = flags << 1;
        flags = flags | this.V;
        flags = flags << 1;
        flags = flags | this.U;
        flags = flags << 1;
        flags = flags | this.B;
        flags = flags << 1;
        flags = flags | this.D;
        flags = flags << 1;
        flags = flags | this.I;
        flags = flags << 1;
        flags = flags | this.Z;
        flags = flags << 1;
        flags = flags | this.C;
        return flags;
    };

    m6507.prototype.SetAllFlags = function (flags) {
        this.C = flags & 0x01;
        flags = flags >>> 1;
        this.Z = flags & 0x01;
        flags = flags >>> 1;
        this.I = flags & 0x01;
        flags = flags >>> 1;
        this.D = flags & 0x01;
        flags = flags >>> 1;
        this.B = flags & 0x01;
        flags = flags >>> 1;

        // Leave this.U (unused flag) set to 1
        flags = flags >>> 1;
        this.V = flags & 0x01;
        flags = flags >>> 1;
        this.N = flags & 0x01;
    };

    m6507.prototype.FlagsToString = function () {
        var str = "C:" + this.C.toString(16);
        str = str + " Z:" + this.Z.toString(16);
        str = str + " I:" + this.I.toString(16);
        str = str + " D:" + this.D.toString(16);
        str = str + " B:" + this.B.toString(16);
        str = str + " V:" + this.V.toString(16);
        str = str + " N:" + this.N.toString(16);
        return str;
    };

    m6507.prototype.RegistersToString = function () {
        var str = "A:" + this.A.toString(16);
        str = str + " X:" + this.X.toString(16);
        str = str + " Y:" + this.Y.toString(16);
        str = str + " S:" + this.S.toString(16);
        str = str + " PC:" + this.PC.toString(16);
        return str;
    };

    m6507.prototype.Execute = function () {
        this.FetchInstruction();
        this.ExecuteInstruction();
    };

    m6507.prototype.FetchInstruction = function () {
        this.ExecutionReader.Address = this.PC;
        this.Instruction = this.Disassembler.Disassemble(this.ExecutionReader);
        //console.log(this.Instruction.toString());
    };

    m6507.prototype.ExecuteInstruction = function () {
        this.PC += this.Instruction.Bytes;
        this.AddressMode = this.AddressingModes[this.Instruction.AddressingMode];
        this.InstructionCycles = this.Instruction.Cycles;
        this.Instructions[this.Instruction.Mnemonic].call(this);
        this.UpdateCycles(this.InstructionCycles);
    };

    m6507.prototype.ExecFrame = function () {
        // 19912 machine cycles in a frame 1/60th of a  second
        this.ExecCycles(19912);
    };

    m6507.prototype.ExecCycles = function (cycles) {
        var endCycles = this.Cycles + cycles;
        while (this.Cycles < endCycles) {
            this.ExecutionReader.Address = this.PC;
            this.Instruction = this.Disassembler.Disassemble(this.ExecutionReader);

            //console.log(this.Instruction.toString() + "    " + this.RegistersToString() + "    " + this.FlagsToString());
            this.PC += this.Instruction.Bytes;
            this.AddressMode = this.AddressingModes[this.Instruction.AddressingMode];
            this.InstructionCycles = this.Instruction.Cycles;
            this.Instructions[this.Instruction.Mnemonic].call(this);
            this.UpdateCycles(this.InstructionCycles);
        }
    };

    m6507.prototype.ExecTime = function (milliseconds) {
        // 1194 cycles per millisecond
        this.ExecCycles(milliseconds * 1194);
    };

    m6507.prototype.UpdateCycles = function (cycles) {
        var addCycles = this.memory.tia.Step(cycles);
        this.memory.riot.Step(cycles + addCycles);
        this.Cycles += (cycles + addCycles);
    };

    m6507.prototype.GetLastReadWrite = function () {
        var str = "";
        while (this.LastWrites.length > 0) {
            str = "W:" + this.LastWrites.pop().toString(16) + "=" + this.LastWrites.pop().toString(16) + " " + str;
        }
        while (this.LastReads.length > 0) {
            str = "R:" + this.LastReads.pop().toString(16) + "=" + this.LastReads.pop().toString(16) + " " + str;
        }
        return str;
    };

    m6507.prototype.WriteByte = function (address, value) {
        /*
        if(value > 0xFF || value < 0) {
        window.alert("non unsigned byte value");
        }
        */
        this.memory.WriteByte(address, value);
        /*
        if(address >= 0x80) {
        var verify = this.memory.ReadByte(address);
        if(verify !== value) {
        window.alert("memory verification failed.")
        }
        }
        */
        /*
        this.LastWrites.push(value);
        this.LastWrites.push(address);
        */
    };

    m6507.prototype.ReadByte = function (address) {
        var value = this.memory.ReadByte(address);

        /*
        this.LastReads.push(value);
        this.LastReads.push(address);
        */
        return value;
    };

    m6507.prototype.ReadWord = function (address) {
        var lsb = this.ReadByte(address);
        var msb = this.ReadByte((address + 1) & 0xFFFF);
        var value = ((msb << 8) | lsb);

        /*
        this.LastReads.push(value);
        this.LastReads.push(address);
        */
        return value;
    };

    m6507.prototype.WriteWord = function (address, value) {
        var msb = (value & 0xFF00) >>> 8;
        var lsb = value & 0xFF;
        this.WriteByte(address, lsb);
        this.WriteByte(address + 1, msb);
        /*
        this.LastWrites.push(value);
        this.LastWrites.push(address);
        */
    };

    m6507.prototype.PushByte = function (value) {
        this.WriteByte(0x100 + this.S, value);
        this.S = (this.S - 1) & 0xFF;
    };

    m6507.prototype.PushWord = function (value) {
        var msb = (value >>> 8) & 0xFF;
        var lsb = value & 0xFF;
        this.PushByte(msb);
        this.PushByte(lsb);
    };

    m6507.prototype.PopByte = function () {
        this.S = (this.S + 1) & 0xFF;
        return this.ReadByte(0x100 + this.S);
    };

    m6507.prototype.PopWord = function () {
        var lsb = this.PopByte();
        var msb = this.PopByte();
        var value = (msb << 8) | lsb;
        return value;
    };

    // ADC add with carry
    m6507.prototype.ADC = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var carry = this.C;

        if (this.D) {
            var dvalue = ((value >>> 4) * 10) + (value & 0xF);
            var dreg = ((reg >>> 4) * 10) + (reg & 0xF);
            var dsum = dvalue + dreg + carry;
            if (dsum > 99) {
                this.C = 1;
                dsum -= 100;
            } else {
                this.C = 0;
            }
            var dresult = ((dsum / 10) << 4) | (dsum % 10);
            if (dresult > 127) {
                this.V = 1;
            } else {
                this.V = 0;
            }
            if (dresult === 0) {
                this.Z = 1;
            } else {
                this.Z = 0;
            }
            if (dresult & 0x80) {
                this.N = 1;
            } else {
                this.N = 0;
            }
            this.A = dresult;
        } else {
            var sum = reg + value + carry;
            var result = sum & 0xFF;

            if (sum > 127) {
                this.V = 1;
            } else {
                this.V = 0;
            }
            if (sum > 0xFF) {
                this.C = 1;
            } else {
                this.C = 0;
            }
            if (result === 0) {
                this.Z = 1;
            } else {
                this.Z = 0;
            }
            if (result & 0x80) {
                this.N = 1;
            } else {
                this.N = 0;
            }
            this.A = result;
        }
    };

    // AND and (with accumulator)
    m6507.prototype.AND = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg & value) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.A = result;
    };

    // ASL arithmetic shift left
    m6507.prototype.ASL = function () {
        var value = this.AddressMode.GetValue();
        var result = (value << 1) & 0xFF;
        if (value & 0x80) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // BCC branch on carry clear
    m6507.prototype.BCC = function () {
        if (this.C === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BCS branch on carry set
    m6507.prototype.BCS = function () {
        if (this.C === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BEQ branch on equal (zero set)
    m6507.prototype.BEQ = function () {
        if (this.Z === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BIT bit test
    m6507.prototype.BIT = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg & value) & 0xFF;
        if (value & 0x40) {
            this.V = 1;
        } else {
            this.V = 0;
        }
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
    };

    // BMI branch on minus (negative set)
    m6507.prototype.BMI = function () {
        if (this.N === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BNE branch on not equal (zero clear)
    m6507.prototype.BNE = function () {
        if (this.Z === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BPL branch on plus (negative clear)
    m6507.prototype.BPL = function () {
        if (this.N === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BRK interrupt
    m6507.prototype.BRK = function () {
        this.B = 1;
        this.PushWord(this.PC);
        this.PushByte(this.GetAllFlags());
        this.I = 1;
        this.PC = this.ReadWord(0xFFFE);
    };

    // BVC branch on overflow clear
    m6507.prototype.BVC = function () {
        if (this.V === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // BVS branch on overflow set
    m6507.prototype.BVS = function () {
        if (this.V === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    };

    // CLC clear carry
    m6507.prototype.CLC = function () {
        this.C = 0;
    };

    // CLD clear decimal
    m6507.prototype.CLD = function () {
        this.D = 0;
    };

    // CLI clear interrupt disable
    m6507.prototype.CLI = function () {
        this.I = 0;
    };

    // CLV clear overflow
    m6507.prototype.CLV = function () {
        this.V = 0;
    };

    // CMP compare (with accumulator)
    m6507.prototype.CMP = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var difference = reg - value;
        if (difference === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (difference >= 0) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (difference & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
    };

    // CPX compare with X
    m6507.prototype.CPX = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.X;
        var difference = reg - value;
        if (difference === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (difference >= 0) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (difference & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
    };

    // CPY compare with Y
    m6507.prototype.CPY = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.Y;
        var difference = reg - value;
        if (difference === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (difference >= 0) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (difference & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
    };

    // DEC decrement
    m6507.prototype.DEC = function () {
        var value = this.AddressMode.GetValue();
        var result = ((0x100 | value) - 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // DEX decrement X
    m6507.prototype.DEX = function () {
        var reg = this.X;
        var result = ((0x100 | reg) - 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.X = result;
    };

    // DEY decrement Y
    m6507.prototype.DEY = function () {
        var reg = this.Y;
        var result = ((0x100 | reg) - 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.Y = result;
    };

    // EOR exclusive or (with accumulator)
    m6507.prototype.EOR = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg ^ value) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.A = result;
    };

    // INC increment
    m6507.prototype.INC = function () {
        var value = this.AddressMode.GetValue();
        var result = (value + 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // INX increment X
    m6507.prototype.INX = function () {
        var reg = this.X;
        var result = (reg + 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.X = result;
    };

    // INY increment Y
    m6507.prototype.INY = function () {
        var reg = this.Y;
        var result = (reg + 1) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.Y = result;
    };

    // JMP jump
    m6507.prototype.JMP = function () {
        var address = this.AddressMode.GetAddress();
        this.PC = address;
    };

    // JSR jump subroutine
    m6507.prototype.JSR = function () {
        // pushes next instruction address -1 to the stack and jumps to
        //push hi push lo
        var address = this.AddressMode.GetAddress();
        var ret = (this.PC - 1) & 0xFFFF;
        this.PushWord(ret);
        this.PC = address;
    };

    // LDA load accumulator
    m6507.prototype.LDA = function () {
        var value = this.AddressMode.GetValue();
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.A = value;
    };

    // LDX load X
    m6507.prototype.LDX = function () {
        var value = this.AddressMode.GetValue();
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.X = value;
    };

    // LDY load Y
    m6507.prototype.LDY = function () {
        var value = this.AddressMode.GetValue();
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.Y = value;
    };

    // LSR logical shift right
    m6507.prototype.LSR = function () {
        var value = this.AddressMode.GetValue();
        var result = (value >>> 1) & 0xFF;
        if (value & 0x01) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }

        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // NOP no operation
    m6507.prototype.NOP = function () {
    };

    // ORA or with accumulator
    m6507.prototype.ORA = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg | value) & 0xFF;
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.A = result;
    };

    // PHA push accumulator
    m6507.prototype.PHA = function () {
        this.PushByte(this.A);
    };

    // PHP push processor status (SR)
    m6507.prototype.PHP = function () {
        var status = this.GetAllFlags();
        this.PushByte(status);
    };

    // PLA pull accumulator
    m6507.prototype.PLA = function () {
        var value = this.PopByte();
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        this.A = value;
    };

    // PLP pull processor status (SR)
    m6507.prototype.PLP = function () {
        var status = this.PopByte();
        this.SetAllFlags(status);
    };

    // ROL rotate left
    m6507.prototype.ROL = function () {
        var value = this.AddressMode.GetValue();
        var C = this.C;
        var result = ((value << 1) | C) & 0xFF;
        if (value & 0x80) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // ROR rotate right
    m6507.prototype.ROR = function () {
        var value = this.AddressMode.GetValue();
        var C = this.C;
        var result = ((C << 7) | (value >>> 1)) & 0xFF;
        if (value & 0x01) {
            this.C = 1;
        } else {
            this.C = 0;
        }
        if (result & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (result === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.AddressMode.SetValue(result);
    };

    // RTI return from interrupt
    m6507.prototype.RTI = function () {
        var status = this.PopByte();

        // pop lo pop hi
        var address = this.PopWord();
        this.SetAllFlags(status);
        this.PC = address;
    };

    // RTS return from subroutine
    m6507.prototype.RTS = function () {
        var ret = this.PopWord();

        // the address stored on the stack has 1 subtracted from it
        var address = (ret + 1) & 0xFFFF;
        this.PC = address;
    };

    // SBC subtract with carry
    m6507.prototype.SBC = function () {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var borrow = this.C ^ 0x01;

        if (this.D) {
            var dvalue = ((value >>> 4) * 10) + (value & 0xF);
            var dreg = ((reg >>> 4) * 10) + (reg & 0xF);
            var ddifference = dreg - borrow - dvalue;
            if (ddifference < 0) {
                this.C = 0;
                ddifference += 100;
            } else {
                this.C = 1;
            }
            var dresult = ((ddifference / 10) << 4) | (ddifference % 10);
            if (dresult > 127) {
                this.V = 1;
            } else {
                this.V = 0;
            }
            if (dresult === 0) {
                this.Z = 1;
            } else {
                this.Z = 0;
            }
            if (dresult & 0x80) {
                this.N = 1;
            } else {
                this.N = 0;
            }
            this.A = dresult;
        } else {
            var difference = reg - borrow - value;
            var result = difference & 0xFF;

            if (difference < -128) {
                this.V = 1;
            } else {
                this.V = 0;
            }
            if (difference >= 0) {
                this.C = 1;
            } else {
                this.C = 0;
            }
            if (result === 0) {
                this.Z = 1;
            } else {
                this.Z = 0;
            }
            if (result & 0x80) {
                this.N = 1;
            } else {
                this.N = 0;
            }
            this.A = result;
        }
    };

    // SEC set carry
    m6507.prototype.SEC = function () {
        this.C = 1;
    };

    // SED set decimal
    m6507.prototype.SED = function () {
        this.D = 1;
    };

    // SEI set interrupt disable
    m6507.prototype.SEI = function () {
        this.I = 1;
    };

    // STA store accumulator
    m6507.prototype.STA = function () {
        var value = this.A;
        this.AddressMode.SetValue(value);
    };

    // STX store X
    m6507.prototype.STX = function () {
        var value = this.X;
        this.AddressMode.SetValue(value);
    };

    // STY store Y
    m6507.prototype.STY = function () {
        var value = this.Y;
        this.AddressMode.SetValue(value);
    };

    // TAX transfer accumulator to X
    m6507.prototype.TAX = function () {
        var value = this.A;
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.X = value;
    };

    // TAY transfer accumulator to Y
    m6507.prototype.TAY = function () {
        var value = this.A;
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.Y = value;
    };

    // TSX transfer stack pointer to X
    m6507.prototype.TSX = function () {
        var value = this.S;

        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.X = value;
    };

    // TXA transfer X to accumulator
    m6507.prototype.TXA = function () {
        var value = this.X;
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.A = value;
    };

    // TXS transfer X to stack pointer
    m6507.prototype.TXS = function () {
        var value = this.X;

        // conflicting info
        //if(value & 0x80) { this.N = 1; } else { this.N = 0; }
        //if(value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.S = value;
    };

    // TYA transfer Y to accumulator
    m6507.prototype.TYA = function () {
        var value = this.Y;
        if (value & 0x80) {
            this.N = 1;
        } else {
            this.N = 0;
        }
        if (value === 0) {
            this.Z = 1;
        } else {
            this.Z = 0;
        }
        this.A = value;
    };

    // Undefined
    m6507.prototype.UND = function () {
        //alert("Undefined instruction used");
    };
    return m6507;
})();
//# sourceMappingURL=processor.js.map
