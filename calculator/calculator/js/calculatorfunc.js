var FCalc = document.calc;
//var FCalc = document; ===> Fcalc.ReadOut.value = NUM; сокращенное

var FlagNewNum = false;
var Currents = 0;
var PendingOP = "";

// Button press checker
function NumPressed(Num) {
    if (!FlagNewNum) {
        FCalc.ReadOut.value = Num;
        FlagNewNum = true;
    } else {
        if (FCalc.ReadOut.value == "0") {
            FCalc.ReadOut.value = Num;
            // FlagNewNum = false;
        } else {
            FCalc.ReadOut.value += Num;
        }
    }
}

//Keyboard input checker
document.onkeydown = function(keyPress) {
    document.activeElement.blur();

    switch (keyPress.key) {
        case '1':
            NumPressed(1);
            break;
        case '2':
            NumPressed(2);
            break;
        case '3':
            NumPressed(3);
            break;
        case '4':
            NumPressed(4);
            break;
        case '5':
            NumPressed(5);
            break;
        case '6':
            NumPressed(6);
            break;
        case '7':
            NumPressed(7);
            break;
        case '8':
            NumPressed(8);
            break;
        case '9':
            NumPressed(9);
            break;
        case '0':
            NumPressed(0);
            break;
        case ',':
            Decimal();
            break;
        case '.':
            Decimal();
            break;
        case '+':
            Operation('+');
            break;
        case '-':
            Operation('-');
            break;
        case '*':
            Operation('*');
            break;
        case '/':
            Operation('/');
            break;
        case 'Backspace':
            Back();
            break;
        case 'Enter':
            Operation('=');
            break;
        case 'Delete':
        case 'Esc':
            Clear();
            break;

        case '%':

        default:
            break;
    }
}

//Clear the editWide
function Clear() {

    Currents;
    FCalc.ReadOut.value = 0;
    PendingOP = "";
    FlagNewNum = false;
}

//Step back in the editWide
function Back() {
    if (FCalc.ReadOut.value.length > 1) {
        FCalc.ReadOut.value = FCalc.ReadOut.value.substring(0, FCalc.ReadOut.value.length - 1);
    } else {
        FCalc.ReadOut.value = 0;
        FlagNewNum = false;
    }
}
// Calculator functions (+, -, /, *, etc)
function Operation(Op) {
    var ReadOut = FCalc.ReadOut.value;
    if (FlagNewNum && PendingOP == "=") {
        FCalc.ReadOut.value = Currents;
    } else {
        FlagNewNum = false;
        switch (PendingOP) {
            case '+':
                Currents += parseFloat(ReadOut);
                break;
            case '-':
                Currents -= parseFloat(ReadOut);
                break;
            case '/':
                if (ReadOut != 0) {
                    Currents /= parseFloat(ReadOut);
                    break;
                } else {

                    alert("You cannot divide by 0!");
                    Clear();
                    return;
                }
            case '*':
                Currents *= parseFloat(ReadOut);
                break;
                // case '%':
                //     Currents =
                //         parseFloat(FCalc.ReadOut.value) / 100;
                //     FlagNewNum = false;
                //     break;
            default:
                Currents = parseFloat(ReadOut);
                break;
        }
        FCalc.ReadOut.value = Currents;
        PendingOP = Op
    }
}

//Makes numbers negative or positive
function Neg() {
    FCalc.ReadOut.value *= -1;
}

//Makes numbers Decimal
function Decimal() {
    if (!FlagNewNum) {
        FCalc.ReadOut.value = "0.";
        FlagNewNum = true;
    } else {
        if (FCalc.ReadOut.value.indexOf(".") == -1) {
            FCalc.ReadOut.value += ".";
        }
    }
}

function Percent() {
    if (FlagNewNum) {
        FCalc.ReadOut.value /= 100;
        FlagNewNum = false;
    }
}