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

class Port {

    public Device: any;

    constructor() {
        this.Device = null;
    }

    public Connect(device) {
        this.Device = device;
    }

    public Disconnect(): void {
        this.Device = null;
    }

    public WritePins(pins: number) {
        if (this.Device) {
            this.Device.WritePins(pins);
        }
    }

    public ReadPins(): number {
        if (this.Device) {
            return this.Device.ReadPins();
        }
        else {
            return 0x1FF;
        }
    }
}