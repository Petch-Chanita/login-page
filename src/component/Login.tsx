import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.scss";
import "remixicon/fonts/remixicon.css";

function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize Canvas
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const matrixChars = "101000101010101010101010101001";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: any[] = Array.from({ length: columns }).fill(1);

    // const getRandomColor = () => {
    //   const letters = "0123456789ABCDEF";
    //   let color = "#";
    //   for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0fff"; //#0f0
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text =
          matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;

        // ctx.fillStyle = getRandomColor();

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    };

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <canvas ref={canvasRef} id="matrixCanvas"></canvas>
      <section>
        <div className={styles.signin}>
          <div className={styles.content}>
            <h2>Login</h2>
            <div className={styles.form}>
              <div className={styles.inputBox}>
                <input type="text" required />
                <text>Username</text>
              </div>
              <div className={styles.inputBox}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  required
                />
                <text>Password</text>
                <i
                  className={`ri-eye${isPasswordVisible ? "" : "-off"}-line ${
                    styles.icon
                  }`}
                  id="login-eye"
                  onClick={togglePasswordVisibility}
                ></i>
              </div>

              <div className={styles.links}>
                <a href="#">Forgot Password</a>
                <a href="#">Register</a>
              </div>
              <div className={styles.inputBox}>
                <input type="submit" value="Login" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
