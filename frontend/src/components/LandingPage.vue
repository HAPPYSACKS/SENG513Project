<template>
    <div class="main">
        <h1>Welcome to StudyBuddy!</h1>
        <div class="centerpiece">
            <span class="circle">
                <img src="@/assets/icon_wreath.png" alt="Wreath of icons" id="icon-wreath">
                <button class="button" id="login-button">LOGIN</button>
                <button class="button" id="signup-button">SIGN UP</button>
            </span>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

.main {
    height: 100%;
    background-color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}

h1 {
    font-size: 40px;
    font-weight: 900;
    width: 300px;
    margin-top: 20px;
    margin-bottom: 65px;
}

.circle {
    height: 450px;
    width: 450px;
    background-color: #ECECEC;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    top: 10%;
}

.button {
    width: 175px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    font-size: 20px;
    background-color: #FFFFFF;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    color: #000000;
    font-weight: 900;
    box-shadow: 0 4px 2px rgba(0, 0, 0, 0.1);
}

.button:hover {
    background-color: #000000;
    color:#FFFFFF;
    transition: background-color 0.3s ease;
}

#login-button {
    top: 40%;
}

#signup-button {
    top: 60%;
}

#icon-wreath {
    position: absolute;
    top: -10%;
    left: -20%;
    width: 145%;
    height: 120%;
}
</style>