function Paddle() {
    this.Button0 = 1;
    this.Button1 = 1;
    this.Pot0 = 1;
    this.Pot1 = 1;
}

Paddle.prototype.OnKeyDown = function (event: KeyboardEvent) {
    var handled = false;

    if (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 32:
            case 78:
                this.Button0 = 0;
                handled = true;
                break;
            default:
                break;
        }

        if (handled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

Paddle.prototype.OnKeyUp = function (event) {
    var handled = false;

    if (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 32:
            case 78:
                this.Button0 = 1;
                handled = true;
                break;
            default:
                break;
        }

        if (handled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

Paddle.prototype.OnKeyPress = function (event) {
    var handled = false;

    if (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 32:
            case 78:
                handled = true;
                break;
            default:
                break;
        }

        if (handled) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}

/* 
Pin Port 0   Port 1   Joystick  Paddle       Keypad
--- -------  -------  --------  -----------  -------
1   SWCHA.4  SWCHA.0  <Up        -           >Row 0
2   SWCHA.5  SWCHA.1  <Down      -           >Row 1 
3   SWCHA.6  SWCHA.2  <Left      <Button 0   >Row 3
4   SWCHA.7  SWCHA.3  <Right     <Button 1   >Row 4
5   INPT0.7  INPT2.7  -          <Pot 0      <Column 0
6   INPT4.7  INPT5.7  <Button    -           <Column 2
7   +5V      +5V      
8   ground   ground   
9   INPT1.7  INPT3.7  -          <Pot 1      <Column 1   
*/
Paddle.prototype.ReadPins = function () {
    var pins = this.Pot1;
    pins = (pins << 4) | this.Pot0;
    pins = (pins << 1) | this.Button1;
    pins = (pins << 1) | this.Button0;
    pins = (pins << 2);
}

Paddle.prototype.WritePins = function (pins) {
    pins = (pins << 4) | this.Pot0;
    pins = (pins << 1) | this.Button1;
    pins = (pins << 1) | this.Button0;
    pins = (pins << 2);
}

Paddle.prototype.Init = function () {
    var self = this;
    document.addEventListener("keydown", function (event) { self.OnKeyDown.call(self, event); }, false);
    document.addEventListener("keyup", function (event) { self.OnKeyUp.call(self, event); }, false);
    document.addEventListener("keypress", function (event) { self.OnKeyPress.call(self, event); }, false);
}