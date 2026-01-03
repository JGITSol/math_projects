
// --- Utilities ----------------------------------------------------------
function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
}

// --- Heat equation sandbox ---------------------------------------------
(function () {
    const NSlider = document.getElementById("heat-n");
    const alphaSlider = document.getElementById("heat-alpha");
    const cflSlider = document.getElementById("heat-cfl");
    const modeSelect = document.getElementById("heat-mode");

    const nLabel = document.getElementById("heat-n-label");
    const alphaLabel = document.getElementById("heat-alpha-label");
    const cflLabel = document.getElementById("heat-cfl-label");

    const timeSpan = document.getElementById("heat-time");
    const dxSpan = document.getElementById("heat-dx");
    const dtSpan = document.getElementById("heat-dt");
    const stabilityPill = document.getElementById("heat-stability-pill");

    const toggleBtn = document.getElementById("heat-toggle");
    const stepBtn = document.getElementById("heat-step");
    const resetBtn = document.getElementById("heat-reset");

    const canvas = document.getElementById("heat-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const colorCanvas = document.getElementById("heat-color");
    const colorCtx = colorCanvas.getContext("2d");

    let u = [];
    let u0 = [];
    let xGrid = [];
    let N = parseInt(NSlider.value, 10);
    let alpha = parseFloat(alphaSlider.value);
    let CFL = parseFloat(cflSlider.value);
    let dx = 1 / (N - 1);
    let dt = CFL * dx * dx / (2 * alpha);
    let lambda = alpha * dt / (dx * dx);
    let t = 0;
    let running = false;
    let frameId = null;

    const maxFrames = 260;
    let heatHistory = [];

    function setLabels() {
        if (nLabel) nLabel.textContent = N.toString();
        if (alphaLabel) alphaLabel.textContent = alpha.toFixed(1);
        if (cflLabel) cflLabel.textContent = CFL.toFixed(1);
        if (timeSpan) timeSpan.textContent = t.toFixed(2);
        if (dxSpan) dxSpan.textContent = dx.toFixed(3);
        if (dtSpan) dtSpan.textContent = dt.toFixed(4);

        if (stabilityPill) {
            if (lambda <= 0.5) {
                stabilityPill.textContent = "Stable (λ ≤ 1/2)";
                stabilityPill.style.borderColor = "var(--success)";
                stabilityPill.style.color = "var(--success)";
            } else {
                stabilityPill.textContent = "Unstable (λ > 1/2)";
                stabilityPill.style.borderColor = "var(--error)";
                stabilityPill.style.color = "var(--error)";
            }
        }
    }

    function initGrid() {
        N = parseInt(NSlider.value, 10);
        alpha = parseFloat(alphaSlider.value);
        CFL = parseFloat(cflSlider.value);
        dx = 1 / (N - 1);
        dt = CFL * dx * dx / (2 * alpha);
        lambda = alpha * dt / (dx * dx);
        t = 0;
        xGrid = new Array(N);
        for (let i = 0; i < N; i++) xGrid[i] = i * dx;
        u = new Array(N);
        u0 = new Array(N);
        applyInitialCondition();
        heatHistory = [];
        pushHistory();
        setLabels();
        draw();
        drawHistory();
    }

    function applyInitialCondition() {
        const mode = modeSelect.value;
        for (let i = 0; i < N; i++) {
            const x = xGrid[i];
            let val = 0;
            if (mode === "bump") {
                const c = 0.5;
                const sigma2 = 0.02;
                val = Math.exp(-((x - c) * (x - c)) / sigma2);
            } else if (mode === "sin") {
                val = Math.sin(Math.PI * x);
            } else if (mode === "random") {
                val = Math.random() * 2 - 1;
            }
            u[i] = val;
            u0[i] = val;
        }
        u[0] = 0;
        u[N - 1] = 0;
    }

    function pushHistory() {
        if (heatHistory.length >= maxFrames) {
            heatHistory.shift();
        }
        heatHistory.push(u.slice());
    }

    function draw() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.save();

        ctx.fillStyle = "var(--card-bg)"; // match bg
        // ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        const margin = 30;
        const innerW = w - 2 * margin;
        const innerH = h - 2 * margin;

        // Axes
        ctx.beginPath();
        ctx.moveTo(margin, margin + innerH);
        ctx.lineTo(margin + innerW, margin + innerH);
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + innerH);
        ctx.stroke();

        // Tick marks
        ctx.font = "10px monospace";
        ctx.fillStyle = "#94a3b8";

        for (let k = 0; k <= 4; k++) {
            const frac = k / 4;
            const xx = margin + frac * innerW;
            ctx.beginPath();
            ctx.moveTo(xx, margin + innerH);
            ctx.lineTo(xx, margin + innerH + 4);
            ctx.stroke();
            ctx.fillText(frac.toFixed(2), xx - 7, margin + innerH + 14);
        }

        // Compute min/max
        let minU = Infinity;
        let maxU = -Infinity;
        for (let i = 0; i < N; i++) {
            if (u[i] < minU) minU = u[i];
            if (u[i] > maxU) maxU = u[i];
        }
        if (!isFinite(minU) || !isFinite(maxU) || minU === maxU) {
            minU = -1;
            maxU = 1;
        }

        const yScale = innerH / (maxU - minU);

        ctx.beginPath();
        for (let i = 0; i < N; i++) {
            const x = margin + (xGrid[i] * innerW);
            const y = margin + innerH - (u[i] - minU) * yScale;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "#2dd4bf"; // Teal
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    function drawHistory() {
        const w = colorCanvas.width;
        const h = colorCanvas.height;
        const ctx = colorCtx;
        ctx.clearRect(0, 0, w, h);

        if (heatHistory.length === 0) return;

        const rows = heatHistory.length;
        const cols = heatHistory[0].length;

        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        let minU = Infinity;
        let maxU = -Infinity;
        for (let r = 0; r < rows; r++) {
            const row = heatHistory[r];
            for (let c = 0; c < cols; c++) {
                const v = row[c];
                if (v < minU) minU = v;
                if (v > maxU) maxU = v;
            }
        }
        if (!isFinite(minU) || !isFinite(maxU) || minU === maxU) {
            minU = -1;
            maxU = 1;
        }

        function colorMap(v) {
            const t = clamp((v - minU) / (maxU - minU), 0, 1);
            // Simple thermal map: Blue -> Red
            // 0: 0,0,255
            // 0.5: 255,255,255
            // 1: 255,0,0
            // Or use original: 
            const r = (1 - t) * 15 + t * 249;
            const g = (1 - t) * 23 + t * 115;
            const b = (1 - t) * 42 + t * 22;
            return [r, g, b];
        }

        for (let j = 0; j < h; j++) {
            const rIndex = Math.floor((j / (h - 1)) * (rows - 1));
            const row = heatHistory[rIndex];
            for (let i = 0; i < w; i++) {
                const cIndex = Math.floor((i / (w - 1)) * (cols - 1));
                const [r, g, b] = colorMap(row[cIndex]);
                const idx = 4 * (j * w + i);
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function step() {
        const newU = u.slice();
        for (let i = 1; i < N - 1; i++) {
            newU[i] = u[i] + lambda * (u[i + 1] - 2 * u[i] + u[i - 1]);
        }
        newU[0] = 0;
        newU[N - 1] = 0;
        u = newU;
        t += dt;
        pushHistory();
        setLabels();
        draw();
        drawHistory();
    }

    function loop() {
        if (!running) return;
        for (let k = 0; k < 4; k++) step();
        frameId = requestAnimationFrame(loop);
    }

    if (NSlider) NSlider.addEventListener("input", () => {
        initGrid();
    });

    if (alphaSlider) alphaSlider.addEventListener("input", () => {
        alpha = parseFloat(alphaSlider.value);
        dx = 1 / (N - 1);
        dt = CFL * dx * dx / (2 * alpha);
        lambda = alpha * dt / (dx * dx);
        setLabels();
    });

    if (cflSlider) cflSlider.addEventListener("input", () => {
        CFL = parseFloat(cflSlider.value);
        dx = 1 / (N - 1);
        dt = CFL * dx * dx / (2 * alpha);
        lambda = alpha * dt / (dx * dx);
        setLabels();
    });

    if (modeSelect) modeSelect.addEventListener("change", () => {
        applyInitialCondition();
        t = 0;
        heatHistory = [];
        pushHistory();
        setLabels();
        draw();
        drawHistory();
    });

    if (toggleBtn) toggleBtn.addEventListener("click", () => {
        running = !running;
        toggleBtn.textContent = running ? "⏸ Pause" : "▶ Run";
        if (running) loop();
        else if (frameId != null) cancelAnimationFrame(frameId);
    });

    if (stepBtn) stepBtn.addEventListener("click", () => {
        if (!running) step();
    });

    if (resetBtn) resetBtn.addEventListener("click", () => {
        applyInitialCondition();
        t = 0;
        heatHistory = [];
        pushHistory();
        setLabels();
        draw();
        drawHistory();
    });

    initGrid();
})();

// --- Lotka–Volterra sandbox -------------------------------------------
(function () {
    const alphaInput = document.getElementById("lv-alpha");
    const betaInput = document.getElementById("lv-beta");
    const gammaInput = document.getElementById("lv-gamma");
    const deltaInput = document.getElementById("lv-delta");
    const x0Input = document.getElementById("lv-x0");
    const y0Input = document.getElementById("lv-y0");

    // h input removed in simplified UI, default to 0.03
    let h = 0.03;

    const toggleBtn = document.getElementById("lv-toggle");
    const stepBtn = document.getElementById("lv-step");
    const clearBtn = document.getElementById("lv-clear");
    const timePill = document.getElementById("lv-time-pill");

    const timeCanvas = document.getElementById("lv-time");
    if (!timeCanvas) return;
    const timeCtx = timeCanvas.getContext("2d");
    const phaseCanvas = document.getElementById("lv-phase");
    const phaseCtx = phaseCanvas.getContext("2d");

    let alpha = 1.1; // vals will be set in init
    let beta = 0.4;
    let gamma = 0.4;
    let delta = 0.8;
    let x = 1.5;
    let y = 1.0;

    let t = 0;
    let running = false;
    let frameId = null;

    const maxSteps = 1200;
    let history = [];

    function f(x, y) {
        return alpha * x - beta * x * y;
    }
    function g(x, y) {
        return -gamma * y + delta * x * y;
    }

    function rk4Step() {
        const k1x = f(x, y);
        const k1y = g(x, y);

        const k2x = f(x + 0.5 * h * k1x, y + 0.5 * h * k1y);
        const k2y = g(x + 0.5 * h * k1x, y + 0.5 * h * k1y);

        const k3x = f(x + 0.5 * h * k2x, y + 0.5 * h * k2y);
        const k3y = g(x + 0.5 * h * k2x, y + 0.5 * h * k2y);

        const k4x = f(x + h * k3x, y + h * k3y);
        const k4y = g(x + h * k3x, y + h * k3y);

        x += (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
        y += (h / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
        x = Math.max(0, x);
        y = Math.max(0, y);
        t += h;
    }

    function pushHistory() {
        if (history.length >= maxSteps) {
            history.shift();
        }
        history.push({ t, x, y });
    }

    function drawTime() {
        const w = timeCanvas.width;
        const hCanvas = timeCanvas.height;
        const ctx = timeCtx;

        ctx.clearRect(0, 0, w, hCanvas);
        ctx.save();

        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;

        const margin = 30;
        const innerW = w - 2 * margin;
        const innerH = hCanvas - 2 * margin;

        if (history.length === 0) { ctx.restore(); return; }

        let tMin = history[0].t;
        let tMax = history[history.length - 1].t;
        if (tMax === tMin) tMax = tMin + 1;

        let minVal = Infinity;
        let maxVal = -Infinity;
        for (const p of history) {
            if (p.x < minVal) minVal = p.x;
            if (p.y < minVal) minVal = p.y;
            if (p.x > maxVal) maxVal = p.x;
            if (p.y > maxVal) maxVal = p.y;
        }
        if (!isFinite(minVal) || !isFinite(maxVal) || minVal === maxVal) {
            minVal = 0;
            maxVal = 2;
        }

        // Axes
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + innerH);
        ctx.lineTo(margin + innerW, margin + innerH);
        ctx.stroke();

        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px monospace";

        // t ticks
        for (let k = 0; k <= 4; k++) {
            const frac = k / 4;
            const tt = tMin + frac * (tMax - tMin);
            const xx = margin + frac * innerW;
            ctx.beginPath();
            ctx.moveTo(xx, margin + innerH);
            ctx.lineTo(xx, margin + innerH + 4);
            ctx.stroke();
            ctx.fillText(tt.toFixed(1), xx - 8, margin + innerH + 14);
        }

        // y ticks
        for (let k = 0; k <= 4; k++) {
            const frac = k / 4;
            const val = minVal + frac * (maxVal - minVal);
            const yy = margin + innerH - frac * innerH;
            ctx.beginPath();
            ctx.moveTo(margin - 4, yy);
            ctx.lineTo(margin, yy);
            ctx.stroke();
            ctx.fillText(val.toFixed(1), margin - 25, yy + 3);
        }

        function mapPoint(p) {
            const tx = (p.t - tMin) / (tMax - tMin);
            const vx = (p.x - minVal) / (maxVal - minVal);
            const vy = (p.y - minVal) / (maxVal - minVal);
            return {
                xX: margin + tx * innerW,
                xY: margin + innerH - vx * innerH,
                yX: margin + tx * innerW,
                yY: margin + innerH - vy * innerH,
            };
        }

        ctx.lineWidth = 2;

        // x(t)
        ctx.beginPath();
        for (let i = 0; i < history.length; i++) {
            const p = history[i];
            const m = mapPoint(p);
            if (i === 0) ctx.moveTo(m.xX, m.xY);
            else ctx.lineTo(m.xX, m.xY);
        }
        ctx.strokeStyle = "#38bdf8";
        ctx.stroke();

        // y(t)
        ctx.beginPath();
        for (let i = 0; i < history.length; i++) {
            const p = history[i];
            const m = mapPoint(p);
            if (i === 0) ctx.moveTo(m.yX, m.yY);
            else ctx.lineTo(m.yX, m.yY);
        }
        ctx.strokeStyle = "#22c55e";
        ctx.stroke();

        ctx.restore();
    }

    function drawPhase() {
        const w = phaseCanvas.width;
        const hCanvas = phaseCanvas.height;
        const ctx = phaseCtx;

        ctx.clearRect(0, 0, w, hCanvas);
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;

        const margin = 30;
        const innerW = w - 2 * margin;
        const innerH = hCanvas - 2 * margin;

        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + innerH);
        ctx.lineTo(margin + innerW, margin + innerH);
        ctx.stroke();

        let maxX = 0;
        let maxY = 0;
        for (const p of history) {
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
        maxX = Math.max(maxX, 3);
        maxY = Math.max(maxY, 3);

        function map(xVal, yVal) {
            const xx = margin + (xVal / maxX) * innerW;
            const yy = margin + innerH - (yVal / maxY) * innerH;
            return { x: xx, y: yy };
        }

        // Vector field (simplified for perf)
        const gridN = 10;
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        for (let i = 1; i < gridN; i++) {
            for (let j = 1; j < gridN; j++) {
                const xv = (i / gridN) * maxX;
                const yv = (j / gridN) * maxY;
                const vx = f(xv, yv);
                const vy = g(xv, yv);
                const len = Math.sqrt(vx * vx + vy * vy) + 1e-6;
                const scale = 0.08;
                const dx = (vx / len) * scale * maxX;
                const dy = (vy / len) * scale * maxY;

                const p1 = map(xv - dx * 0.5, yv - dy * 0.5);
                const p2 = map(xv + dx * 0.5, yv + dy * 0.5);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Fixed point
        const fx = gamma / delta;
        const fy = alpha / beta;
        const fp = map(fx, fy);
        ctx.fillStyle = "#f97316"; // Orange
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Trajectory
        if (history.length > 1) {
            ctx.beginPath();
            for (let i = 0; i < history.length; i++) {
                const p = history[i];
                const m = map(p.x, p.y);
                if (i === 0) ctx.moveTo(m.x, m.y);
                else ctx.lineTo(m.x, m.y);
            }
            ctx.strokeStyle = "#f97316";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.restore();
    }

    function redraw() {
        if (timePill) timePill.textContent = "t = " + t.toFixed(2);
        drawTime();
        drawPhase();
    }

    function resetFromInputs() {
        if (alphaInput) alpha = parseFloat(alphaInput.value);
        if (betaInput) beta = parseFloat(betaInput.value);
        if (gammaInput) gamma = parseFloat(gammaInput.value);
        if (deltaInput) delta = parseFloat(deltaInput.value);
        if (x0Input) x = Math.max(0.001, parseFloat(x0Input.value));
        if (y0Input) y = Math.max(0.001, parseFloat(y0Input.value));
        t = 0;
        history = [];
        pushHistory();
        redraw();
    }

    function step() {
        rk4Step();
        pushHistory();
        redraw();
    }

    function loop() {
        if (!running) return;
        for (let k = 0; k < 4; k++) step();
        frameId = requestAnimationFrame(loop);
    }

    [alphaInput, betaInput, gammaInput, deltaInput, x0Input, y0Input].forEach(el => {
        if (el) el.addEventListener("change", () => resetFromInputs());
    });

    if (toggleBtn) toggleBtn.addEventListener("click", () => {
        running = !running;
        toggleBtn.textContent = running ? "⏸ Pause" : "▶ Run";
        if (running) loop();
        else if (frameId != null) cancelAnimationFrame(frameId);
    });

    if (stepBtn) stepBtn.addEventListener("click", () => {
        if (!running) step();
    });

    if (clearBtn) clearBtn.addEventListener("click", () => {
        resetFromInputs();
    });

    resetFromInputs();
})();
