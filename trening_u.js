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
let body_tr = [
    {
        tbegin: 0,
        tend: 0.45,
        vbegin: 0,
        vend: 1,
        fu: easeInOutCubic
    },
    {
        tbegin: 0.45,
        tend: 0.9,
        vbegin: 1,
        vend: 0,
        fu: easeInOutCubic
    },
]
/*
49.5 97.8 - 81.3  97.5  = 120.36
        49.5 97.8 - 81.14 75.2 = 146.6
        81.14 75.2 - x = 42.79
        x - 81.3  97.5 = 41.43
*/
function lenp(a, b)
{
    let x = a.x - b.x;
    let y = a.y - b.y;
    return Math.sqrt(x*x + y*y);
}
function ab_corner(a, b, c)
{
    return Math.acos((a*a + b*b - c*c) / 2 /a /b);
}



function initObj(p0, p1, p2)
{
    obj = {};
    obj.bot = lenp(p1, p0);
    obj.plan = lenp(p2, p0);
    obj.hand = lenp(p1, p2);
    let ke = 0.51;
    obj.h2 = obj.hand*ke;
    obj.h1 = obj.hand*(1-ke);

    obj.c0 = ab_corner(obj.bot, obj.plan, obj.hand);
    obj.c1 = ab_corner(obj.bot, obj.hand, obj.plan);
    obj.c2 = ab_corner(obj.plan, obj.hand, obj.bot);

    obj.p1 = `${p1.x}px ${p1.y}px`;
    obj.p2 = `${p2.x}px ${p2.y}px`;
    return obj;
}

function calc_corner(obj, vl)
{
    
    
    let c0 = obj.c0;
    let c1 = obj.c1;
    let c2 = obj.c2;
    let bot = obj.bot;
    let plan = obj.plan;
    let h1 = obj.h1;
    let h2 = obj.h2;

    let ct0 = c0 - vl*rd;
    let handt = Math.sqrt(bot*bot + plan*plan - 2*plan*bot*Math.cos(ct0));
    let ct1 = ab_corner(bot, handt, plan);
    let ct2 = ab_corner(plan, handt, bot);
    
    let d1 = ab_corner(h1, handt, h2);
    let d2 = ab_corner(h2, handt, h1);

    d1 = c1 - (ct1 - d1);
    d2 = c2 - (ct2 - d2);
    obj.d1 = -d1;
    obj.d2 = d2;

}
let p0 = {x:607.09192, y:1225.9776};
let p1 = {x:1011.9628, y:1228.6004};
let p2 = {x:1009.1653,y:932.82323};
let push1 = initObj(p0, p1, p2);

p1 = {x:1016.9752,y:1199.6151};
p2 = {x:1009.4099,y:939.26278};
let push2 = initObj(p0, p1, p2);

let start = -1;
let n = 0;
let dg = 25;
let rd = dg / 180 * Math.PI;

function step(time) {
    if (start == -1)
        start = time;
    let dur = (time - start);

    let vl = caval((dur / 2000), body_tr);
    document.getElementById("gbody").style.transformOrigin = `${p0.x}px ${p0.y}px`;
    document.getElementById("gbody").style.transform = `rotate(${vl * dg}deg)`;

    calc_corner(push1, vl);
    calc_corner(push2, vl);
    
    
    document.getElementById("gelbow1").style.transformOrigin = push1.p1;
    document.getElementById("gelbow1").style.transform = `rotate(${push1.d1}rad)`;
    document.getElementById("gShoulder1").style.transformOrigin = push1.p2;
    document.getElementById("gShoulder1").style.transform = `rotate(${push1.d2}rad)`;
    

    document.getElementById("gelbow2").style.transformOrigin = push2.p1;
    document.getElementById("gelbow2").style.transform = `rotate(${push2.d1}rad)`;
    document.getElementById("gShoulder2").style.transformOrigin = push2.p2;
    document.getElementById("gShoulder2").style.transform = `rotate(${push2.d2}rad)`;

    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

//https://iconscout.com/lottie-animation-pack/woman-workout-3
//https://iconscout.com/lottie-animation-pack/woman-workout-4
//https://iconscout.com/lottie-animation/woman-doing-knee-push-ups-5080444
//g63
//g61
//g14

//g69
//g3