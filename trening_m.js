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
let p0 = {x:49.5, y:97.8}
let p1 = {x:81.3, y:97.5}
let p2 = {x:81.14, y:75.2}
let bot = lenp(p1, p0);
let plan = lenp(p2, p0);
let hand = lenp(p1, p2);
let ke = 0.51;
let h2 = hand*ke;
let h1 = hand*(1-ke);

let c0 = ab_corner(bot, plan, hand);
let c1 = ab_corner(bot, hand, plan);
let c2 = ab_corner(plan, hand, bot);

let start = -1;
let n = 0;
function step(time) {
    if (start == -1)
        start = time;
    let dur = (time - start);

    let dg = 25;
    let rd = dg / 180 * Math.PI;



    let vl = caval((dur / 2500), body_tr);
    document.getElementById("gbody_shold").style.transformOrigin = "187.13616px 369.99661px";
    document.getElementById("gbody_shold").style.transform = `rotate(${vl * dg}deg)`;

    
    let ct0 = c0 - vl*rd;
    let handt = Math.sqrt(bot*bot + plan*plan - 2*plan*bot*Math.cos(ct0));
    let ct1 = ab_corner(bot, handt, plan);
    let ct2 = ab_corner(plan, handt, bot);
    
    let d1 = ab_corner(h1, handt, h2);
    let d2 = ab_corner(h2, handt, h1);

    d1 = c1 - (ct1 - d1);
    d2 = c2 - (ct2 - d2);
    
    document.getElementById("gelbow").style.transformOrigin = "306.93444px 368.16151px";
    document.getElementById("gelbow").style.transform = `rotate(${-d1}rad)`;

    
    document.getElementById("gShoulder").style.transformOrigin = "306.84429px 285.24167px";
    document.getElementById("gShoulder").style.transform = `rotate(${d2 - 2.5/180*Math.PI}rad)`;
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

//https://iconscout.com/lottie-animation-pack/woman-workout-3
//https://iconscout.com/lottie-animation-pack/woman-workout-4
//https://iconscout.com/lottie-animation/woman-doing-knee-push-ups-5080444