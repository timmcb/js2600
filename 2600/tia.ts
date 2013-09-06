class RGB {
    public R: number;
    public G: number;
    public B: number;

    constructor(value: number) {
        this.R = (value >>> 16) & 0xFF;
        this.G = (value >>> 8) & 0xFF;
        this.B = value & 0xFF;
    }
}

function TIA(port1, port2) {
    this.Port1 = port1;
    this.Port2 = port2;

    // Output registers
    this.VSYNC = 0;
    this.VBLANK = 0;
    this.WSYNC = 0;
    this.RSYNC = 0;
    this.NUSIZ0 = 0;
    this.NUSIZ0_bit = null;
    this.NUSIZ0_rbit = null;
    this.NUSIZ0_fwidth = 8;
    this.NUSIZ0_width = 8;
    this.NUSIZ0_copies = 1;
    this.NUSIZ0_space = 0;
    this.NUSIZ0_pwidth = 1;
    this.NUSIZ0_MISSLESIZE = 1;
    this.NUSIZ1 = 0;
    this.NUSIZ1_bit = null;
    this.NUSIZ1_rbit = null;
    this.NUSIZ1_fwidth = 8;
    this.NUSIZ1_width = 8;
    this.NUSIZ1_copies = 1;
    this.NUSIZ1_space = 0;
    this.NUSIZ1_pwidth = 0;
    this.NUSIZ1_MISSLESIZE = 1;
    this.NUSIZ_BITS = [[0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x80, 0x40, 0x40, 0x20, 0x20, 0x10, 0x10,  0x08, 0x08, 0x04, 0x04, 0x02, 0x02, 0x01, 0x01],
                       [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01],
                       [0x80, 0x80, 0x80, 0x80, 0x40, 0x40, 0x40, 0x40,  0x20, 0x20, 0x20, 0x20, 0x10, 0x10, 0x10, 0x10,  0x08, 0x08, 0x08, 0x08, 0x04, 0x04, 0x04, 0x04,  0x02, 0x02, 0x02, 0x02, 0x01, 0x01, 0x01, 0x01]];
    this.NUSIZ_RBITS = [[0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x01, 0x02, 0x02, 0x04, 0x04, 0x08, 0x08,  0x10, 0x10, 0x20, 0x20, 0x40, 0x40, 0x80, 0x80],
                        [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80],
                        [0x01, 0x01, 0x01, 0x01, 0x02, 0x02, 0x02, 0x02,  0x04, 0x04, 0x04, 0x04, 0x08, 0x08, 0x08, 0x08,  0x10, 0x10, 0x10, 0x10, 0x20, 0x20, 0x20, 0x20,  0x40, 0x40, 0x40, 0x40, 0x80, 0x80, 0x80, 0x80]];
    this.COLUP0 = 0;
    this.COLUP1 = 0;
    this.COLUPF = 0;
    this.COLUBK = 0;
    this.CTRLPF = 0;
    this.CTRLPF_REF = 0;
    this.CTRLPF_SCORE = 0;
    this.CTRLPF_PFP = 0;
    this.CTRLPF_BALLSIZE = 1;
    this.REFP0 = 0;
    this.REFP0_REFLECT = 0;
    this.REFP1 = 0;
    this.REFP1_REFLECT = 0;
    this.PF0 = 0;
    this.PF1 = 0;
    this.PF2 = 0;
    this.PFANY = 0;
    this.RESP0 = 0;
    this.RESP1 = 0;
    this.RESM0 = 0;
    this.RESM1 = 0;
    this.RESBL = 0;
    this.AUDC0 = 0;
    this.AUDC1 = 0;
    this.AUDF0 = 0;
    this.AUDF1 = 0;
    this.AUDV0 = 0;
    this.AUDV1 = 0;
    this.GRP0 = 0;
    this.GRP0_DATA = [0,0,0,0,0,0,0,0];
    this.GRP0_RDATA = [0,0,0,0,0,0,0,0];
    this.GRP0_VDEL = 0;
    this.GRP0_VDEL_DATA = [0,0,0,0,0,0,0,0];
    this.GRP0_VDEL_RDATA = [0,0,0,0,0,0,0,0];
    this.GRP1 = 0;
    this.GRP1_DATA = [0,0,0,0,0,0,0,0];
    this.GRP1_RDATA = [0,0,0,0,0,0,0,0];
    this.GRP1_VDEL = 0;
    this.GRP1_VDEL_DATA = [0,0,0,0,0,0,0,0];
    this.GRP1_VDEL_RDATA = [0,0,0,0,0,0,0,0];

    this.ENAM0 = 0;
    this.ENAM0_ENABLE = 0;
    this.ENAM1 = 0;
    this.ENAM1_ENABLE = 0;
    this.ENABL = 0;
    this.ENABL_ENABLE = 0;
    this.ENABL_ENABLE_VDEL = 0;
    this.HMP0 = 0;
    this.HMP1 = 0;
    this.HMM0 = 0;
    this.HMM1 = 0;
    this.HMBL = 0;
    this.VDELP0 = 0;
    this.VDELP0_DELAY = 0;
    this.VDELP1 = 0;
    this.VDELP1_DELAY = 0;
    this.VDELBL = 0;
    this.VDELBL_DELAY = 0;
    this.RESMP0 = 0;
    this.RESMP0_RESET = 0;
    this.RESMP1 = 0;
    this.RESMP1_RESET = 0;
    this.HMOVE = 0;
    this.HMCLR = 0;
    this.CXCLR = 0;
    this.UNDEFO = 0;
    
    // Input registers
    this.CXM0P = 0;
    this.CXM1P = 0;
    this.CXP0FB = 0;
    this.CXP1FB = 0;
    this.CXM0FB = 0;
    this.CXM1FB = 0;
    this.CXBLPF = 0;
    this.CXPPMM = 0;
    this.INPT0 = 0;
    this.INPT1 = 0;
    this.INPT2 = 0;
    this.INPT3 = 0;
    this.INPT4 = 0;
    this.INPT5 = 0;
    this.UNDEFI = 0;
    
    this.Context = null;
    this.Image = null;
    this.Data = null;
    this.inWSYNC = false;
    this.sound = new Sound();
    this.X = 0;
    this.Y = 0;
    this.HMAdjust = 0;
    this.XMin = 228;
    this.XMax = 0;
    this.YMin = 262;
    this.YMax = 0;
    this.Index = 0;
    this.HP0 = 0;
    this.HP1 = 0;
    this.HBALL = 0;
    this.HMIS0 = 0;
    this.HMIS1 = 0;
    this.WSYNC_X = 0;
    this.WSYNC_Y = 0;
    this.inVBLANK = false;

    //this.BitRegister = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80];
    //this.DataRegister = data;
    //this.Counter

    this.BitMask07 = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80];
    this.BitMask70 = [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01];

    this.OutputMap = [
        this.WriteVSYNC,
        this.WriteVBLANK,
        this.WriteWSYNC,
        this.WriteRSYNC,
        this.WriteNUSIZ0,
        this.WriteNUSIZ1,
        this.WriteCOLUP0,
        this.WriteCOLUP1,
        this.WriteCOLUPF,
        this.WriteCOLUBK,
        this.WriteCTRLPF,
        this.WriteREFP0,
        this.WriteREFP1,
        this.WritePF0,
        this.WritePF1,
        this.WritePF2,
        this.WriteRESP0,
        this.WriteRESP1,
        this.WriteRESM0,
        this.WriteRESM1,
        this.WriteRESBL,
        this.WriteAUDC0,
        this.WriteAUDC1,
        this.WriteAUDF0,
        this.WriteAUDF1,
        this.WriteAUDV0,
        this.WriteAUDV1,
        this.WriteGRP0,
        this.WriteGRP1,
        this.WriteENAM0,
        this.WriteENAM1,
        this.WriteENABL,
        this.WriteHMP0,
        this.WriteHMP1,
        this.WriteHMM0,
        this.WriteHMM1,
        this.WriteHMBL,
        this.WriteVDELP0,
        this.WriteVDELP1,
        this.WriteVDELBL,
        this.WriteRESMP0,
        this.WriteRESMP1,
        this.WriteHMOVE,
        this.WriteHMCLR,
        this.WriteCXCLR,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO,
        this.WriteUNDEFO
    ];

    this.InputMap = [
        this.ReadCXM0P,
        this.ReadCXM1P,
        this.ReadCXP0FB,
        this.ReadCXP1FB,
        this.ReadCXM0FB,
        this.ReadCXM1FB,
        this.ReadCXBLPF,
        this.ReadCXPPMM,
        this.ReadINPT0,
        this.ReadINPT1,
        this.ReadINPT2,
        this.ReadINPT3,
        this.ReadINPT4,
        this.ReadINPT5,
        this.ReadUNDEFI,
        this.ReadUNDEFI
    ];

    this.ColorMap = [
        new RGB(0x000000),new RGB(0x000000),
        new RGB(0x404040),new RGB(0x404040),
        new RGB(0x6c6c6c),new RGB(0x6c6c6c),
        new RGB(0x909090),new RGB(0x909090),
        new RGB(0xb0b0b0),new RGB(0xb0b0b0),
        new RGB(0xc8c8c8),new RGB(0xc8c8c8),
        new RGB(0xdcdcdc),new RGB(0xdcdcdc),
        new RGB(0xececec),new RGB(0xececec),
        new RGB(0x444400),new RGB(0x444400),
        new RGB(0x646410),new RGB(0x646410),
        new RGB(0x848424),new RGB(0x848424),
        new RGB(0xa0a034),new RGB(0xa0a034),
        new RGB(0xb8b840),new RGB(0xb8b840),
        new RGB(0xd0d050),new RGB(0xd0d050),
        new RGB(0xe8e85c),new RGB(0xe8e85c),
        new RGB(0xfcfc68),new RGB(0xfcfc68),
        new RGB(0x702800),new RGB(0x702800),
        new RGB(0x844414),new RGB(0x844414),
        new RGB(0x985c28),new RGB(0x985c28),
        new RGB(0xac783c),new RGB(0xac783c),
        new RGB(0xbc8c4c),new RGB(0xbc8c4c),
        new RGB(0xcca05c),new RGB(0xcca05c),
        new RGB(0xdcb468),new RGB(0xdcb468),
        new RGB(0xecc878),new RGB(0xecc878),
        new RGB(0x841800),new RGB(0x841800),
        new RGB(0x983418),new RGB(0x983418),
        new RGB(0xac5030),new RGB(0xac5030),
        new RGB(0xc06848),new RGB(0xc06848),
        new RGB(0xd0805c),new RGB(0xd0805c),
        new RGB(0xe09470),new RGB(0xe09470),
        new RGB(0xeca880),new RGB(0xeca880),
        new RGB(0xfcbc94),new RGB(0xfcbc94),
        new RGB(0x880000),new RGB(0x880000),
        new RGB(0x9c2020),new RGB(0x9c2020),
        new RGB(0xb03c3c),new RGB(0xb03c3c),
        new RGB(0xc05858),new RGB(0xc05858),
        new RGB(0xd07070),new RGB(0xd07070),
        new RGB(0xe08888),new RGB(0xe08888),
        new RGB(0xeca0a0),new RGB(0xeca0a0),
        new RGB(0xfcb4b4),new RGB(0xfcb4b4),
        new RGB(0x78005c),new RGB(0x78005c),
        new RGB(0x8c2074),new RGB(0x8c2074),
        new RGB(0xa03c88),new RGB(0xa03c88),
        new RGB(0xb0589c),new RGB(0xb0589c),
        new RGB(0xc070b0),new RGB(0xc070b0),
        new RGB(0xd084c0),new RGB(0xd084c0),
        new RGB(0xdc9cd0),new RGB(0xdc9cd0),
        new RGB(0xecb0e0),new RGB(0xecb0e0),
        new RGB(0x480078),new RGB(0x480078),
        new RGB(0x602090),new RGB(0x602090),
        new RGB(0x783ca4),new RGB(0x783ca4),
        new RGB(0x8c58b8),new RGB(0x8c58b8),
        new RGB(0xa070cc),new RGB(0xa070cc),
        new RGB(0xb484dc),new RGB(0xb484dc),
        new RGB(0xc49cec),new RGB(0xc49cec),
        new RGB(0xd4b0fc),new RGB(0xd4b0fc),
        new RGB(0x140084),new RGB(0x140084),
        new RGB(0x302098),new RGB(0x302098),
        new RGB(0x4c3cac),new RGB(0x4c3cac),
        new RGB(0x6858c0),new RGB(0x6858c0),
        new RGB(0x7c70d0),new RGB(0x7c70d0),
        new RGB(0x9488e0),new RGB(0x9488e0),
        new RGB(0xa8a0ec),new RGB(0xa8a0ec),
        new RGB(0xbcb4fc),new RGB(0xbcb4fc),
        new RGB(0x000088),new RGB(0x000088),
        new RGB(0x1c209c),new RGB(0x1c209c),
        new RGB(0x3840b0),new RGB(0x3840b0),
        new RGB(0x505cc0),new RGB(0x505cc0),
        new RGB(0x6874d0),new RGB(0x6874d0),
        new RGB(0x7c8ce0),new RGB(0x7c8ce0),
        new RGB(0x90a4ec),new RGB(0x90a4ec),
        new RGB(0xa4b8fc),new RGB(0xa4b8fc),
        new RGB(0x00187c),new RGB(0x00187c),
        new RGB(0x1c3890),new RGB(0x1c3890),
        new RGB(0x3854a8),new RGB(0x3854a8),
        new RGB(0x5070bc),new RGB(0x5070bc),
        new RGB(0x6888cc),new RGB(0x6888cc),
        new RGB(0x7c9cdc),new RGB(0x7c9cdc),
        new RGB(0x90b4ec),new RGB(0x90b4ec),
        new RGB(0xa4c8fc),new RGB(0xa4c8fc),
        new RGB(0x002c5c),new RGB(0x002c5c),
        new RGB(0x1c4c78),new RGB(0x1c4c78),
        new RGB(0x386890),new RGB(0x386890),
        new RGB(0x5084ac),new RGB(0x5084ac),
        new RGB(0x689cc0),new RGB(0x689cc0),
        new RGB(0x7cb4d4),new RGB(0x7cb4d4),
        new RGB(0x90cce8),new RGB(0x90cce8),
        new RGB(0xa4e0fc),new RGB(0xa4e0fc),
        new RGB(0x003c2c),new RGB(0x003c2c),
        new RGB(0x1c5c48),new RGB(0x1c5c48),
        new RGB(0x387c64),new RGB(0x387c64),
        new RGB(0x509c80),new RGB(0x509c80),
        new RGB(0x68b494),new RGB(0x68b494),
        new RGB(0x7cd0ac),new RGB(0x7cd0ac),
        new RGB(0x90e4c0),new RGB(0x90e4c0),
        new RGB(0xa4fcd4),new RGB(0xa4fcd4),
        new RGB(0x003c00),new RGB(0x003c00),
        new RGB(0x205c20),new RGB(0x205c20),
        new RGB(0x407c40),new RGB(0x407c40),
        new RGB(0x5c9c5c),new RGB(0x5c9c5c),
        new RGB(0x74b474),new RGB(0x74b474),
        new RGB(0x8cd08c),new RGB(0x8cd08c),
        new RGB(0xa4e4a4),new RGB(0xa4e4a4),
        new RGB(0xb8fcb8),new RGB(0xb8fcb8),
        new RGB(0x143800),new RGB(0x143800),
        new RGB(0x345c1c),new RGB(0x345c1c),
        new RGB(0x507c38),new RGB(0x507c38),
        new RGB(0x6c9850),new RGB(0x6c9850),
        new RGB(0x84b468),new RGB(0x84b468),
        new RGB(0x9ccc7c),new RGB(0x9ccc7c),
        new RGB(0xb4e490),new RGB(0xb4e490),
        new RGB(0xc8fca4),new RGB(0xc8fca4),
        new RGB(0x2c3000),new RGB(0x2c3000),
        new RGB(0x4c501c),new RGB(0x4c501c),
        new RGB(0x687034),new RGB(0x687034),
        new RGB(0x848c4c),new RGB(0x848c4c),
        new RGB(0x9ca864),new RGB(0x9ca864),
        new RGB(0xb4c078),new RGB(0xb4c078),
        new RGB(0xccd488),new RGB(0xccd488),
        new RGB(0xe0ec9c),new RGB(0xe0ec9c),
        new RGB(0x442800),new RGB(0x442800),
        new RGB(0x644818),new RGB(0x644818),
        new RGB(0x846830),new RGB(0x846830),
        new RGB(0xa08444),new RGB(0xa08444),
        new RGB(0xb89c58),new RGB(0xb89c58),
        new RGB(0xd0b46c),new RGB(0xd0b46c),
        new RGB(0xe8cc7c),new RGB(0xe8cc7c),
        new RGB(0xfce08c),new RGB(0xfce08c)
    ];
}

TIA.prototype.ReadByte = function (address) {
    var index = address & 0xF;
    return this.InputMap[index].call(this);
}

TIA.prototype.WriteByte = function(address, value) {
    var index = address & 0x3F;
    this.OutputMap[index].call(this, value);
}

TIA.prototype.Init = function() {
}


TIA.prototype.Step = function (cycles) {
    var addCycles = 0;
    var renderCycles = cycles * 3;

    var t = this;
    t.SCStepClock(renderCycles)

    // Process cycles if cpu is waiting for sync
    if (t.inWSYNC) {
        while (t.inWSYNC) {
            t.SCStepClock(3);
            addCycles++;
        }
    }

    return addCycles;
}

TIA.prototype.SCStepClock = function (renderCycles) {
    var t = this;

    while (renderCycles--) {
        if (t.X < 68) {
            // HBLANK
        }
        else {
            if (t.Y < 40) {
                // VBLANK/VSYNC
                //this.Index = 0
            }
            else if (t.Y >= 250) {
                // OVERSCAN
            }
            else {
                // PICTURE
                if (!t.inVBLANK) {
                    var color = t.Render();
                    t.SetColor(color);
                }
                t.Index += 4;
            }
        }

        t.X++;

        if (t.inWSYNC && t.X === (8 + t.HMAdjust)) {
            t.inWSYNC = false;
        }
        else if (t.X >= 228) {
            t.X = 0;
            t.Y++;
            t.HMAddjust = 0;

            if (t.Y >= 262) {
                t.Y = 0;
                t.Index = 0;
                //t.UpdateScreen();
            }
        }
    }
}

TIA.prototype.SetColor = function (color) {
    /*
    var d = this.Data;
    if (d) {
    var rgb = this.ColorMap[color];
    var r = rgb.R;
    var g = rgb.G;
    var b = rgb.B;
    var is = this.Index;
    d[is++] = r;
    d[is++] = g;
    d[is++] = b;
    }
    */
    var d = this.Data;
    if (d) {
        var rgb = this.ColorMap[color];
        var r = rgb.R;
        var g = rgb.G;
        var b = rgb.B;
        var ic = this.Index;
        var is = ic;
        
        if (d[ic++] !== r || d[ic++] !== g || d[ic++] !== b) {
            d[is++] = r;
            d[is++] = g;
            d[is++] = b;

            var x = this.X;
            if (x < this.XMin) {
                this.XMin = x;
            }
            else if (x > this.XMax) {
                this.XMax = x;
            }

            var y = this.Y;
            if (y < this.YMin) {
                this.YMin = y;
            }
            else if (y > this.YMax) {
                this.YMax = y;
            }
        }
    }
}

TIA.prototype.UpdateScreen = function () {
    if (this.Context) {
        if (this.XMax >= this.XMin && this.YMax >= this.YMin) {
            this.Context.putImageData(this.Image, 0, 0, (this.XMin - 68 - 2) << 0, (this.YMin - 40 - 2) << 0, (this.XMax + 4 - this.XMin) << 0, (this.YMax + 4 - this.YMin) << 0);
        }
        //else {
        //this.Context.putImageData(this.Image, 0, 0); //, 0, 0 ,0 ,0);
        //}
    }
    else {
        if (document) {
            var screen: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("screen");
            if (screen) {
                this.Context = screen.getContext("2d");
                //this.Context.imageSmoothingEnabled = false;
                //this.Context.webkitImageSmoothingEnabled = false;
                //this.Context.scale(4, 3);
                this.Image = this.Context.getImageData(0, 0, screen.width, screen.height);
                this.Data = this.Image.data;
                
                for (var i = 0; i < this.Data.length; i++) {
                    this.Data[i] = 0xFF;
                }
            }
        }
    }

    this.XMin = 228;
    this.XMax = 0;
    this.YMin = 262;
    this.YMax = 0;
}

TIA.prototype.RPRenderPlayfield = function () {
    if (this.PFANY) {
        var px = (this.X - 68) >>> 2; // convert 0-160 to 0-40
        if (px >= 20) {
            // RIGHT PLAYFIELD
            if (this.CTRLPF_REF) {
                if (px >= 36) {
                    if ((this.PF0 >>> (43 - px)) & 0x01) {
                        return true;
                    }
                }
                else if (px >= 28) {
                    if ((this.PF1 >>> (px - 28)) & 0x01) {
                        return true;
                    }
                }
                else {
                    if ((this.PF2 >>> (27 - px)) & 0x01) {
                        return true;
                    }
                }
            }
            else {
                if (px >= 32) {
                    if ((this.PF2 >>> (px - 32)) & 0x01) {
                        return true;
                    }
                }
                else if (px >= 24) {
                    if ((this.PF1 >>> (31 - px)) & 0x01) {
                        return true;
                    }
                }
                else {
                    if ((this.PF0 >>> (px - 16)) & 0x01) {
                        return true;
                    }
                }
            }
        }
        else {
            // LEFT PLAYFIELD
            if (px >= 12) {
                if ((this.PF2 >>> (px - 12)) & 0x01) {
                    return true;
                }
            }
            else if (px >= 4) {
                if ((this.PF1 >>> (7 - (px - 4))) & 0x01) {
                    return true;
                }
            }
            else {
                if ((this.PF0 >>> (4 + px)) & 0x01) {
                    return true;
                }
            }
        }
    }
    return false;
}

TIA.prototype.RP0RenderPlayer0 = function () {
    // reset position RESP0 (RESP1
    // move data HMP0 (HMP1 HMOVE
    // player graphics GRP0 (GRP1)
    // reflect graphics REFP0 (REFP1)
    // verical delay VDELP0 (VDELP1
    // copies NUSIZ0 (NUSIZ1)
    // Player-Missile number & player size D2 D1 D0 1/2 television line (80 clocks)
    // 8 clocks per square Description 
    // 0 0 0 X                 one copy 
    // 0 0 1 X   X             two copies - close 
    // 0 1 0 X       X         two copies - med 
    // 0 1 1 X   X   X         three copies - close 
    // 1 0 0 X               X two copies - wide 
    // 1 0 1 X X               double size player 
    // 1 1 0 X       X       X 3 copies medium 
    // 1 1 1 X X X X           quad sized player
    var t = this;
    var grp = 0;
    if (t.VDELP0_DELAY) {
        grp = t.GRP0_VDEL;
    }
    else {
        grp = t.GRP0;
    }
    if (grp) {
        var x = t.X;
        var start = t.HP0
        if (x >= start) {
            var offset = x - start;
            if (offset < t.NUSIZ0_fwidth) {
                if (t.REFP0_REFLECT) {
                    if (grp & t.NUSIZ0_rbit[offset]) {
                        return true;
                    }
                }
                else {
                    if (grp & t.NUSIZ0_bit[offset]) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

TIA.prototype.RP1RenderPlayer1 = function () {
    // reset position RESP0 (RESP1
    // move data HMP0 (HMP1 HMOVE
    // player graphics GRP0 (GRP1)
    // reflect graphics REFP0 (REFP1)
    // verical delay VDELP0 (VDELP1
    // copies NUSIZ0 (NUSIZ1)
    // Player-Missile number & player size D2 D1 D0 1/2 television line (80 clocks)
    // 8 clocks per square Description 
    // 0 0 0 X                 one copy 
    // 0 0 1 X   X             two copies - close 
    // 0 1 0 X       X         two copies - med 
    // 0 1 1 X   X   X         three copies - close 
    // 1 0 0 X               X two copies - wide 
    // 1 0 1 X X               double size player 
    // 1 1 0 X       X       X 3 copies medium 
    // 1 1 1 X X X X           quad sized player
    var grp,
        t = this;

    if (t.VDELP1_DELAY) {
        grp = t.GRP1_VDEL;
    }
    else {
        grp = t.GRP1;
    }
    if (grp) {
        var x = t.X;
        var start = t.HP1
        if (x >= start) {
            var offset = x - start;
            if (offset < t.NUSIZ1_fwidth) {
                if (t.REFP1_REFLECT) {
                    if (grp & t.NUSIZ1_rbit[offset]) {
                        return true;
                    }
                }
                else {
                    if (grp & t.NUSIZ1_bit[offset]) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

TIA.prototype.RBRenderBall = function () {
    var enabl = 0;
    if (this.VDELBL_DELAY) {
        enabl = this.ENABL_ENABLE_VDEL;
    }
    else {
        enabl = this.ENABL_ENABLE;
    }
    if (enabl) {
        var offset = this.X - this.HBALL;
        if (offset >= 0 && offset < this.CTRLPF_BALLSIZE) {
            return true;
        }
    }
    return false;
}

TIA.prototype.RM0RenderMissle0 = function () {
    if (this.ENAM0_ENABLE && !this.RESMP0_RESET) {
        var offset = this.X - this.HMIS0;
        if (offset >= 0 && offset < this.NUSIZ0_MISSLESIZE) {
            return true;
        }
    }
    return false;
}

TIA.prototype.RM1RenderMissle1 = function () {
    if (this.ENAM1_ENABLE && !this.RESMP1_RESET) {
        var offset = this.X - this.HMIS1;
        if (offset >= 0 && offset < this.NUSIZ1_MISSLESIZE) {
            return true;
        }
    }
    return false;
}

TIA.prototype.Render = function () {
    var t = this;
    var pf = t.RPRenderPlayfield();
    var bl = t.RBRenderBall();
    var m1 = t.RM1RenderMissle1();
    var p1 = t.RP1RenderPlayer1();
    var m0 = t.RM0RenderMissle0();
    var p0 = t.RP0RenderPlayer0();

    t.UpdateCollisions(pf, m0, m1, bl, p0, p1);

    return t.GetColor(p0, m0, p1, m1, pf, bl);
}

// 06 COLUP0 1 1 1 1 1 1 1 color-lum player 0
// 07 COLUP1 1 1 1 1 1 1 1 color-lum player 1
// 08 COLUPF 1 1 1 1 1 1 1 color-lum playfield
// 09 COLUBK 1 1 1 1 1 1 1 color-lum background
TIA.prototype.GetColor = function (p0, m0, p1, m1, pf, bl) {
    var t = this;

    var pfPriority = t.CTRLPF_PFP;
    var pfColor = t.COLUPF;
    if (t.CTRLPF_SCORE) {
        if (t.X < 148) {
            pfColor = t.COLUP0;
        }
        else {
            pfColor = t.COLUP1;
        }
    }

    if (pfPriority && pf) {
        return pfColor;
    }
    else if (p0) {
        return t.COLUP0;
    }
    else if (m0) {
        return t.COLUP0;
    }
    else if (p1) {
        return t.COLUP1;
    }
    else if (m1) {
        return t.COLUP1;
    }
    else if (bl) {
        return pfColor;
    }
    else if (!pfPriority && pf) {
        return pfColor;
    }
    else {
        return t.COLUBK;
    }
}

// COLLISIONA                  -D7-- -D6--
// 0 CXM0P  1 1 read collision MO P1 M0 P0
// 1 CXM1P  1 1 read collision M1 P0 M1 P1
// 2 CXP0FB 1 1 read collision P0 PF P0 BL
// 3 CXP1FB 1 1 read collision P1 PF P1 BL
// 4 CXM0FB 1 1 read collision M0 PF M0 BL
// 5 CXM1FB 1 1 read collision M1 PF M1 BL
// 6 CXBLPF 1   read collision BL PF unused
// 7 CXPPMM 1 1 read collision P0 P1 M0 M1
TIA.prototype.UpdateCollisions = function (pf, m0, m1, bl, p0, p1) {
    var t = this;
    if (m0) {
        if (p1) { t.CXM0P |= 0x80; }
        if (p0) { t.CXM0P |= 0x40; }
        if (pf) { t.CXM0FB |= 0x80; }
        if (bl) { t.CXM0FB |= 0x40; }
        if (m1) { t.CXPPMM |= 0x40; }
    }
    if (m1) {
        if (p0) { t.CXM1P |= 0x80; }
        if (p1) { t.CXM1P |= 0x40; }
        if (pf) { t.CXM1FB |= 0x80; }
        if (bl) { t.CXM1FB |= 0x40; }
    }
    if (p0) {
        if (pf) { t.CXP0FB |= 0x80; }
        if (bl) { t.CXP0FB |= 0x40; }
        if (p1) { t.CXPPMM |= 0x80; }
    }
    if (p1) {
        if (pf) { t.CXP1FB |= 0x80; }
        if (bl) { t.CXP1FB |= 0x40; }
    }
    if (bl && pf) { t.CXBLPF |= 0x80; }
}

// VSYNC   ......1.  vertical sync set-clear
TIA.prototype.WriteVSYNC = function (value) {
    this.VSYNC = value;

    if (value & 0x02) {
        this.Y = 0;
        this.Index = 0;
        this.UpdateScreen();
    }
}

// VBLANK  11....1.  vertical blank set-clear
TIA.prototype.WriteVBLANK = function (value) {
    this.VBLANK = value;
    this.inVBLANK = ((value & 0x02) === 0x02);
    //if (this.inVBLANK) {
    //    this.Index = 0;
    //}

}

// WSYNC   <strobe>  wait for leading edge of horizontal blank
TIA.prototype.WriteWSYNC = function (value) {
    this.WSYNC = value;
    this.inWSYNC = true;
    this.WSYNC_X = this.X;
    this.WSYNC_Y = this.Y;
}

// RSYNC   <strobe>  reset horizontal sync counter
TIA.prototype.WriteRSYNC = function (value) {
    this.RSYNC = value;
}

// NUSIZ0  ..111111  number-size player-missile 0
//These addresses control the number and size of players and missiles.
//Missile Size
//D5	D4	Width
//0	0	1 clock
//0	1	2 clocks
//1	0	4 clocks
//1	1	8 clocks
//Player-Missile number & player size
//D2	D1	D0	1/2 television line (80 clocks)
//8 clocks per square	Description
//0	0	0	X	 	 	 	 	 	 	 	 	one copy
//0	0	1	X	 	X	 	 	 	 	 	 	two copies - close
//0	1	0	X	 	 	 	X	 	 	 	 	two copies - med
//0	1	1	X	 	X	 	X	 	 	 	 	three copies - close
//1	0	0	X	 	 	 	 	 	 	 	X	two copies - wide
//1	0	1	X	X	 	 	 	 	 	 	 	double size player
//1	1	0	X	 	 	 	X	 	 	 	X	3 copies medium
//1	1	1	X	X	X	X	 	 	 	 	 	quad sized player
TIA.prototype.WriteNUSIZ0 = function (value) {
    this.NUSIZ0 = value;
    this.NUSIZ0_bit = this.NUSIZ_BITS[value & 0x7];
    this.NUSIZ0_rbit = this.NUSIZ_RBITS[value & 0x7];
    this.NUSIZ0_fwidth = this.NUSIZ0_bit.length;
    //switch (value & 0x7) {
    //    case 0: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 1; this.NUSIZ0_space = 0; this.NUSIZ0_pwidth = 0; break;
    //    case 1: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 2; this.NUSIZ0_space = 16; this.NUSIZ0_pwidth = 0; break;
    //    case 2: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 2; this.NUSIZ0_space = 32; this.NUSIZ0_pwidth = 0; break;
    //    case 3: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 3; this.NUSIZ0_space = 16; this.NUSIZ0_pwidth = 0; break;
    //    case 4: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 2; this.NUSIZ0_space = 64; this.NUSIZ0_pwidth = 0; break;
    //    case 5: this.NUSIZ0_width = 16; this.NUSIZ0_copies = 1; this.NUSIZ0_space = 0; this.NUSIZ0_pwidth = 1; break;
    //    case 6: this.NUSIZ0_width = 8; this.NUSIZ0_copies = 3; this.NUSIZ0_space = 32; this.NUSIZ0_pwidth = 0; break;
    //    case 7: this.NUSIZ0_width = 32; this.NUSIZ0_copies = 1; this.NUSIZ0_space = 0; this.NUSIZ0_pwidth = 2; break;
    //    default: break;
    //}
    this.NUSIZ0_MISSLESIZE = 1 << ((value >>> 4) & 0x03);
}

// NUSIZ1  ..111111  number-size player-missile 1
TIA.prototype.WriteNUSIZ1 = function (value) {
    this.NUSIZ1 = value;
    this.NUSIZ1_bit = this.NUSIZ_BITS[value & 0x7];
    this.NUSIZ1_rbit = this.NUSIZ_RBITS[value & 0x7];
    this.NUSIZ1_fwidth = this.NUSIZ1_bit.length;
    //switch (value & 0x7) {
    //    case 0: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 1; this.NUSIZ1_space = 0;  this.NUSIZ1_pwidth = 0; break;
    //    case 1: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 2; this.NUSIZ1_space = 16; this.NUSIZ1_pwidth = 0; break;
    //    case 2: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 2; this.NUSIZ1_space = 32; this.NUSIZ1_pwidth = 0; break;
    //    case 3: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 3; this.NUSIZ1_space = 16; this.NUSIZ1_pwidth = 0; break;
    //    case 4: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 2; this.NUSIZ1_space = 64; this.NUSIZ1_pwidth = 0; break;
    //    case 5: this.NUSIZ1_width = 16; this.NUSIZ1_copies = 1; this.NUSIZ1_space = 0;  this.NUSIZ1_pwidth = 1; break;
    //    case 6: this.NUSIZ1_width = 8;  this.NUSIZ1_copies = 3; this.NUSIZ1_space = 32; this.NUSIZ1_pwidth = 0; break;
    //    case 7: this.NUSIZ1_width = 32; this.NUSIZ1_copies = 1; this.NUSIZ1_space = 0;  this.NUSIZ1_pwidth = 2; break;
    //    default: break;
    //}
    this.NUSIZ1_MISSLESIZE = 1 << ((value >>> 4) & 0x03);
}

// COLUP0  1111111.  color-lum player 0 and missile 0
TIA.prototype.WriteCOLUP0 = function (value) {
    this.COLUP0 = value;
}

// COLUP1  1111111.  color-lum player 1 and missile 1
TIA.prototype.WriteCOLUP1 = function (value) {
    this.COLUP1 = value;
}

// COLUPF  1111111.  color-lum playfield and ball
TIA.prototype.WriteCOLUPF = function (value) {
    this.COLUPF = value;
}

// COLUBK  1111111.  color-lum background
TIA.prototype.WriteCOLUBK = function (value) {
    this.COLUBK = value;
}

// CTRLPF  ..11.111  control playfield ball size & collisions
//D0	REF (reflect playfield)
//D1	SCORE (left half of playfield gets color of player 0, right half gets color of player
//D2	PFP (playfield gets priority over players so they can move behind the playfield)
//D4	Ball Size (see next table)
//D5
//D4 & D5 = BALL SIZE
//D5	D4	Width
//0	0	1 clock
//0	1	2 clocks//
//1	0	4 clocks
//1	1	8 clocks
TIA.prototype.WriteCTRLPF = function (value) {
    this.CTRLPF = value;
    this.CTRLPF_REF = value & 0x01;
    this.CTRLPF_SCORE = value & 0x02;
    this.CTRLPF_PFP = value & 0x04;
    this.CTRLPF_BALLSIZE = 1 << ((value >>> 4) & 0x03);
}

// REFP0   ....1...  reflect player 0
TIA.prototype.WriteREFP0 = function (value) {
    this.REFP0 = value;
    this.REFP0_REFLECT = value & 0x08;
}

// REFP1   ....1...  reflect player 1
TIA.prototype.WriteREFP1 = function (value) {
    this.REFP1 = value;
    this.REFP1_REFLECT = value & 0x08;
}

// PF0     1111....  playfield register byte 0
TIA.prototype.WritePF0 = function (value) {
    this.PF0 = value & 0xF0;
    this.PFANY = this.PF0 | this.PF1 | this.PF2;
}

// PF1     11111111  playfield register byte 1
TIA.prototype.WritePF1 = function (value) {
    this.PF1 = value;
    this.PFANY = this.PF0 | this.PF1 | this.PF2;
}

// PF2     11111111  playfield register byte 2
TIA.prototype.WritePF2 = function (value) {
    this.PF2 = value;
    this.PFANY = this.PF0 | this.PF1 | this.PF2;
}

// RESP0   <strobe>  reset player 0
TIA.prototype.WriteRESP0 = function (value) {
    this.RESP0 = value;
    this.HP0 = this.X <= 66 ? 68 : this.X + 5; //+ 4 + 5;
}

// RESP1   <strobe>  reset player 1
TIA.prototype.WriteRESP1 = function (value) {
    this.RESP1 = value;
    this.HP1 = this.X <= 66 ? 68 : this.X + 5; //+ 4 + 5;
}

// RESM0   <strobe>  reset missile 0
TIA.prototype.WriteRESM0 = function (value) {
    this.RESM0 = value;
    this.HMIS0 = this.X < 68 ? 72 : this.X + 4; //+ 4 + 4;
}

// RESM1   <strobe>  reset missile 1
TIA.prototype.WriteRESM1 = function (value) {
    this.RESM1 = value;
    this.HMIS1 = this.X < 68 ? 72 : this.X + 4; //+ 4 + 4;
}

// RESBL   <strobe>  reset ball
TIA.prototype.WriteRESBL = function (value) {
    this.RESBL = value;
    this.HBALL = this.X < 68 ? 72 : this.X + 4; //+ 4 + 4;
}

// AUDC0   ....1111  audio control 0
TIA.prototype.WriteAUDC0 = function (value) {
    this.AUDC0 = value;
    this.sound.AudioSound0(value & 0x0F)
}

// AUDC1   ....1111  audio control 1
TIA.prototype.WriteAUDC1 = function (value) {
    this.AUDC1 = value;
    this.sound.AudioSound1(value & 0x0F)
}

// AUDF0   ...11111  audio frequency 0
TIA.prototype.WriteAUDF0 = function (value) {
    this.VSYNC = value;
    this.sound.AudioFrequency0(value & 0x1F)
}

// AUDF1   ...11111  audio frequency 1
TIA.prototype.WriteAUDF1 = function (value) {
    this.AUDF1 = value;
    this.sound.AudioFrequency1(value & 0x1F)
}

// AUDV0   ....1111  audio volume 0
TIA.prototype.WriteAUDV0 = function (value) {
    this.AUDV0 = value;
    this.sound.AudioVolume0(value & 0x0F)
}

// AUDV1   ....1111  audio volume 1
TIA.prototype.WriteAUDV1 = function (value) {
    this.AUDV1 = value;
    this.sound.AudioVolume1(value & 0x0F)
}

// GRP0    11111111  graphics player 0
TIA.prototype.WriteGRP0 = function (value) {
    this.GRP0 = value;
    this.GRP1_VDEL = this.GRP1;
    var bit = 8;
    while (bit--) {
        this.GRP0_DATA[bit] = value & this.BitMask07[bit];
        this.GRP0_RDATA[bit] = value & this.BitMask70[bit];
        this.GRP1_VDEL_DATA[bit] = this.GRP1_VDEL & this.BitMask07[bit];
        this.GRP1_VDEL_RDATA[bit] = this.GRP1_VDEL & this.BitMask70[bit];
    }
}

// GRP1    11111111  graphics player 1
TIA.prototype.WriteGRP1 = function (value) {
    this.GRP1 = value;
    this.GRP0_VDEL = this.GRP0;
    this.ENABL_ENABLE_VDEL = this.ENABL_ENABLE;
    var bit = 8;
    while (bit--) {
        this.GRP1_DATA[bit] = value & this.BitMask07[bit];
        this.GRP1_RDATA[bit] = value & this.BitMask70[bit];
        this.GRP0_VDEL_DATA[bit] = this.GRP0_VDEL & this.BitMask07[bit];
        this.GRP0_VDEL_RDATA[bit] = this.GRP0_VDEL & this.BitMask70[bit];
    }
}

// ENAM0   ......1.  graphics (enable) missile 0
TIA.prototype.WriteENAM0 = function (value) {
    this.ENAM0 = value;
    this.ENAM0_ENABLE = value & 0x02
}

// ENAM1   ......1.  graphics (enable) missile 1
TIA.prototype.WriteENAM1 = function(value) {
    this.ENAM1 = value;
    this.ENAM1_ENABLE = value & 0x02
}

// ENABL   ......1.  graphics (enable) ball
TIA.prototype.WriteENABL = function (value) {
    this.ENABL = value;
    this.ENABL_ENABLE = value & 0x02
}

// HMP0    1111....  horizontal motion player 0
TIA.prototype.WriteHMP0 = function (value) {
    this.HMP0 = value;
}

// HMP1    1111....  horizontal motion player 1
TIA.prototype.WriteHMP1 = function (value) {
    this.HMP1 = value;
}

// HMM0    1111....  horizontal motion missile 0
TIA.prototype.WriteHMM0 = function (value) {
    this.HMM0 = value;
}

// HMM1    1111....  horizontal motion missile 1
TIA.prototype.WriteHMM1 = function (value) {
    this.HMM1 = value;
}

// HMBL    1111....  horizontal motion ball
TIA.prototype.WriteHMBL = function (value) {
    this.HMBL = value;
}

// VDELP0  .......1  vertical delay player 0
TIA.prototype.WriteVDELP0 = function (value) {
    this.VDELP0 = value;
    this.VDELP0_DELAY = value & 0x01;
}

// VDELP1  .......1  vertical delay player 1
TIA.prototype.WriteVDELP1 = function (value) {
    this.VDELP1 = value;
    this.VDELP1_DELAY = value & 0x01;
}

// VDELBL  .......1  vertical delay ball
TIA.prototype.WriteVDELBL = function(value) {
    this.VDELBL = value;
    this.VDELBL_DELAY = value & 0x01;
}

// RESMP0  ......1.  reset missile 0 to player 0
TIA.prototype.WriteRESMP0 = function (value) {
    var oldreset = this.RESMP0_RESET;
    this.RESMP0 = value;
    this.RESMP0_RESET = value & 0x02;
    if (this.RESMP0_RESET !== oldreset) {
        this.HMIS0 = this.HP0;
    }
}

// RESMP1  ......1.  reset missile 1 to player 1
TIA.prototype.WriteRESMP1 = function (value) {
    var oldreset = this.RESMP1_RESET;
    this.RESMP1 = value;
    this.RESMP1_RESET = value & 0x02;
    if (this.RESMP1_RESET !== oldreset) {
        this.HMIS1 = this.HP1;
    }
}

// HMOVE   <strobe>  apply horizontal motion
TIA.prototype.WriteHMOVE = function (value) {
    this.HMAdjust = 0;
    this.HMOVE = value;

    // Get the fine positioning adjustments from the upper nibble of the movement registers.
    var dxP0 = this.HMP0 >>> 4;
    var dxP1 = this.HMP1 >>> 4;
    var dxM0 = this.HMM0 >>> 4;
    var dxM1 = this.HMM1 >>> 4;
    var dxBL = this.HMBL >>> 4;

    // Set the direction based on sign bit
    if (dxP0 & 0x08) { dxP0 = (dxP0 & 0x07) - 0x08; }
    if (dxP1 & 0x08) { dxP1 = (dxP1 & 0x07) - 0x08; }
    if (dxM0 & 0x08) { dxM0 = (dxM0 & 0x07) - 0x08; }
    if (dxM1 & 0x08) { dxM1 = (dxM1 & 0x07) - 0x08; }
    if (dxBL & 0x08) { dxBL = (dxBL & 0x07) - 0x08; }

    // Get the adjusted positions        
    var xP0 = this.HP0 - dxP0;
    var xP1 = this.HP1 - dxP1;
    var xM0 = this.HMIS0 - dxM0;
    var xM1 = this.HMIS1 - dxM1;
    var xBL = this.HBALL - dxBL;

    // store the positions
    this.HP0 = xP0;
    this.HP1 = xP1;
    this.HMIS0 = xM0;
    this.HMIS1 = xM1;
    this.HBALL = xBL;
}

// HMCLR   <strobe>  clear horizontal motion registers
TIA.prototype.WriteHMCLR = function (value) {
    this.HMCLR = value;
    this.HMM0 = 0;
    this.HMM1 = 0;
    this.HMBL = 0;
    this.HMP0 = 0;
    this.HMP1 = 0;
}

// CXCLR   <strobe>  clear collision latches
TIA.prototype.WriteCXCLR = function (value) {
    this.CXCLR = value;
    this.CXM0P = 0;
    this.CXM1P = 0;
    this.CXP0FB = 0;
    this.CXP1FB = 0;
    this.CXM0FB = 0;
    this.CXM1FB = 0;
    this.CXBLPF = 0;
    this.CXPPMM = 0;
}

// UNDEFO  undefined input register
TIA.prototype.WriteUNDEFO = function (value) {
    //if(value !== 0) { alert("write to undefined tia register"); }
    this.UNDEFO = value;
}
        
// CXM0P   11......  read collision M0-P1, M0-P0 (Bit 7,6)
TIA.prototype.ReadCXM0P = function () {
    return this.CXM0P;
}

// CXM1P   11......  read collision M1-P0, M1-P1
TIA.prototype.ReadCXM1P = function () {
    return this.CXM1P;
}

// CXP0FB  11......  read collision P0-PF, P0-BL
TIA.prototype.ReadCXP0FB = function () {
    return this.CXP0FB;
}

// CXP1FB  11......  read collision P1-PF, P1-BL
TIA.prototype.ReadCXP1FB = function () {
    return this.CXP1FB;
}

// CXM0FB  11......  read collision M0-PF, M0-BL
TIA.prototype.ReadCXM0FB = function () {
    return this.CXM0FB;
}

// CXM1FB  11......  read collision M1-PF, M1-BL
TIA.prototype.ReadCXM1FB = function () {
    return this.CXM1FB;
}

// CXBLPF  1.......  read collision BL-PF, unused
TIA.prototype.ReadCXBLPF = function () {
    return this.CXBLPF;
}

// CXPPMM  11......  read collision P0-P1, M0-M1
TIA.prototype.ReadCXPPMM = function () {
    return this.CXPPMM;
}

// INPT0   1.......  read pot port
TIA.prototype.ReadINPT0 = function () {
    var value = this.INPT0;
    var pin5 = this.Port1.ReadPins() & 0x10;
    value = (value & 0x7F) | (pin5 << 3);
    this.INPT0 = value;
    return value;
}

// INPT1   1.......  read pot port
TIA.prototype.ReadINPT1 = function () {
    var value = this.INPT1;
    var pin9 = this.Port1.ReadPins() & 0x100;
    value = (value & 0x7F) | (pin9 >>> 1);
    this.INPT1 = value;
    return value;
}

// INPT2   1.......  read pot port
TIA.prototype.ReadINPT2 = function () {
    var value = this.INPT2;
    var pin5 = this.Port2.ReadPins() & 0x10;
    value = (value & 0x7F) | (pin5 << 3);
    this.INPT2 = value;
    return value;
}

// INPT3   1.......  read pot port
TIA.prototype.ReadINPT3 = function () {
    var value = this.INPT3;
    var pin9 = this.Port2.ReadPins() & 0x100;
    value = (value & 0x7F) | (pin9 >>> 1);
    this.INPT3 = value;
    return value;
}

/* 
Pin Port 0   Port 1   Joystick  Paddle       Keypad
--- -------  -------  --------  -----------  -------
1   SWCHA.4  SWCHA.0  Up        unused       UpperRow
2   SWCHA.5  SWCHA.1  Down      unused       SecondRow 
3   SWCHA.6  SWCHA.2  Left      LeftButton   ThirdRow
4   SWCHA.7  SWCHA.3  Right     RightButton  BottomRow
5   INPT0.7  INPT2.7  unused    LeftPaddle   LeftColumn
6   INPT4.7  INPT5.7  Button    unused       RightColumn
7   unused   unused   unused    unused       unused  
8   ground   ground   ground    ground       ground
9   INPT1.7  INPT3.7  unused    RightPaddle  MiddleColumn   
*/

// INPT4   1.......  read input
TIA.prototype.ReadINPT4 = function () {
    var value = this.INPT4;
    var pin6 = this.Port1.ReadPins() & 0x20;
    value = (value & 0x7F) | (pin6 << 2);
    this.INPT4 = value;
    return value;
}

// INPT5   1.......  read input
TIA.prototype.ReadINPT5 = function () {
    var value = this.INPT5;
    var pin6 = this.Port2.ReadPins() & 0x20;
    value = (value & 0x7F) | (pin6 << 2);
    this.INPT5 = value;
    return value;
}

// UNDEFI  undefined input register
TIA.prototype.ReadUNDEFI = function () {
    //alert("read undefined tia register");
    return this.UNDEFI;
}
