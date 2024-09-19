class PID{
    constructor(Kp, Ti, Td){
        this.Kp = Kp;
        this.Ti = Ti;
        this.Td = Td;

        this.previousErros = 0;

        this.previousIntegralError = 0;
        
    }

    update(error, dt){
        let pTerm = this.Kp * error;
        let iTerm = this.integralError(error, dt)/this.Ti;
        let dTerm = this.Td * this.derivativeError(error, dt);
        return pTerm + dTerm + iTerm;
    }
    integralError = (error, dt)=>{
        let integral = this.previousIntegralError + error*dt;
        this.previousIntegralError = integral;
        return integral;
    }
    derivativeError = (error, dt)=>{
        let derivative = (error - this.previousErros) / dt;
        this.previousErros = error;
        return derivative;
    }
    reset = ()=>{
        this.previousIntegralError = 0;
        this.previousErros = 0;
    }

    changeCoefficients = (Kp, Ti, Td)=>{
        this.Kp = Kp;
        this.Ti = Ti;
        this.Td = Td;
    }
}
