/*
function Clock(frequency) {
    this.Frequency = frequency; // cycles/s
    this.Count = 0;
    this.Syncs = new Array();
    
    this.Step(count) {
        this.Count += count;
        for (var c = 0; c < Count; c++){
            for(var i =0; i < this.Syncs.length; i++){
                this.Syncs[i](count);
            }
        }
    }

    this.AddSync = function(sync) {
        this.Syncs.push(sync);    
    }
}

function Atari2600() {
    this.Clock = new Clock(33000);
    this.PortA = new Port();
    this.PortB = new Port();
    this.Processor = new MOS6507();
    this.Tia = new Tia(this.PortA, this.PortB);
    this.Riot = new Riot(this.PortA, this.PortB);
    this.Joystick1 = new Joystick();
    this.Joystick2 = new Joystick();
    this.Memory = new memory();
    this.SwitchBank = new SwitchBank();
    this.Screen = new Screen();
    this.Debugger = new Debugger();
    this.PortA.Connect(this.Joystick1);
    this.PortB.Connect(this.Joystick2);
}
*/