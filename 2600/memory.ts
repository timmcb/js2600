import * as Cart from "Cart";
import * as Games from "Adventure";
import { Joystick } from "Joystick";
import { Port } from "port";
import { Riot } from "riot";
import { TIA } from "tia";

export function GetCart(gameid: number)
{
    var ct = new Cart.Cart(Games.ColorBar());

    switch (gameid)
    {
        case 1:
            ct = new Cart.Cart(Games.DonkeyKong());
            break;
        case 2:
            ct = new Cart.F8Cart(Games.Asteroids());
            break;
        case 3:
            ct = new Cart.Cart(Games.Superman());
            break;
        case 4:
            ct = new Cart.Cart(Games.MissleCommand());
            break;
        case 5:
            break;
        case 6:
            ct = new Cart.F8Cart(Games.MsPacMan());
            break;
        case 7:
            ct = new Cart.Cart(Games.Adventure());
            break;
        case 8:
            ct = new Cart.Cart(Games.SpaceInvaders());
            break;
        case 9:
            ct = new Cart.F8Cart(Games.Battlezone()); 
            break;
        case 10:
            ct = new Cart.F8SuperChipCart(Games.Defender2());
            break;
        case 11:
            ct = new Cart.Cart2K(Games.Combat());
            break;
        default:
           break;
    }

    return ct;
}

// 0x0000 0x003F 64  TIA
// 0x0040 0x007F 64  0x0000-0x003F TIA mirror 
// 0x0080 0x00FF 128 RAM 
// 0x0100 0x01FF 256 0x0000-0x00FF TIA-TIA-RAM(stack) mirror
// 0x0200 0x027F 128 0x0000-0x007F TIA-TIA mirror
// 0x0280 0x02FF 128 RIOT 
// 0x0300 0x03FF 256 0x0200-0x02FF TIA-TIA-RIOT mirror 
// 0x0400 0x07FF 1K  0x0000-0x03FF mirror
// 0x0800 0x0BFF 1K  0x0000-0x03FF mirror
// 0x0C00 0x0FFF 1K  0x0000-0x03FF mirror
// 0x1000 0x1FFF 4K  Cart ROM 
// 0x2000 0x3FFF 8K  0x0000-0x1FFF mirror 
// 0x4000 0x5FFF 8K  0x0000-0x1FFF mirror 
// 0x6000 0x7FFF 8K  0x0000-0x1FFF mirror 
// 0x8000 0x9FFF 8K  0x0000-0x1FFF mirror 
// 0xA000 0xBFFF 8K  0x0000-0x1FFF mirror
// 0xC000 0xDFFF 8K  0x0000-0x1FFF mirror
// 0xE000 0xFFFF 8K  0x0000-0x1FFF mirror 
export class Memory {
    public Port1: Port;
    public Port2: Port;
    public joy1: Joystick;
    public joy2: Joystick;
    public tia: any; //TIA;
    public riot: Riot;
    public cart: any //Cart;

    constructor(theCart: any) {
        this.Port1 = new Port();
        this.Port2 = new Port();
        this.joy1 = new Joystick(false);
        this.joy1.Init();
        this.Port1.Connect(this.joy1);
        this.joy2 = new Joystick(true);
        this.joy2.Init();
        this.Port2.Connect(this.joy2);
        this.tia = new TIA(this.Port1, this.Port2);
        this.tia.Init();
        this.riot = new Riot(this.Port1, this.Port2);
        this.riot.Init();
        this.cart = theCart;
    }

    public ReadByte(address: number): number {
        if (address & 0x1000) {
            return this.cart.ReadByte(address);
        }
        else if (address & 0x80) {
            return this.riot.ReadByte(address);
        }
        else {
            return this.tia.ReadByte(address);
        }
    }

    public WriteByte(address: number, value: number): void {
        if (address & 0x1000) {
            this.cart.WriteByte(address, value);
        }
        else if (address & 0x80) {
            this.riot.WriteByte(address, value);
        }
        else {
            this.tia.WriteByte(address, value);
        }
    }
}