import { Memory } from "memory";

export interface Processor {
     // Registers
     PC: number;  // Program Counter
     S: number;   // Stack Pointer
     A: number;   // Acumulator
     X: number;   // Index Register X
     Y: number;   // Index Register Y
 
     // Status register flags
     //private N: number;   // Negative Flag
     // private V: number;   // Overflow Flag
     //private U: number;   // Unused
     //private B: number;   // Break Command
     //private D: number;   // Decimal Mode
     //private I: number;   // Interrupt Disable
     //private Z: number;   // Zero Flag
     //private C: number;   // Carry Flag
 
     memory: Memory;
     Instruction: {
         Operand: number;
     };
     //private Cycles: number;
     //private InstructionCycles: number;
     //private Disassembler: any;
     //private ExecutionReader: any;
     //private LastWrites: number[];
     //private LastReads: number[];
 
     //private Instructions: { (): void; }[];
     //private AddressingModes: AddressMode[];
     //private AddressMode: AddressMode;
    
    beforeExecute: () => void;
    ///registers: { PC: number };
    Step(): void;
    ReadByte(address: number): number;
    WriteByte(address: number, value: number): void;
    ReadWord(address: number): number;
    WriteWord(address: number, value: number): void;
}

export const enum DebuggerMode {
    Break
}

export class Debugger {
    private Processor: Processor;
    private Mode: number;
    private BreakPoints: any[];

    constructor(processor: Processor) {
        this.Mode = DebuggerMode.Break;
        this.Processor = processor;
        this.Processor.beforeExecute = this.BeforeExecute;
        this.BreakPoints = new Array();
    }

    public BeforeExecute() {
        if (this.Mode === DebuggerMode.Break) {
        
        }
    }

    public Break() {
        this.Mode === DebuggerMode.Break;
    }

    public Run() {
        do {
            this.Processor.Step();
        } while (!this.InBreakMode() && !this.IsAtBreakPoint())
    }

    public InBreakMode(): boolean {
        return false;
    }

    public IsAtBreakPoint(): boolean {
        for (var i = 0; i < this.BreakPoints.length; i++) {
            if (this.Processor.PC === this.BreakPoints[i]) {
                return true;
            }
        }
        return false;
    }

    public Restart() {
        
    }

    public Step() {
        this.Processor.Step();
    }

    public StepIn() {

    }

    public StepOut() {
    
    }
}
