function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
let leg2_tr = [
    {
        tbegin: 0.25,
        tend: 0.5,
        vbegin: 0,
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.5,
        tend: 0.75,
        vbegin: 1,
        vend: 0,
        fu: easeInOutCubic
    }
]

let leg1_tr = [
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
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.75,
        tend: 1,
        vbegin: 1,
        vend: 0,
        fu: easeInOutCubic
    }
]
let start = -1;
let n = 0;
function step(time) {
    if (start == -1)
        start = time;
    let dur = (time - start);

    let vl = caval((dur / 4000), leg1_tr) * 90;
    document.getElementById("shin1").style.transformOrigin = "490px 972px";
    document.getElementById("shin1").style.transform = `rotate(${vl}deg)`;


    document.getElementById("leg1").style.transformOrigin = "742px 954px";
    document.getElementById("leg1").style.transform = `rotate(${-vl}deg)`;

    


    vl = caval((dur / 4000), leg2_tr) * 90;
    document.getElementById("shin2").style.transformOrigin = "730px 1196px";
    document.getElementById("shin2").style.transform = `rotate(${-vl}deg)`;

    document.getElementById("leg2").style.transformOrigin = "742px 954px";
    document.getElementById("leg2").style.transform = `rotate(${vl}deg)`;




    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);