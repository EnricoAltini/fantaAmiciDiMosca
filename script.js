
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
//import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js'
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_cQtOMM2k4Y3xAQyzvMHnOVn5ndFx4Yk",
    authDomain: "astafanta-720ac.firebaseapp.com",
    databaseURL: "https://astafanta-720ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "astafanta-720ac",
    storageBucket: "astafanta-720ac.appspot.com",
    messagingSenderId: "60840907763",
    appId: "1:60840907763:web:6381ab07657b552b4c7886",
    measurementId: "G-3N9JEGTSGM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//const database = getDatabase(app);
const database = getDatabase();


let currentValue = 0;
let lastBidder = "Nessuno";
let countdown = 10

//questi pezzi di codce sono fondamentali per creare il collegamento tra riferimento click richiamato in html e funzione in script
window.placeBid1 = placeBid1
window.placeBid5 = placeBid5
window.placeBid10 = placeBid10
window.startTimer = startTimer
window.stopTimer = stoptimer

window.currentValue = currentValue

let countdownInterval = 0

function stoptimer(){
    const participantName = document.getElementById("participantName").value;
    if (participantName == "Presidente"){
        clearInterval(countdownInterval);

        countdown=0;
        set(ref(database, 'timer/' ), {
            sec: countdown,
            
          });
        
        buttonSound.play();
    }

}

function resetVal(lastName){
    const participantName = document.getElementById("participantName").value;
    if (participantName != ""){
        //currentValue = 0
        updateGameData(currentValue, lastName);

        countdown = 10;
        set(ref(database, 'timer/' ), {
            sec: countdown,
            
          });
        
        resetSound.play();
          

    }
}


function startTimer(){
    const participantName = document.getElementById("participantName").value;
    if (participantName == "Presidente"){
        currentValue = 0
        updateGameData(currentValue, "Nessuno");

        countdown = 10;
        set(ref(database, 'timer/' ), {
            sec: countdown,
            
          });

        try {
            clearInterval(countdownInterval);
            
        } catch (error) {
            console.log("Timer non ancora avviato")
        }
          
        countdownInterval = setInterval(() => {
            decrementTimer();
        }, 1000);

        resetSound.play();
          

       
    }


}

function placeBid1() {

    const currentTimeS = document.getElementById("time");
    let currentTime = currentTimeS.textContent;
    currentTime= parseInt(currentTime, 10);
    console.log("CurrentTime: "+String(currentTime));

    if(currentTime>0) {
        const participantName = document.getElementById("participantName").value;
        const currentValueSpan = document.getElementById("currentValue");
        currentValue = currentValueSpan.textContent;
        console.log("Ultimo valore: "+currentValue)
        currentValue = parseInt(currentValue, 10)

        if (participantName) {
            const currentValueC = document.getElementById("currentValue").value;
            currentValue += 1;
            lastBidder = participantName;
            updateGameData(currentValue, lastBidder);
            console.log("Nome "+participantName);
            buttonSound.play();
            resetVal(lastBidder);
        }
    }
}

function placeBid5() {

   

    const currentTimeS = document.getElementById("time");
    let currentTime = currentTimeS.textContent;
    currentTime= parseInt(currentTime, 10);
    console.log("CurrentTime: "+String(currentTime));


    if (currentTime>0) {
        const participantName = document.getElementById("participantName").value;
        const currentValueSpan = document.getElementById("currentValue");
        currentValue = currentValueSpan.textContent;
        console.log("Ultimo valore: "+currentValue)
        currentValue = parseInt(currentValue, 10)

        if (participantName) {
            currentValue += 5;
            lastBidder = participantName;
            updateGameData(currentValue, lastBidder);
            console.log("Nome "+participantName);
            buttonSound.play();
            resetVal(lastBidder);
        }
    }
}

function placeBid10() {
    
    

    const currentTimeS = document.getElementById("time");
    let currentTime = currentTimeS.textContent;
    currentTime= parseInt(currentTime, 10);
    console.log("CurrentTime: "+String(currentTime));

    if (currentTime>0) {
        const participantName = document.getElementById("participantName").value;
        const currentValueSpan = document.getElementById("currentValue");
        currentValue = currentValueSpan.textContent;
        console.log("Ultimo valore: "+currentValue)
        currentValue = parseInt(currentValue, 10)
      
        console.log("Nome0 "+participantName)
        if (participantName) {
            currentValue += 10;
            lastBidder = participantName;
            updateGameData(currentValue, lastBidder);
            console.log("Nome "+participantName);
            buttonSound.play();
            resetVal(lastBidder);
        }
    }
}

function updateGameData(value, bidder) {
    // Salva i dati nel database Firebase
    //const database = getDatabase();
    set(ref(database, 'gameData/' ), {
      bidder: bidder,
      value: value,
      
    });
    

}

const playerVal = ref(database, 'gameData');
onValue(playerVal, (snapshot) => {
    const data = snapshot.val();
    updatePage(data.value, data.bidder);
    console.log("aggiornato partecipante e valore:" + data.value);
    

  });

// Aggiorna la pagina con i dati dal databasse
function updatePage(value, bidder) {
    document.getElementById("currentValue").textContent = value;
    document.getElementById("lastBidder").textContent = bidder;
    
}

// Aggiorna la pagina con i dati dal database
function updatePageTimer(timer) {
    document.getElementById("time").textContent = timer;
    
}


//Aggiorna il timer
const timerValRef = ref(database, 'timer');
onValue(timerValRef, (snapshot) => {
    const dataTime = snapshot.val();
    updatePageTimer(dataTime.sec);
    console.log("timer aggiornato");

    if(dataTime.sec==0){
        gongSound.play();
        console.log("Timer:" + dataTime.sec );
    } 

    if(dataTime.sec==10){
        resetSound.play();
        countdown=10; //valore corrente di timer sul cliente
        console.log("Timer: "+ dataTime.sec);
    } 
    if(dataTime.sec> 0 && dataTime.sec<10){
        tickSound.play();
        console.log("Timer in progress: "+ dataTime.sec);
    } 
        
  });

 // ####### Avvia il timer e decrementa ogni secondo
// Decrementa il timer e aggiorna il valore nel database
function decrementTimer() {
    countdown=countdown-1;
    // Riproduci il suono del ticchettio
    tickSound.play();

    if(countdown <= 0){
        countdown = 0;
        gongSound.play();
        clearInterval(countdownInterval);
    }

    set(ref(database, 'timer/' ), {
        sec: countdown,
        
      });
}

/*
 const countdownInterval = setInterval(() => {
    decrementTimer();
}, 1000);
*/


/* Termina il timer dopo 30 secondi
setTimeout(() => {
    clearInterval(countdownInterval);
}, 30000);
*/





// ... Resto del codice per il countdown e altro

/*
function updateCountdown() {
    let countdown = 30; // Inizializza countdown a 30
    const timeElement = document.getElementById("time");
    if (countdown > 0) {
      countdown--;
      timeElement.textContent = countdown;
      setTimeout(updateCountdown, 1000);
    } else {
      timeElement.textContent = "Tempo scaduto";
      document.getElementById("bidButton").disabled = true;
    }
  }

updateCountdown();

*/