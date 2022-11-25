window.onload = function () {
    const canvas = document.getElementById("stars-canvas");
    const context = canvas.getContext("2d");
    const numStars = 1900;
    const doubleWidth = canvas.width * 2;
    let centerX;
    let centerY;
    let stars = [];
    let star;
    let i;
    let starsSpeed = 1;
    const animate = true;

    document.getElementById("speed-range-input").addEventListener('change', function () {
        setCustomSpeed();
    })

    function setCustomSpeed() {
        const val = document.getElementById("speed-range-input").value;
        document.getElementById('speed-range-output').textContent = val;
        starsSpeed = val * 2;
    }

    function executeFrame() {
        if (animate) {
            window.requestAnimationFrame(executeFrame);
            moveStars();
            drawStars();
        } else {
            drawStars();
        }
    }

    function initializeStars() {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        stars = [];

        for (i = 0; i < numStars; i++) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                o: '0.' + Math.floor(Math.random() * 99) + 1
            };
            stars.push(star);
        }
    }

    function moveStars() {
        for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z = star.z - starsSpeed;

            if (star.z <= 0) {
                star.z = canvas.width;
            }
        }
    }

    function drawStars() {
        let pixelX;
        let pixelY;
        let pixelRadius;
        const radian = Math.PI / 180;

        // ON Resize
        if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeStars();
        }

        context.fillStyle = "rgb(0,10,20)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < numStars; i++) {
            star = stars[i];

            pixelX = (star.x - centerX) * (doubleWidth / star.z);
            pixelX += centerX;
            pixelY = (star.y - centerY) * (doubleWidth / star.z);
            pixelY += centerY;
            pixelRadius = 1 * (doubleWidth / star.z);

            context.beginPath();
            context.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
            context.arc(pixelX, pixelY, pixelRadius, 0, 360 * radian);
            context.stroke();
            context.fill();

        }
    }

    initializeStars();
    executeFrame();
}