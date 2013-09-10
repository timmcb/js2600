/// <reference>Dissasembler.ts</reference>
/// <reference>Memory.ts</reference>

interface AddressMode {
    GetValue?: () => number;
    SetValue?: (value: number) => void;
    GetAddress?: () => number;
}

function MemoryReader(processor) {
    this.Processor = processor;
    this.Address = processor.PC;

    this.ReadByte = function () {
        var b = this.Processor.memory.ReadByte(this.Address);
        this.Address = (this.Address + 1) & 0xFFFF;
        return b;
    }
}

// Implied Addressing Mode
class Implied implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }
}

// Absolute Addressing Mode
class Absolute implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = operand;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = operand;
        this.Processor.WriteByte(address, value);
    }

    public GetAddress(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = operand;
        return address;
    }
}

// AbsoluteX Addressing Mode
class AbsoluteX implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = (operand + x) & 0xFFFF;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = (operand + x) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    }
}

// AbsoluteY Addressing Mode
class AbsoluteY implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (operand + y) & 0xFFFF;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (operand + y) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    }
}

// Accumulator Addressing Mode
class Accumulator implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        return this.Processor.A;
    }

    public SetValue(value: number): void {
        this.Processor.A = value;
    }
}

// Immediate Addressing Mode
class Immediate implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        return operand;
    }
}

// Indirect Addressing Mode
class Indirect implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = this.Processor.ReadWord(operand);
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = this.Processor.ReadWord(operand);
        this.Processor.WriteByte(address, value);
    }

    public GetAddress(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = this.Processor.ReadWord(operand);
        return address;
    }
}
    
// IndirectX Addressing Mode
class IndirectX implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = this.Processor.ReadWord((operand + x) & 0xFF);
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = this.Processor.ReadWord((operand + x) & 0xFF);
        this.Processor.WriteByte(address, value);
    }
}
    
// IndirectY Addressing Mode
class IndirectY implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (this.Processor.ReadWord(operand) + y) & 0xFFFF;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (this.Processor.ReadWord(operand) + y) & 0xFFFF;
        this.Processor.WriteByte(address, value);
    }
}

// Relative Addressing Mode,
class Relative implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetAddress(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = this.Processor.PC + (operand - ((operand & 0x80) << 1))
        return address;
    }
}

// ZeroPage Addressing Mode
class ZeroPage implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = operand;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var address: number = operand;
        this.Processor.WriteByte(address, value);
    }
}

// ZeroPageX Addressing Mode
class ZeroPageX implements AddressMode {
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = (operand + x) & 0xFF;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var x: number = this.Processor.X;
        var address: number = (operand + x) & 0xFF;
        this.Processor.WriteByte(address, value);
    }
}

// ZeroPageY Addressing Mode
class ZeroPageY implements AddressMode{
    private Processor;

    constructor(processor) {
        this.Processor = processor;
    }

    public GetValue(): number {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (operand + y) & 0xFF;
        return this.Processor.ReadByte(address);
    }

    public SetValue(value: number): void {
        var operand: number = this.Processor.Instruction.Operand;
        var y: number = this.Processor.Y;
        var address: number = (operand + y) & 0xFF;
        this.Processor.WriteByte(address, value);
    }
}

class m6507 {
    // Registers
    private PC: number;  // Program Counter
    private S: number;   // Stack Pointer
    private A: number;   // Acumulator
    private X: number;   // Index Register X
    private Y: number;   // Index Register Y

    // Status register flags
    private N: number;   // Negative Flag
    private V: number;   // Overflow Flag
    private U: number;   // Unused
    private B: number;   // Break Command
    private D: number;   // Decimal Mode
    private I: number;   // Interrupt Disable
    private Z: number;   // Zero Flag
    private C: number;   // Carry Flag

    private memory: Memory;
    private Instruction: any;
    private Cycles: number;
    private InstructionCycles: number;
    private Disassembler: any;
    private ExecutionReader: any;
    private LastWrites: number[];
    private LastReads: number[];

    private Instructions: { (): void; }[];
    private AddressingModes: AddressMode[];
    private AddressMode: AddressMode;

    constructor(theCart) {
        this.PC = 0;             // Program Counter
        this.S = 0xFF;           // Stack Pointer
        this.A = 0;              // Acumulator
        this.X = 0;              // Index Register X
        this.Y = 0;              // Index Register Y

        this.N = 0; // Negative Flag
        this.V = 0; // Overflow Flag
        this.U = 1; // Unused
        this.B = 0; // Break Command
        this.D = 0; // Decimal Mode
        this.I = 0; // Interrupt Disable
        this.Z = 0; // Zero Flag
        this.C = 0; // Carry Flag

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

    public GetAllFlags(): number {
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
    }

    public SetAllFlags(flags: number): void {
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
    }

    public FlagsToString(): string {
        var str = "C:" + this.C.toString(16);
        str = str + " Z:" + this.Z.toString(16);
        str = str + " I:" + this.I.toString(16);
        str = str + " D:" + this.D.toString(16);
        str = str + " B:" + this.B.toString(16);
        str = str + " V:" + this.V.toString(16);
        str = str + " N:" + this.N.toString(16);
        return str;
    }

    public RegistersToString(): string {
        var str = "A:" + this.A.toString(16);
        str = str + " X:" + this.X.toString(16);
        str = str + " Y:" + this.Y.toString(16);
        str = str + " S:" + this.S.toString(16);
        str = str + " PC:" + this.PC.toString(16);
        return str;
    }

    public Execute(): void {
        this.FetchInstruction();
        this.ExecuteInstruction();
    }

    public FetchInstruction(): void {
        this.ExecutionReader.Address = this.PC;
        this.Instruction = this.Disassembler.Disassemble(this.ExecutionReader);
        //console.log(this.Instruction.toString());
    }

    public ExecuteInstruction(): void {
        this.PC += this.Instruction.Bytes;
        this.AddressMode = this.AddressingModes[this.Instruction.AddressingMode];
        this.InstructionCycles = this.Instruction.Cycles; // base cycles, instruction may add more
        this.Instructions[this.Instruction.Mnemonic].call(this);
        this.UpdateCycles(this.InstructionCycles);
    }

    public ExecFrame(): void {
        // 19912 machine cycles in a frame 1/60th of a  second
        this.ExecCycles(19912);
    }

    public ExecCycles(cycles: number): void {
        var endCycles = this.Cycles + cycles;
        while (this.Cycles < endCycles) {
            this.ExecutionReader.Address = this.PC;
            this.Instruction = this.Disassembler.Disassemble(this.ExecutionReader);
            //console.log(this.Instruction.toString() + "    " + this.RegistersToString() + "    " + this.FlagsToString());
            this.PC += this.Instruction.Bytes;
            this.AddressMode = this.AddressingModes[this.Instruction.AddressingMode];
            this.InstructionCycles = this.Instruction.Cycles; // base cycles, instruction may add more
            this.Instructions[this.Instruction.Mnemonic].call(this);
            this.UpdateCycles(this.InstructionCycles);
        }
    }

    public ExecTime(milliseconds: number): void {
        // 1194 cycles per millisecond
        this.ExecCycles(milliseconds * 1194)
    }

    public UpdateCycles(cycles: number): void {
        var addCycles = this.memory.tia.Step(cycles);
        this.memory.riot.Step(cycles + addCycles);
        this.Cycles += (cycles + addCycles);
    }

    public GetLastReadWrite(): string {
        var str = "";
        while (this.LastWrites.length > 0) {
            str = "W:" + this.LastWrites.pop().toString(16) + "=" + this.LastWrites.pop().toString(16) + " " + str;
        }
        while (this.LastReads.length > 0) {
            str = "R:" + this.LastReads.pop().toString(16) + "=" + this.LastReads.pop().toString(16) + " " + str;
        }
        return str;
    }

    public WriteByte(address: number, value: number): void {
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
    }

    public ReadByte(address: number): number {
        var value = this.memory.ReadByte(address);

        /*
        this.LastReads.push(value);
        this.LastReads.push(address);
        */

        return value;
    }

    public ReadWord(address: number): number {
        var lsb = this.ReadByte(address);
        var msb = this.ReadByte((address + 1) & 0xFFFF);
        var value = ((msb << 8) | lsb);

        /*
        this.LastReads.push(value);
        this.LastReads.push(address);
        */

        return value;
    }

    public WriteWord(address: number, value: number): void {
        var msb = (value & 0xFF00) >>> 8;
        var lsb = value & 0xFF;
        this.WriteByte(address, lsb);
        this.WriteByte(address + 1, msb);

        /*
        this.LastWrites.push(value);
        this.LastWrites.push(address);
        */
    }

    public PushByte(value: number): void {
        this.WriteByte(0x100 + this.S, value);
        this.S = (this.S - 1) & 0xFF;
    }

    public PushWord(value: number): void {
        var msb = (value >>> 8) & 0xFF;
        var lsb = value & 0xFF;
        this.PushByte(msb);
        this.PushByte(lsb);
    }

    public PopByte(): number {
        this.S = (this.S + 1) & 0xFF;
        return this.ReadByte(0x100 + this.S);
    }

    public PopWord(): number {
        var lsb = this.PopByte();
        var msb = this.PopByte();
        var value = (msb << 8) | lsb;
        return value;
    }

    // ADC add with carry
    public ADC(): void {
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
            }
            else {
                this.C = 0;
            }
            var dresult = ((dsum / 10) << 4) | (dsum % 10);
            if (dresult > 127) { this.V = 1; } else { this.V = 0; }
            if (dresult === 0) { this.Z = 1; } else { this.Z = 0; }
            if (dresult & 0x80) { this.N = 1; } else { this.N = 0; }
            this.A = dresult;
        }
        else {
            var sum = reg + value + carry;
            var result = sum & 0xFF;

            if (sum > 127) { this.V = 1; } else { this.V = 0; }
            if (sum > 0xFF) { this.C = 1; } else { this.C = 0; }
            if (result === 0) { this.Z = 1; } else { this.Z = 0; }
            if (result & 0x80) { this.N = 1; } else { this.N = 0; }
            this.A = result;
        }
    }

    // AND and (with accumulator)
    public AND(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg & value) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.A = result;
    }

    // ASL arithmetic shift left
    public ASL(): void {
        var value = this.AddressMode.GetValue();
        var result = (value << 1) & 0xFF;
        if (value & 0x80) { this.C = 1; } else { this.C = 0; }
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.AddressMode.SetValue(result);
    }

    // BCC branch on carry clear
    public BCC(): void {
        if (this.C === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BCS branch on carry set
    public BCS(): void {
        if (this.C === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BEQ branch on equal (zero set)
    public BEQ(): void {
        if (this.Z === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BIT bit test
    public BIT(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg & value) & 0xFF;
        if (value & 0x40) { this.V = 1; } else { this.V = 0; }
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
    }

    // BMI branch on minus (negative set)
    public BMI(): void {
        if (this.N === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BNE branch on not equal (zero clear)
    public BNE(): void {
        if (this.Z === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BPL branch on plus (negative clear)
    public BPL(): void {
        if (this.N === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BRK interrupt
    public BRK(): void {
        this.B = 1;
        this.PushWord(this.PC);
        this.PushByte(this.GetAllFlags());
        this.I = 1;
        this.PC = this.ReadWord(0xFFFE);
    }

    // BVC branch on overflow clear
    public BVC(): void {
        if (this.V === 0) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // BVS branch on overflow set
    public BVS(): void {
        if (this.V === 1) {
            var address = this.AddressMode.GetAddress();
            this.InstructionCycles += this.Instruction.BranchCycles;
            this.PC = address;
        }
    }

    // CLC clear carry
    public CLC(): void {
        this.C = 0;
    }

    // CLD clear decimal
    public CLD(): void {
        this.D = 0;
    }

    // CLI clear interrupt disable
    public CLI(): void {
        this.I = 0;
    }

    // CLV clear overflow
    public CLV(): void {
        this.V = 0;
    }

    // CMP compare (with accumulator)
    public CMP(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var difference = reg - value;
        if (difference === 0) { this.Z = 1; } else { this.Z = 0; }
        if (difference >= 0) { this.C = 1; } else { this.C = 0; }
        if (difference & 0x80) { this.N = 1; } else { this.N = 0; }
    }

    // CPX compare with X
    public CPX(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.X;
        var difference = reg - value;
        if (difference === 0) { this.Z = 1; } else { this.Z = 0; }
        if (difference >= 0) { this.C = 1; } else { this.C = 0; }
        if (difference & 0x80) { this.N = 1; } else { this.N = 0; }
    }

    // CPY compare with Y
    public CPY(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.Y;
        var difference = reg - value;
        if (difference === 0) { this.Z = 1; } else { this.Z = 0; }
        if (difference >= 0) { this.C = 1; } else { this.C = 0; }
        if (difference & 0x80) { this.N = 1; } else { this.N = 0; }
    }

    // DEC decrement
    public DEC(): void {
        var value = this.AddressMode.GetValue();
        var result = ((0x100 | value) - 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.AddressMode.SetValue(result);
    }

    // DEX decrement X
    public DEX(): void {
        var reg = this.X;
        var result = ((0x100 | reg) - 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.X = result;
    }

    // DEY decrement Y
    public DEY(): void {
        var reg = this.Y;
        var result = ((0x100 | reg) - 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.Y = result;
    }

    // EOR exclusive or (with accumulator)
    public EOR(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg ^ value) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.A = result;
    }

    // INC increment
    public INC(): void {
        var value = this.AddressMode.GetValue();
        var result = (value + 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.AddressMode.SetValue(result);
    }

    // INX increment X
    public INX(): void {
        var reg = this.X;
        var result = (reg + 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.X = result;
    }

    // INY increment Y
    public INY(): void {
        var reg = this.Y;
        var result = (reg + 1) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.Y = result;
    }

    // JMP jump
    public JMP(): void {
        var address = this.AddressMode.GetAddress();
        this.PC = address;
    }

    // JSR jump subroutine
    public JSR(): void {
        // pushes next instruction address -1 to the stack and jumps to 
        //push hi push lo 
        var address = this.AddressMode.GetAddress();
        var ret = (this.PC - 1) & 0xFFFF;
        this.PushWord(ret);
        this.PC = address;
    }

    // LDA load accumulator
    public LDA(): void {
        var value = this.AddressMode.GetValue();
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        this.A = value;
    }

    // LDX load X
    public LDX(): void {
        var value = this.AddressMode.GetValue();
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        this.X = value;
    }

    // LDY load Y
    public LDY(): void {
        var value = this.AddressMode.GetValue();
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        this.Y = value;
    }

    // LSR logical shift right
    public LSR(): void {
        var value = this.AddressMode.GetValue();
        var result = (value >>> 1) & 0xFF;
        if (value & 0x01) { this.C = 1; } else { this.C = 0; }
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        // most sources say that N is set some don't though
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.AddressMode.SetValue(result);
    }

    // NOP no operation
    public NOP(): void {

    }

    // ORA or with accumulator
    public ORA(): void {
        var value = this.AddressMode.GetValue();
        var reg = this.A;
        var result = (reg | value) & 0xFF;
        if (result === 0) { this.Z = 1; } else { this.Z = 0; }
        if (result & 0x80) { this.N = 1; } else { this.N = 0; }
        this.A = result;
    }

    // PHA push accumulator
    public PHA(): void {
        this.PushByte(this.A);
    }

    // PHP push processor status (SR)
    public PHP(): void {
        var status = this.GetAllFlags();
        this.PushByte(status);
    }

    // PLA pull accumulator
    public PLA(): void {
        var value = this.PopByte();
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        this.A = value;
    }

    // PLP pull processor status (SR)
    public PLP(): void {
        var status = this.PopByte();
        this.SetAllFlags(status);
    }

    // ROL rotate left
    public ROL(): void {
        var value = this.AddressMode.GetValue();
        var C = this.C;
        var result = ((value << 1) | C) & 0xFF;
        if (value & 0x80) { this.C = 1 } else { this.C = 0; }
        if (result & 0x80) { this.N = 1 } else { this.N = 0; }
        if (result === 0) { this.Z = 1 } else { this.Z = 0; }
        this.AddressMode.SetValue(result);
    }

    // ROR rotate right
    public ROR(): void {
        var value = this.AddressMode.GetValue();
        var C = this.C;
        var result = ((C << 7) | (value >>> 1)) & 0xFF;
        if (value & 0x01) { this.C = 1 } else { this.C = 0; }
        if (result & 0x80) { this.N = 1 } else { this.N = 0; }
        if (result === 0) { this.Z = 1 } else { this.Z = 0; }
        this.AddressMode.SetValue(result);
    }

    // RTI return from interrupt
    public RTI(): void {
        var status = this.PopByte();
        // pop lo pop hi
        var address = this.PopWord();
        this.SetAllFlags(status);
        this.PC = address;
    }

    // RTS return from subroutine
    public RTS(): void {
        var ret = this.PopWord();
        // the address stored on the stack has 1 subtracted from it
        var address = (ret + 1) & 0xFFFF;
        this.PC = address;
    }

    // SBC subtract with carry
    public SBC(): void {
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
            }
            else {
                this.C = 1;
            }
            var dresult = ((ddifference / 10) << 4) | (ddifference % 10);
            if (dresult > 127) { this.V = 1; } else { this.V = 0; }
            if (dresult === 0) { this.Z = 1; } else { this.Z = 0; }
            if (dresult & 0x80) { this.N = 1; } else { this.N = 0; }
            this.A = dresult;
        }
        else {
            var difference = reg - borrow - value;
            var result = difference & 0xFF;

            if (difference < -128) { this.V = 1; } else { this.V = 0; }
            if (difference >= 0) { this.C = 1; } else { this.C = 0; }
            if (result === 0) { this.Z = 1; } else { this.Z = 0; }
            if (result & 0x80) { this.N = 1; } else { this.N = 0; }
            this.A = result;
        }
    }

    // SEC set carry
    public SEC(): void {
        this.C = 1;
    }

    // SED set decimal
    public SED(): void {
        this.D = 1;
    }

    // SEI set interrupt disable
    public SEI(): void {
        this.I = 1;
    }

    // STA store accumulator
    public STA(): void {
        var value = this.A;
        this.AddressMode.SetValue(value);
    }

    // STX store X
    public STX(): void {
        var value = this.X;
        this.AddressMode.SetValue(value);
    }

    // STY store Y
    public STY(): void {
        var value = this.Y;
        this.AddressMode.SetValue(value);
    }

    // TAX transfer accumulator to X
    public TAX(): void {
        var value = this.A;
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.X = value;
    }

    // TAY transfer accumulator to Y
    public TAY(): void {
        var value = this.A;
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.Y = value;
    }

    // TSX transfer stack pointer to X
    public TSX(): void {
        var value = this.S;
        // conflicting info 
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.X = value;
    }

    // TXA transfer X to accumulator
    public TXA(): void {
        var value = this.X;
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.A = value;
    }

    // TXS transfer X to stack pointer
    public TXS(): void {
        var value = this.X;
        // conflicting info 
        //if(value & 0x80) { this.N = 1; } else { this.N = 0; }
        //if(value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.S = value;
    }

    // TYA transfer Y to accumulator
    public TYA(): void {
        var value = this.Y;
        if (value & 0x80) { this.N = 1; } else { this.N = 0; }
        if (value === 0) { this.Z = 1; } else { this.Z = 0; }
        this.A = value;
    }

    // Undefined
    public UND(): void {
        //alert("Undefined instruction used");
    }
}
