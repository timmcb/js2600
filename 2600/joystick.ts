export class Joystick {
    public Button: number;
    public Left: number;
    public Up: number;
    public Right: number;
    public Down: number;
    public Shift: boolean;

    constructor(shift: boolean) {
        this.Shift = shift;
        this.Button = 1;
        this.Left = 1;
        this.Up = 1;
        this.Right = 1;
        this.Down = 1;
    }

    public OnKeyDown(event: KeyboardEvent): void {
        var handled: boolean = false;
        if (event && !this.Shift || event.shiftKey) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                case 78:
                    this.Button = 0;
                    handled = true;
                    break;
                case 37:
                case 75:
                    this.Left = 0;
                    handled = true;
                    break;
                case 38:
                case 79:
                    this.Up = 0;
                    handled = true;
                    break;
                case 39:
                case 186:
                    this.Right = 0;
                    handled = true;
                    break;
                case 40:
                case 76:
                    this.Down = 0;
                    handled = true;
                    break;
                default:
                    break;
            }

            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    public OnKeyUp(event: KeyboardEvent): void {
        var handled: boolean = false;

        if (event && !this.Shift || event.shiftKey) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                case 78:
                    this.Button = 1;
                    handled = true;
                    break;
                case 37:
                case 75:
                    this.Left = 1;
                    handled = true;
                    break;
                case 38:
                case 79:
                    this.Up = 1;
                    handled = true;
                    break;
                case 39:
                case 186:
                    this.Right = 1;
                    handled = true;
                    break;
                case 40:
                case 76:
                    this.Down = 1;
                    handled = true;
                    break;
                default:
                    break;
            }

            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    // public OnKeyPress(event: KeyboardEvent): void {
    //     var handled: boolean = false;

    //     if (event) {
    //         var keyCode = event.keyCode;
    //         switch (keyCode) {
    //             case 32:
    //             case 78:
    //                 handled = true;
    //                 break;
    //             case 37:
    //             case 75:
    //                 handled = true;
    //                 break;
    //             case 38:
    //             case 79:
    //                 handled = true;
    //                 break;
    //             case 39:
    //             case 186:
    //                 handled = true;
    //                 break;
    //             case 40:
    //             case 76:
    //                 handled = true;
    //                 break;
    //             default:
    //                 break;
    //         }

    //         if (handled) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //         }
    //     }
    // }

    public Init(): void {
        document.addEventListener("keydown", event => { this.OnKeyDown(event); }, false);
        document.addEventListener("keyup", event => { this.OnKeyUp(event); }, false);
        //document.addEventListener("keypress", (event: KeyboardEvent) => { this.OnKeyPress(event); }, false);
    }

    /* 
    Pin Port 0   Port 1   Joystick  Paddle       Keypad
    --- -------  -------  --------  -----------  -------
    1   SWCHA.4  SWCHA.0  <Up        -           >Row 0
    2   SWCHA.5  SWCHA.1  <Down      -           >Row 1 
    3   SWCHA.6  SWCHA.2  <Left      <Button 0   >Row 3
    4   SWCHA.7  SWCHA.3  <Right     <Button 2   >Row 4
    5   INPT0.7  INPT2.7  -          <Pot 0      <Column 0
    6   INPT4.7  INPT5.7  <Button    -           <Column 2
    7   +5V      +5V      
    8   ground   ground   
    9   INPT1.7  INPT3.7  -          <Pot 1      <Column 1   
    */
    public ReadPins(): number {
        var value: number = this.Button;
        value = (value << 2) | this.Right;
        value = (value << 1) | this.Left;
        value = (value << 1) | this.Down;
        value = (value << 1) | this.Up;
        return value & 0x1FF;
    }
}