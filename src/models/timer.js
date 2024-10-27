import moment from "moment";

class Countdown {
    constructor() {
        this.timeLeft = 0;
        this.running = false;
        this.currentSession = null;
    }

    converter(milliseconds) {
        const minutes = (milliseconds % (1000 * 60 * 60)) / (1000 * 60);
        const seconds = (milliseconds % (1000 * 60)) / 1000;
        return `${minutes}:${seconds}`;
    }

    startSession(minutes) {
        this.running = true;
        let countdown = minutes * 60 * 1000;
        document.getElementById('timer-label').innerHTML = 'Session';
        document.getElementById('time-left').innerHTML = moment(countdown).format('mm:ss');
        const interval = setInterval(() => {

            if (countdown <= 1) {
                clearInterval(interval);
                this.startBreak(Number(document.getElementById('break-length').innerText));
                this.currentSession = 'session';
                // this.startBreak(.1);

                const audio = document.getElementById('beep');
                audio.play();
            }
            if (!this.running) {
                this.timeLeft = countdown;
                clearInterval(interval);
                return;
            }
            document.getElementById('time-left').innerHTML = moment(countdown).format('mm:ss');
            countdown -= 500;

        }, 500);
    }


    startBreak(minutes) {
        this.running = true;
        let countdown = minutes * 60 * 1000;
        document.getElementById('timer-label').innerHTML = 'Break';
        document.getElementById('time-left').innerHTML = moment(countdown).format('mm:ss');
        const interval = setInterval(() => {

            if (countdown <= 1) {
                clearInterval(interval);
                this.startSession(Number(document.getElementById('session-length').innerText));
                this.currentSession = 'break';
                // this.startSession(.1);

                const audio = document.getElementById('beep');
                audio.volume = 0.05;
                audio.play();
            }

            if (!this.running) {
                this.timeLeft = countdown;
                clearInterval(interval);
                return;
            }
            document.getElementById('time-left').innerHTML = moment(countdown).format('mm:ss');
            countdown -= 500;

        }, 500);
    }

    pause() {
        this.running = false;
    }

    resume() {
        if (this.currentSession === 'session') {
            this.startSession(this.timeLeft / 60 / 1000);
        } else {
            this.startBreak(this.timeLeft / 60 / 1000);
        }
    }

    reset() {
        this.pause();
        document.getElementById('break-length').innerHTML = 5;
        document.getElementById('session-length').innerHTML = 25;
        document.getElementById('timer-label').innerHTML = 'Session';
        document.getElementById('time-left').innerHTML = moment(25 * 60 * 1000).format('mm:ss');
    }

}

export default Countdown;