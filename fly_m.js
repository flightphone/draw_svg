function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function easeInOutExpo(x) {
    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5
                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}
function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function caval(dur, keyframes) {
    let res = 0;
    let t = (dur - Math.trunc(dur));
    keyframes.forEach((frame) => {
        if (frame.tbegin <= t && frame.tend >= t) {
            let v = (t - frame.tbegin) / (frame.tend - frame.tbegin);
            v = frame.fu(v);
            v = frame.vbegin + v * (frame.vend - frame.vbegin);
            res = v;
        }
    })
    return res;
}
let belly_tr = [
    {
        tbegin: 0,
        tend: 0.25,
        vbegin: 0,
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.25,
        tend: 0.75,
        vbegin: 1,
        vend: -1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.75,
        tend: 1.0,
        vbegin: -1,
        vend: 0,
        fu: easeInOutCubic
    }
]

let layer1 = [
    {
        tbegin: 0.,
        tend: 1.0,
        vbegin: 0,
        vend: 1,
        fu: easeInOutExpo
    }
]

let head_tr = [
    {
        tbegin: 0.7,
        tend: 0.8,
        vbegin: 0,
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.8,
        tend: 0.9,
        vbegin: 1,
        vend: -1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.9,
        tend: 1.,
        vbegin: -1,
        vend: 0,
        fu: easeInOutCubic
    }
]


let leg_tr = [
    {
        tbegin: 0.,
        tend: 0.5,
        vbegin: 0,
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.5,
        tend: 1.,
        vbegin: 1,
        vend: 0,
        fu: easeInOutCubic
    }
]

let wing_tr = [
    {
        tbegin: 0.,
        tend: 0.5,
        vbegin: 0,
        vend: 1,
        fu: easeInOutExpo
    },
    {
        tbegin: 0.5,
        tend: 1.,
        vbegin: 1,
        vend: 0,
        fu: easeInOutExpo
    }
]
let start = -1;
let n = 0;
function step(time) {
    if (start == -1)
        start = time;
    let dur = (time - start);

    let vl = caval((dur / 3000), layer1) * 100;
    document.getElementById("layer1").style.offsetDistance = `-${vl}%`;

    vl = caval((dur / 1500), belly_tr);
    document.getElementById("belly").style.transformOrigin = "87.722785px 40.424714px";
    document.getElementById("belly").style.transform = `rotate(${vl * 10}deg)`;

    vl = caval((dur / 1000), head_tr);
    document.getElementById("head").style.transformOrigin = "58.127406px 49.820757px";
    document.getElementById("head").style.transform = `rotate(${vl * 35}deg)`;

    vl = caval((dur / 200), leg_tr);
    document.getElementById("legs1").style.transformOrigin = "69.948379px 52.091178px";
    document.getElementById("legs1").style.transform = `rotate(${vl * -40}deg)`;

    document.getElementById("path30g").style.transformOrigin = "64.783345px 70.33761px";
    document.getElementById("path30g").style.transform = `rotate(${vl * 40}deg)`;

    
    document.getElementById("legs4").style.transformOrigin = "59.513359px 50.053227px";
    document.getElementById("legs4").style.transform = `rotate(${vl * 40-20}deg)`;

    document.getElementById("path29_g").style.transformOrigin = "50.095652px 57.927609px";
    document.getElementById("path29_g").style.transform = `rotate(${vl * -40}deg)`;


    vl = caval((dur / 1200), wing_tr);
    document.getElementById("wingl").style.transformOrigin = "82.674607px 51.463363px";
    document.getElementById("wingl").style.transform = `rotate3d(16, -13, 0, ${vl*40}deg)`;

    document.getElementById("wingr").style.transformOrigin = "68.897175px 36.339214px";
    document.getElementById("wingr").style.transform = `rotate(${vl * -30}deg)`;



    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);